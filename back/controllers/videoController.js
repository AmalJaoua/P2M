const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

const ffmpegPath = path.join(__dirname, '..', 'ffmpeg', 'ffmpeg.exe');
ffmpeg.setFfmpegPath(ffmpegPath);

exports.uploadVideo = async (req, res) => {
  const videoPath = req.file.path;
  const videoId = req.body.videoId || path.parse(req.file.filename).name;
  const outputDir = path.join(__dirname, '..', 'hls', videoId);

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const renditions = [
    { resolution: '1920x1080', bitrate: '5000k', name: '1080p' },
    { resolution: '1280x720', bitrate: '3000k', name: '720p' },
    { resolution: '854x480', bitrate: '1500k', name: '480p' },
    { resolution: '640x360', bitrate: '800k', name: '360p' },
    { resolution: '426x240', bitrate: '400k', name: '240p' }
  ];

  const ffmpegCmd = ffmpeg(videoPath);

  renditions.forEach(({ resolution, bitrate, name }) => {
    const outPath = path.join(outputDir, `${name}.m3u8`);
    ffmpegCmd
      .output(outPath)
      .videoBitrate(bitrate)
      .size(resolution)
    
      .addOptions([
        '-c:v libx264',
        '-preset veryfast',
        '-profile:v main',
        '-g 150',
        '-keyint_min 150',
        '-sc_threshold 0',
        '-hls_time 5',
        '-hls_list_size 0',
        '-hls_segment_filename', path.join(outputDir, `${name}_%03d.ts`),
        '-movflags faststart',
        '-c:a aac',
        '-b:a 128k',
        '-ac 2'
      ]);
  });

  ffmpegCmd
    .on('start', (cmd) => console.log('FFmpeg command:', cmd))
    .on('stderr', (line) => console.log('FFmpeg stderr:', line))
    .on('end', () => {
      const masterPlaylist = renditions.map(({ name, resolution, bitrate }) => {
        const bandwidth = parseInt(bitrate) * 1000;
        return `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${resolution}\n${name}.m3u8`;
      }).join('\n');

      fs.writeFileSync(path.join(outputDir, 'master.m3u8'), `#EXTM3U\n${masterPlaylist}`);

      // Optional: delete original file
      fs.unlink(videoPath, err => {
        if (err) console.error('Failed to delete original video:', err.message);
      });

      res.json({
        message: 'HLS with adaptive bitrate ready',
        videoId,
        hlsUrl: `/hls/${videoId}/master.m3u8`
      });
    })
    .on('error', (err) => {
      console.error('FFmpeg error:', err.message);
      res.status(500).json({ error: 'HLS conversion failed' });
    })
    .run();
};

exports.listVideos = (req, res) => {
  const hlsPath = path.join(__dirname, '..', 'hls');
  const videoIds = fs.readdirSync(hlsPath).filter(dir =>
    fs.existsSync(path.join(hlsPath, dir, 'master.m3u8'))
  );
  res.json({ videos: videoIds });
};
