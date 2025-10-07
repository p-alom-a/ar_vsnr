import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="landing-overlay">
      <div className="landing-container">
        <h2 className="landing-title">Bienvenue dans l'expérience AR</h2>
        <p className="landing-description">Prépare-toi à une aventure interactive.</p>
        <Link to="/vinylesync" className="start-button">
          C'est parti !
        </Link>
      </div>
    </div>
  );
}