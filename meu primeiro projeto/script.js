

const API_KEY = 'b456ca01cff7b9d57670a85fd008c7a4';
const BASE_URL = 'https://api.themoviedb.org/3';

const form = document.getElementById('movie-form');
const genreSelect = document.getElementById('genre');
const movieCard = document.getElementById('movie-card');

async function fetchMoviesByGenre(genreId) {
  try {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=pt-BR`);
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Filmes retornados pela API:', data.results); 
    return data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return [];
  }
}


function displayMovie(movie) {
  if (!movie || !movie.poster_path) {
    movieCard.innerHTML = '<p>No movies found for this genre. Try another one!</p>';
    return;
  }

  movieCard.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <div>
      <h3>${movie.title}</h3>
      <p>${movie.overview || 'No description available.'}</p>
      <p><strong>Release Date:</strong> ${movie.release_date || 'Unknown'}</p>
      <button onclick="window.open('https://www.themoviedb.org/movie/${movie.id}')">More Info</button>
    </div>
  `;
}


form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const selectedGenre = genreSelect.value;
  movieCard.innerHTML = '<p>Loading...</p>'; 

  const movies = await fetchMoviesByGenre(selectedGenre);

  if (movies.length > 0) {
    const randomMovie = movies[Math.floor(Math.random() * movies.length)]; 
    displayMovie(randomMovie);
  } else {
    movieCard.innerHTML = '<p>No movies found for this genre. Try another one!</p>';
  }
});