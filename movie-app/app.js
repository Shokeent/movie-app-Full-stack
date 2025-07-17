const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/movieapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Check connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});

// REQUIREMENT 1: Movie Schema with title, year, and rating fields
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  rating: {
    type: String,
    required: true
  }
});

// Create Movie model
const Movie = mongoose.model('Movie', movieSchema);

// REQUIREMENT 2: Initialize data with insertMany()
async function initializeMovies() {
  try {
    // Check if movies already exist
    const movieCount = await Movie.countDocuments();
    
    if (movieCount === 0) {
      const initialMovies = [
        { title: "The Shawshank Redemption", year: 1994, rating: "R" },
        { title: "The Godfather", year: 1972, rating: "R" },
        { title: "Toy Story", year: 1995, rating: "G" },
        { title: "Finding Nemo", year: 2003, rating: "G" },
        { title: "The Dark Knight", year: 2008, rating: "PG-13" }
      ];
      
      await Movie.insertMany(initialMovies);
      console.log('Movies initialized successfully');
    } else {
      console.log('Movies already exist in database');
    }
  } catch (error) {
    console.error('Error initializing movies:', error);
  }
}

// REQUIREMENT 4: updateMovieRating function using updateOne()
async function updateMovieRating(title, newRating) {
  try {
    const result = await Movie.updateOne(
      { title: title },              // filter by movie title
      { $set: { rating: newRating } } // update the rating field
    );
    console.log(`Update result:`, result);
    return result;
  } catch (error) {
    console.error('Error updating movie rating:', error);
    throw error;
  }
}

// REQUIREMENT 5: deleteMoviesByRating function using deleteMany()
async function deleteMoviesByRating(rating) {
  try {
    const result = await Movie.deleteMany({ rating: rating });
    console.log(`Delete result:`, result);
    return result;
  } catch (error) {
    console.error('Error deleting movies by rating:', error);
    throw error;
  }
}

// Routes

// REQUIREMENT 3: Home page - get movies and display all data
app.get('/', async (req, res) => {
  try {
    // Initialize movies if needed
    await initializeMovies();
    
    // Get all movies from database
    const movies = await Movie.find({});
    
    // Render the home page with movies data
    res.render('index', { movies });
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).send('Error fetching movies');
  }
});

// REQUIREMENT 4: Update route - hardcoded demo using updateMovieRating()
app.get('/update', async (req, res) => {
  try {
    // Hardcoded update example: Change Toy Story rating to PG
    const result = await updateMovieRating("Toy Story", "PG");
    const movies = await Movie.find({});
    res.render('update', { 
      movies, 
      message: `Updated movie rating. Modified count: ${result.modifiedCount}` 
    });
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(500).send('Error updating movie');
  }
});

// REQUIREMENT 5: Delete route - hardcoded demo using deleteMoviesByRating()
app.get('/delete', async (req, res) => {
  try {
    // Hardcoded delete example: Remove all R-rated movies
    const result = await deleteMoviesByRating("R");
    const movies = await Movie.find({});
    res.render('delete', { 
      movies, 
      message: `Deleted movies with R rating. Deleted count: ${result.deletedCount}` 
    });
  } catch (error) {
    console.error('Error deleting movies:', error);
    res.status(500).send('Error deleting movies');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;