import React from 'react';
import { PlayCircle } from 'lucide-react';
import Equalizer from './Equalizer';

const SongCard = ({ song }) => {
  if (!song) return null;

  return (
    <div className="song-card">
      <div className="now-playing-header">
        <Equalizer /> Now Playing
      </div>
      
      <div className="song-info">
        <div className="thumbnail-container">
          <img src={song.thumbnail} alt={song.title} />
        </div>
        <div className="song-details">
          <h3 className="song-title">{song.title}</h3>
          <p className="song-artist">{song.artist}</p>
          <div className="tags">
            <span className="tag">{song.mood}</span>
            <span className="tag">{song.language}</span>
          </div>
        </div>
      </div>

      {song.spotify && (
        <div style={{ marginTop: '1rem', width: '100%' }}>
          <iframe 
            style={{ borderRadius: "12px" }}
            src={song.spotify} 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allowFullScreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          ></iframe>
        </div>
      )}

      {song.spotify && (
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <a 
            href={song.spotify.replace('embed/', '')} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="primary-btn"
            style={{ 
              textDecoration: 'none', 
              display: 'inline-flex', 
              width: 'auto', 
              padding: '0.8rem 1.5rem', 
              position: 'relative', 
              zIndex: 10, 
              background: '#1DB954', 
              boxShadow: '0 4px 15px rgba(29, 185, 84, 0.4)' 
            }}
          >
            <PlayCircle size={20} /> Play on Spotify
          </a>
        </div>
      )}
    </div>
  );
};

export default SongCard;
