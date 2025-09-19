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
        border: '2px solid black',
        borderRadius: '35px',
        boxShadow: '8px 8px 0 0 black',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        maxWidth: '280px',
        width: 'fit-content',
        minWidth: 'auto',
        height: '3em',
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
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          backgroundColor: isPlaying ? '#FFB6C1' : '#98D4F7',
          border: '2px solid black',
          boxShadow: isPlayPressed ? '1px 1px 0 0 black' : '3px 3px 0 0 black',
          transform: isPlayPressed ? 'translate(1px, 1px)' : 'translate(0, 0)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          color: 'black',
          fontWeight: 'bold',
          transition: 'all 0.1s ease',
          outline: 'none'
        }}
      >
{isPlaying ? (
          <div style={{ display: 'flex', gap: '2px' }}>
            <div style={{ width: '2px', height: '10px', backgroundColor: 'black' }}></div>
            <div style={{ width: '2px', height: '10px', backgroundColor: 'black' }}></div>
          </div>
        ) : '▶'}
      </button>

      {/* Bandeau défilant */}
      <div style={{
        flex: 1,
        overflow: 'hidden',
        position: 'relative',
        height: '24px',
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
            fontSize: '11px',
            fontWeight: 'bold',
            color: 'black',
            paddingRight: '30px'
          }}>
            Dinis, Jalam88 • frost
          </span>
          <span style={{
            fontSize: '11px',
            fontWeight: 'bold',
            color: 'black',
            paddingRight: '30px'
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
          border: '1px solid black',
          borderRadius: '8px',
          padding: '4px 8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '10px',
          color: 'black',
          boxShadow: 'none',
          transition: 'all 0.1s ease',
          outline: 'none',
          whiteSpace: 'normal',
          textAlign: 'center',
          lineHeight: '1.1'
        }}
        onMouseDown={(e) => {
          e.target.style.transform = 'translate(1px, 1px)';
        }}
        onMouseUp={(e) => {
          e.target.style.transform = 'translate(0, 0)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translate(0, 0)';
        }}
      >
        Ecouter<br/>entièrement
       
      </button>
    </div>
  );
};

export default Player;