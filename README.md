
# Movie App - Full Stack Assignment Lab 4

A full-stack Node.js application using Express, Mongoose, and EJS to manage a movie collection.

## Assignment Requirements Met

✅ **Requirement 1**: Movie Schema with title, year, and rating fields  
✅ **Requirement 2**: Initialize data using `insertMany()` with at least 2 movies  
✅ **Requirement 3**: Home page displays all movies with all data  
✅ **Requirement 4**: `updateMovieRating(title, newRating)` function using `updateOne()`  
✅ **Requirement 5**: `deleteMoviesByRating(rating)` function using `deleteMany()`  

## Features

- **Movie Schema**: Defines title (String), year (Number), and rating (String) fields
- **Data Initialization**: Uses `insertMany()` to populate 5 initial movies
- **Home Page**: Displays all movies in styled divs with navigation
- **Update Function**: Updates movie rating by title using MongoDB `updateOne()`
- **Delete Function**: Deletes movies by rating using MongoDB `deleteMany()`
- **Demo Routes**: Hardcoded examples for update and delete operations

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start MongoDB**:
   ```bash
   # macOS with Homebrew:
   brew services start mongodb-community
   
   # Linux:
   sudo systemctl start mongod
   
   # Or run manually:
   mongod
   ```

3. **Run the application**:
   ```bash
   npm start
   ```
   or for development:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   - Open browser to `http://localhost:3000`

## File Structure

```
movie-app/
├── app.js                 # Main server file with all logic
├── package.json          # Dependencies and scripts
├── views/
│   ├── index.ejs         # Home page template
│   ├── update.ejs        # Update demo page
│   └── delete.ejs        # Delete demo page
└── README.md             # Documentation
```

## Routes

- `/` - Home page showing all movies (initializes data on first visit)
- `/update` - Demo: Updates "Toy Story" rating to "PG"
- `/delete` - Demo: Deletes all movies with "R" rating

## Functions

### `updateMovieRating(title, newRating)`
```javascript
// Updates a movie's rating by title using updateOne()
const result = await Movie.updateOne(
  { title: title },              // Filter by title
  { $set: { rating: newRating } } // Update rating field
);
```

### `deleteMoviesByRating(rating)`
```javascript
// Deletes all movies with specified rating using deleteMany()
const result = await Movie.deleteMany({ rating: rating });
```

## Database Schema

```javascript
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  rating: { type: String, required: true }
});
```

## Initial Data

The app initializes with these 5 movies:
- The Shawshank Redemption (1994, R)
- The Godfather (1972, R)
- Toy Story (1995, G)
- Finding Nemo (2003, G)
- The Dark Knight (2008, PG-13)

## Testing Sequence

1. Visit `/` - See all 5 movies
2. Visit `/update` - Toy Story rating changes from "G" to "PG"
3. Visit `/delete` - Both R-rated movies are deleted
4. Visit `/` again - See remaining 3 movies

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Mongoose** - MongoDB object modeling
- **EJS** - Template engine
- **MongoDB** - Database
- **HTML/CSS** - Frontend styling
