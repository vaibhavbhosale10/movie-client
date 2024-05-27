import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './App.css'; // Ensure you have an App.css file for styling

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editMovie, setEditMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await axios.get('http://localhost:5000/movies');
    setMovies(response.data);
  };

  const addMovie = async () => {
    const newMovie = { title, description };
    await axios.post('http://localhost:5000/movies', newMovie);
    fetchMovies();
    setTitle('');
    setDescription('');
  };

  const updateMovie = async () => {
    await axios.put(`http://localhost:5000/movies/${editMovie._id}`, {
      title,
      description,
    });
    fetchMovies();
    setEditMovie(null);
    setTitle('');
    setDescription('');
  };

  const deleteMovie = async (id) => {
    await axios.delete(`http://localhost:5000/movies/${id}`);
    fetchMovies();
  };

  return (
    <div className="App">
      <h1>Favorite Movie List</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={editMovie ? updateMovie : addMovie}>
          {editMovie ? 'Update' : 'Add'}
        </button>
      </div>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <button
              onClick={() => {
                setEditMovie(movie);
                setTitle(movie.title);
                setDescription(movie.description);
              }}
            >
              Edit
            </button>
            <button onClick={() => deleteMovie(movie._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movie;
