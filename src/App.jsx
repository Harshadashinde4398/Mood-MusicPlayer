import React, { useState, useEffect } from 'react';
import { Moon, Sun, Rocket, Shuffle } from 'lucide-react';
import { songs, moods, languages } from './data/songs';
import SongCard from './components/SongCard';

function App() {
  const [selectedMood, setSelectedMood] = useState(moods[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [currentSong, setCurrentSong] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handlePlayMusic = () => {
    setIsLoading(true);
    setCurrentSong(null);
    setHasSearched(true);

    setTimeout(() => {
      // Filter songs based on mood and language
      const filteredSongs = songs.filter(
        (s) => s.mood === selectedMood && s.language === selectedLanguage
      );

      let songToPlay = null;
      if (filteredSongs.length > 0) {
        // Pick random song from filtered list
        const randomIndex = Math.floor(Math.random() * filteredSongs.length);
        songToPlay = filteredSongs[randomIndex];
      }

      setCurrentSong(songToPlay);
      setIsLoading(false);
    }, 800); // Fake loading effect for modern feel
  };

  const handleRandomSong = () => {
    setIsLoading(true);
    setCurrentSong(null);
    setHasSearched(true);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * songs.length);
      const song = songs[randomIndex];
      setSelectedMood(song.mood);
      setSelectedLanguage(song.language);
      setCurrentSong(song);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="app-container">
      <header>
        <button 
          className="theme-toggle" 
          onClick={() => setIsDarkMode(!isDarkMode)}
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </header>

      <div className="main-card">
        <h1>🎵 Mood-Based Music Player</h1>
        
        <div className="form-group">
          <label>How are you feeling today?</label>
          <select 
            value={selectedMood} 
            onChange={(e) => setSelectedMood(e.target.value)}
          >
            {moods.map((mood) => (
              <option key={mood} value={mood}>{mood}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Select your preferred song language</label>
          <select 
            value={selectedLanguage} 
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div className="action-buttons">
          <button className="primary-btn" onClick={handlePlayMusic}>
            <Rocket size={20} /> Let's Play
          </button>
          <button className="secondary-btn" onClick={handleRandomSong}>
            <Shuffle size={20} /> Surprise Me
          </button>
        </div>

        {isLoading && (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Finding the perfect tune...</p>
          </div>
        )}

        {!isLoading && hasSearched && !currentSong && (
          <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--card-border)', borderRadius: '10px' }}>
            <p>No Spotify song available for this mood and language.</p>
          </div>
        )}

        {!isLoading && currentSong && (
          <SongCard song={currentSong} />
        )}
      </div>

      <footer className="footer">
        Created by Harshada Shinde
      </footer>
    </div>
  );
}

export default App;
