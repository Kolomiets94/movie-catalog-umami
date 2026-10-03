import React, { useEffect, useState } from 'react';
import { getShows, searchShows, Show } from '../api/shows';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleFavorite } from '../store/favoritesSlice';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const favorites = useSelector((s: RootState) => s.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const data = await getShows();
        setShows(data);
      } catch (e) {
        setError('Failed to load shows');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSearch = async (q: string) => {
    setQuery(q);
    if (q.trim()) {
      const results = await searchShows(q);
      setShows(results);
    } else {
      const data = await getShows();
      setShows(data);
    }
  };

  return (
    <div className="content">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Loading...</div>}
      {!loading && shows.length === 0 && <div className="error">No movies found</div>}
      {!loading && shows.length > 0 && (
        <div className="movies-grid">
          {shows.map((show) => (
            <div key={show.id} className="movie-card">
              {show.image?.medium ? (
                <img src={show.image.medium} alt={show.name} className="movie-poster" />
              ) : (
                <div className="movie-poster">No Image</div>
              )}
              <div className="movie-info">
                <Link to={`/movie/${show.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 className="movie-title">{show.name}</h3>
                </Link>
                <p className="movie-year">{show.premiered?.split('-')[0] || 'N/A'}</p>
                <div className="movie-genres">
                  {show.genres.map((g) => <span key={g} className="genre-tag">{g}</span>)}
                </div>
                {show.rating?.average && <div className="movie-rating">⭐ {show.rating.average}</div>}
                <button
                  onClick={() => dispatch(toggleFavorite(show.id))}
                  style={{
                    marginTop: '10px',
                    padding: '8px 12px',
                    background: favorites.includes(show.id) ? '#ff1493' : '#00d4ff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: '0.3s'
                  }}
                >
                  {favorites.includes(show.id) ? '❤️ Saved' : '🤍 Save'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
