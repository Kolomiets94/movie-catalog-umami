import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getShow, Show } from '../api/shows';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleFavorite } from '../store/favoritesSlice';

export const MoviePage = () => {
  const { id } = useParams();
  const showId = Number(id);
  const [show, setShow] = useState<Show | null>(null);
  const [error, setError] = useState('');
  const favorites = useSelector((s: RootState) => s.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const data = await getShow(showId);
        setShow(data);
      } catch (e) {
        setError('Failed to load show details');
      }
    })();
  }, [showId]);

  return (
    <div className="content">
      {error && <div className="error">{error}</div>}
      {!show && !error && <div className="loading">Loading...</div>}
      {show && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link to="/" style={{ color: '#00d4ff', textDecoration: 'none', marginBottom: '20px', display: 'block' }}>
            ← Back to catalogue
          </Link>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              {show.image?.original ? (
                <img src={show.image.original} alt={show.name} style={{ width: '100%', borderRadius: '10px' }} />
              ) : (
                <div style={{ width: '100%', height: '400px', background: '#333', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  No Image
                </div>
              )}
            </div>
            <div>
              <h1 style={{ margin: '0 0 20px' }}>{show.name}</h1>
              <p><strong>Year:</strong> {show.premiered?.split('-')[0] || 'N/A'}</p>
              <p><strong>Genres:</strong> {show.genres.join(', ') || 'N/A'}</p>
              {show.rating?.average && <p><strong>Rating:</strong> ⭐ {show.rating.average}/10</p>}
              <button
                onClick={() => dispatch(toggleFavorite(show.id))}
                style={{
                  padding: '12px 20px',
                  background: favorites.includes(show.id) ? '#ff1493' : '#00d4ff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: '0.3s'
                }}
              >
                {favorites.includes(show.id) ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
              </button>
            </div>
          </div>
          {show.summary && (
            <div>
              <h2>Summary</h2>
              <div dangerouslySetInnerHTML={{ __html: show.summary }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
