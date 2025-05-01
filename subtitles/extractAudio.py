import os
import subprocess

def extract_audio(video_path, output_audio_path):
    ffmpeg_path = r"C:\ffmpeg\ffmpeg.exe"
    command = [
        ffmpeg_path,
        "-i", video_path,
        "-ar", "16000",      
        "-ac", "1",           
        output_audio_path
    ]

    try:
        subprocess.run(command, check=True)
        print(f" Audio extracted successfully: {output_audio_path}")
    except subprocess.CalledProcessError as e:
        print(" Failed to extract audio:", e)

if __name__ == "__main__":
    video_file = "testVideo.mp4"       
    audio_output = "outputAudio.wav"
    extract_audio(video_file, audio_output)
