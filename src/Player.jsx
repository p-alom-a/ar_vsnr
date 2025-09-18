import React, { useState, useEffect, useRef } from 'react';

const Player = ({
  isPlaying = false,
  onTogglePlay = () => {},
  onPlaylistClick = () => {},
  className = ""
}) => {
  // État local temporaire pour tester (désactivé)
  // const [localIsPlaying, setLocalIsPlaying] = useState(true);
  const [isPlayPressed, setIsPlayPressed] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(null);

  const handlePlayClick = () => {
    setIsPlayPressed(true);
    onTogglePlay();
    setTimeout(() => setIsPlayPressed(false), 150);
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setScrollPosition(prev => {
          const maxScroll = scrollRef.current?.scrollWidth / 2 || 0;
          return prev >= maxScroll ? 0 : prev + 1;
        });
      }, 50);
    } else {
      setScrollPosition(0);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div
      className={`player-container ${className}`}
      style={{
        backgroundColor: 'white',
        border: '4px solid black',
        borderRadius: '35px',
        boxShadow: '8px 8px 0 0 black',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '350px',
        width: 'fit-content',
        minWidth: 'auto',
        transition: 'all 0.1s ease'
      }}
    >
      {/* Bouton Play rond avec effet d'enfoncement */}
      <button
        onClick={handlePlayClick}
        onMouseDown={() => setIsPlayPressed(true)}
        onMouseUp={() => setIsPlayPressed(false)}
        onMouseLeave={() => setIsPlayPressed(false)}
        style={{
          width: 'clamp(50px, 15vw, 60px)',
          height: 'clamp(50px, 15vw, 60px)',
          borderRadius: '50%',
          backgroundColor: isPlaying ? '#FFB6C1' : '#98D4F7',
          border: '3px solid black',
          boxShadow: isPlayPressed ? '2px 2px 0 0 black' : '6px 6px 0 0 black',
          transform: isPlayPressed ? 'translate(2px, 2px)' : 'translate(0, 0)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'clamp(18px, 5vw, 24px)',
          color: 'black',
          fontWeight: 'bold',
          transition: 'all 0.1s ease',
          outline: 'none'
        }}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>

      {/* Bandeau défilant */}
      <div style={{
        flex: 1,
        overflow: 'hidden',
        position: 'relative',
        height: '40px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            transform: `translateX(-${scrollPosition}px)`,
            transition: 'none'
          }}
        >
          <span style={{
            fontSize: 'clamp(12px, 3.5vw, 14px)',
            fontWeight: 'bold',
            color: 'black',
            paddingRight: '50px'
          }}>
            Dinis, Jalam88 • frost
          </span>
          <span style={{
            fontSize: 'clamp(12px, 3.5vw, 14px)',
            fontWeight: 'bold',
            color: 'black',
            paddingRight: '50px'
          }}>
            Dinis, Jalam88 • frost
          </span>
        </div>
      </div>

      {/* Bouton Playlist avec flèche décorative */}
      <button
        onClick={onPlaylistClick}
        style={{
          backgroundColor: '#e5e5e5',
          border: '3px solid black',
          borderRadius: '12px',
          padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 16px)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: 'clamp(12px, 3.5vw, 14px)',
          fontWeight: 'bold',
          color: 'black',
          boxShadow: '4px 4px 0 0 black',
          transition: 'all 0.1s ease',
          outline: 'none',
          whiteSpace: 'nowrap'
        }}
        onMouseDown={(e) => {
          e.target.style.transform = 'translate(2px, 2px)';
          e.target.style.boxShadow = '2px 2px 0 0 black';
        }}
        onMouseUp={(e) => {
          e.target.style.transform = 'translate(0, 0)';
          e.target.style.boxShadow = '4px 4px 0 0 black';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translate(0, 0)';
          e.target.style.boxShadow = '4px 4px 0 0 black';
        }}
      >
        Ecouter en entier
        <span style={{
          fontSize: 'clamp(14px, 4vw, 16px)',
          fontWeight: 'bold'
        }}>
          →
        </span>
      </button>
    </div>
  );
};

export default Player;