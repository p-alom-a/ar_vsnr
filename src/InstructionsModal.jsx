import React from 'react';

export default function InstructionsModal({ onStartExperience }) {
  return (
    <div className="instructions-modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title"><span className="modal-title-highlight">Scanne le logo sur gobelet,</span> <br/> en plus de contenir une délicieuse boisson, il cache une experience en réalité augmentée.</h2>

        <div className="instructions-modal">
        <div className="modal-content">
          <div className="instruction-item">
            <div className="instruction-number">1</div>
            <p>Augmentez le volume</p>
          </div>

          <div className="instruction-item">
            <div className="instruction-number">2</div>
            <p>Autorisez l'accès à la caméra et pointez vers le logo du gobelet</p>
          </div>

        </div>
        </div>

        <button
          className="start-button"
          onClick={onStartExperience}
        >
          C'est parti !
        </button>
      </div>
    </div>
  );
}