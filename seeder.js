const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const Content = require('./Content'); //


const MONGODB_URI = 
// MongoDB connection setup
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', async () => {
  console.log('Connected to MongoDB Atlas');

  // * Start seeding only after connection is ready
  await seedDatabase();
  console.log(' Done seeding!');
  mongoose.disconnect();
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

const baseFolderPath = './Data';

async function seedDatabase() {
  try {
    const yearFolders = fs.readdirSync(baseFolderPath);

    for (const yearFolder of yearFolders) {
      const yearFolderPath = path.join(baseFolderPath, yearFolder);
      const files = fs.readdirSync(yearFolderPath);

      for (const file of files) {
        if (file.startsWith('merged_movies_data') && file.endsWith('.csv')) {
          const filePath = path.join(yearFolderPath, file);
          const rows = [];

          await new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
              .pipe(csvParser())
              .on('data', (row) => rows.push(row))
              .on('end', async () => {
                for (const row of rows) {
                  try {
                    const movieData = {
                      title: row.Title,
                      type: 0, // Movie
                      description: row.description ,
                      release_year: new Date(row.Year),
                      genres: row.genres ? row.genres.split(',').map(g => g.trim()) : [],
                      director: row.directors || '',
                      cast: row.stars ? row.stars.split(',').map(s => s.trim()) : [],
                      languages_available: row.Languages ? row.Languages.split(',').map(l => l.trim()) : [],
                      subtitles: {
                        English: '',
                        French: '',
                        Arabic: ''
                      },
                      imdb_id: row['Movie Link'] ,
                      streaming_links: [],
                      episodes: []
                    };

                    const content = new Content(movieData);
                    await content.save();
                  } catch (err) {
                    console.error(`Error saving movie from ${file}:`, err.message);
                  }
                }
                console.log(`Finished processing file: ${file}`);
                resolve();
              })
              .on('error', reject);
          });
        }
      }
    }
  } catch (err) {
    console.error('Error during seeding:', err.message);
  }
}
