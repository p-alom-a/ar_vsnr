import React from 'react';

export default function InfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="instructions-modal-overlay">
      <div className="modal-container" style={{
        marginTop: window.innerWidth <= 768 ? '80px' : '0',
        marginLeft: window.innerWidth <= 768 ? '30px' : '20px',
        marginRight: window.innerWidth <= 768 ? '30px' : '20px'
      }}>
        <div className="instructions-modal" style={{ position: 'relative' }}>
          {/* Bouton croix en haut à gauche */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: window.innerWidth <= 768 ? '-20px' : '-50px',
              left: window.innerWidth <= 768 ? '-20px' : '-50px',
              width: window.innerWidth <= 768 ? '30px' : '40px',
              height: window.innerWidth <= 768 ? '30px' : '40px',
              borderRadius: '6px',
              backgroundColor: '#98D4F7',
              border: '2px solid #000000',
              fontSize: window.innerWidth <= 768 ? '14px' : '18px',
              fontWeight: 'bold',
              color: '#000000',
              cursor: 'pointer',
              zIndex: 10,
              boxShadow: window.innerWidth <= 768 ? '3px 3px 0px #000000' : '4px 4px 0px #000000',
              transition: 'all 0.1s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseDown={(e) => {
              e.target.style.transform = 'translate(2px, 2px)';
              e.target.style.boxShadow = '2px 2px 0px #000000';
            }}
            onMouseUp={(e) => {
              e.target.style.transform = 'translate(0px, 0px)';
              e.target.style.boxShadow = '4px 4px 0px #000000';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translate(0px, 0px)';
              e.target.style.boxShadow = '4px 4px 0px #000000';
            }}
          >
            ×
          </button>

          <div className="modal-content">
            <h3 style={{
              fontFamily: '"Arvo", "Libre Baskerville", "Baskerville", "Georgia", "Times New Roman", serif',
              fontSize: '1.3em',
              fontWeight: '700',
              color: '#000000',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              À propos de ce projet
            </h3>

            <div style={{
              fontSize: '1em',
              lineHeight: '1.5',
              color: '#000000',
              marginBottom: '20px',
              textAlign: 'left'
            }}>
              <p style={{ marginBottom: '15px' }}>
                <strong>Hey ! 👋</strong>
              </p>

              <p style={{ marginBottom: '15px' }}>
                Je suis développeuse (et addict à vos americanos). J'ai créé cette petite démo AR pour le Café Visionnaire - juste pour le fun et voir ce que ça donne !
              </p>

              <p style={{ marginBottom: '15px' }}>
                L'idée c'est d'explorer comment mixer tech et café. Si ça vous branche pour booster votre comm ou partir sur un projet plus dingue, on peut en parler. Sinon, ça me va totalement de le garder en projet perso - j'aimerais juste votre feu vert pour le publier.
              </p>

              <p style={{ marginBottom: '15px' }}>
                <strong>Bref, merci pour l'inspi et les excellents cafés ! ☕</strong>
              </p>

              <p style={{
                marginBottom: '15px',
                textAlign: 'right',
                fontStyle: 'italic',
                fontSize: '0.9em'
              }}>
                — Paloma
              </p>

              <div style={{
                marginTop: '20px',
                paddingTop: '15px',
                borderTop: '2px solid #e0e0e0',
                fontSize: '0.9em'
              }}>
                <p style={{ marginBottom: '5px' }}>
                  <strong>Contact :</strong> contact@studiomaak.fr
                </p>
                <p style={{ margin: '0' }}>
                  <strong>Portfolio :</strong> <a
                    href="https://www.studiomaak.fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#000000',
                      textDecoration: 'underline',
                      fontWeight: 'bold'
                    }}
                  >
                    studiomaak.fr
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}