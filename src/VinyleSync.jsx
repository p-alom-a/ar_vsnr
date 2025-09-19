import React, { useEffect, useRef, useState } from "react";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";
import Player from './Player';
import InstructionsModal from './InstructionsModal';
import InfoModal from './InfoModal';

export default function VinyleSync() {
  const audioRef = useRef(null);
  const vinyleRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const [audioReady, setAudioReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTargetVisible, setIsTargetVisible] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [arReady, setArReady] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  // État calculé : les animations doivent tourner SI audio joue ET target visible
  const shouldAnimate = isPlaying && isTargetVisible;

  // Fonction pour démarrer les animations
  const startAnimations = () => {
    if (vinyleRef.current) {
      vinyleRef.current.setAttribute('animation', 'property: rotation; to:0 0 -360; loop: true; dur: 8000; easing: linear');
    }
    if (ring1Ref.current) {
      ring1Ref.current.setAttribute('animation', 'property: scale; from: 1 1 1; to: 3 3 3; dur: 2000; loop: true; easing: linear');
      ring1Ref.current.setAttribute('animation__fade', 'property: opacity; from: 1; to: 0; dur: 2000; loop: true');
    }
    if (ring2Ref.current) {
      ring2Ref.current.setAttribute('animation', 'property: scale; from: 1 1 1; to: 3 3 3; dur: 2000; delay: 1000; loop: true; easing: linear');
      ring2Ref.current.setAttribute('animation__fade', 'property: opacity; from: 1; to: 0; dur: 2000; delay: 1000; loop: true');
    }
  };

  // Fonction pour arrêter et reset les animations
  const stopAndResetAnimations = () => {
    if (vinyleRef.current) {
      vinyleRef.current.removeAttribute('animation');
      // Reset la rotation à 0
      vinyleRef.current.setAttribute('rotation', '0 0 0');
    }
    if (ring1Ref.current) {
      ring1Ref.current.removeAttribute('animation');
      ring1Ref.current.removeAttribute('animation__fade');
      // Faire disparaître les anneaux
      ring1Ref.current.setAttribute('opacity', '0');
    }
    if (ring2Ref.current) {
      ring2Ref.current.removeAttribute('animation');
      ring2Ref.current.removeAttribute('animation__fade');
      // Faire disparaître les anneaux
      ring2Ref.current.setAttribute('opacity', '0');
    }
  };

  // Réagir aux changements d'état pour synchroniser les animations
  useEffect(() => {
    if (shouldAnimate) {
      startAnimations();
    } else {
      stopAndResetAnimations();
    }
  }, [shouldAnimate]);

  // attache les listeners MindAR / audio seulement quand AR est prêt
  useEffect(() => {
    if (!arReady) return;

    const sceneEl = document.querySelector("a-scene");
    const targetEl = sceneEl?.querySelector("[mindar-image-target]");
    const audio = audioRef.current;
    if (!targetEl || !audio) return;

    const onTargetFound = async () => {
      console.log("targetFound");
      setIsTargetVisible(true);
      setShowPlayer(true);
      
      // Essayer de démarrer l'audio, ou débloquer automatiquement si besoin
      try {
        if (!audioReady) {
          // Essayer de débloquer l'audio automatiquement
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          if (audioContext.state === 'suspended') {
            await audioContext.resume();
          }
          setAudioReady(true);
        }
        await audio.play();
      } catch (err) {
        console.warn("play() rejeté :", err);
        // Si ça échoue, on laisse l'utilisateur utiliser le bouton
      }
    };

    const onTargetLost = () => {
      console.log("targetLost");
      setIsTargetVisible(false);
      
      // Arrêter l'audio quand target perdue
      if (audio && !audio.paused) {
        audio.pause();
      }
    };

    // Les événements audio ne gèrent QUE l'état isPlaying
    const onPlay = () => {
      console.log("audio playing");
      setIsPlaying(true);
    };
    
    const onPause = () => {
      console.log("audio paused");
      setIsPlaying(false);
    };

    targetEl.addEventListener("targetFound", onTargetFound);
    targetEl.addEventListener("targetLost", onTargetLost);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      targetEl.removeEventListener("targetFound", onTargetFound);
      targetEl.removeEventListener("targetLost", onTargetLost);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [arReady, audioReady]);

  // Méthode recommandée 2024 : création d'AudioContext dans le user gesture
  const enableAudio = () => {
    try {
      // Créer l'AudioContext directement dans le user gesture (état "running")
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();

      // Vérifier l'état et résumer si nécessaire
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      setAudioReady(true);
      setShowInstructions(false);
      setArReady(true);
      console.log("✅ Audio débloqué selon les standards 2024");
    } catch (err) {
      console.warn("Impossible de débloquer l'audio :", err);
    }
  };

  // play/pause custom
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audioReady) {
      await enableAudio();
    }
    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (err) {
      console.warn("toggle play/pause échoué :", err);
    }
  };

  return (
    <>
      {/* Bouton info en haut à droite */}
      {showPlayer && (
        <button
          onClick={() => setShowInfoModal(true)}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            width: '35px',
            height: '35px',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            border: '2px solid #000000',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#000000',
            cursor: 'pointer',
            zIndex: 10,
            boxShadow: '6px 6px 0px #000000',
            transition: 'all 0.1s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseDown={(e) => {
            e.target.style.transform = 'translate(3px, 3px)';
            e.target.style.boxShadow = '3px 3px 0px #000000';
          }}
          onMouseUp={(e) => {
            e.target.style.transform = 'translate(0px, 0px)';
            e.target.style.boxShadow = '6px 6px 0px #000000';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translate(0px, 0px)';
            e.target.style.boxShadow = '6px 6px 0px #000000';
          }}
        >
          ?
        </button>
      )}

      {/* Modale d'informations */}
      <InfoModal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
      />

      {/* Modale d'instructions neubrutalism */}
      {showInstructions && (
        <InstructionsModal onStartExperience={enableAudio} />
      )}

      {/* audio controlé via ref */}
      <audio
        ref={audioRef}
        id="player-audio"
        src="https://p-alom-a.github.io/ar_vsnr/frost.mp3"
        preload="auto"
        playsInline
      />

      {/* player UI */}
      {showPlayer && (
        <div style={{
          position: "fixed",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2000,
        }}>
          <Player
            isPlaying={isPlaying}
            onTogglePlay={togglePlay}
            onPlaylistClick={() => window.open("https://lnk.dmsmusic.co/dinisjalam88_frost?fbclid=PAZXh0bgNhZW0CMTEAAachTNB2Vto6sJc_51WJa9m1jYaNpQa0UIYAPWKPmiGvpY99WuCQvDtvweHJPQ_aem_TsU8wnQMAxoJQW0ys_Hcmw", "_blank")}
          />
        </div>
      )}

      {/* ta scène A-Frame / MindAR - seulement quand AR prêt */}
      {arReady && (
        <a-scene
          mindar-image="imageTargetSrc: https://p-alom-a.github.io/ar_vsnr/targets-cup.mind;"
          color-space="sRGB"
          renderer="colorManagement: true, physicallyCorrectLights"
          vr-mode-ui="enabled: false"
          device-orientation-permission-ui="enabled: false"
        >
        <a-assets>
          <a-asset-item
            id="vinyleModel"
            src="https://p-alom-a.github.io/ar_vsnr/models/vinyle2.glb"
          />
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false" />

        <a-entity mindar-image-target="targetIndex: 0">
          <a-gltf-model
            ref={vinyleRef}
            position="0 0 0"
            scale="0.4 0.4 0.4"
            src="#vinyleModel"
          />
          
          <a-ring
            ref={ring1Ref}
            color="pink"
            radius-inner="0.3"
            radius-outer="0.35"
            position="0 0 0.01"
          />
          
          <a-ring
            ref={ring2Ref}
            color="pink"
            radius-inner="0.3"
            radius-outer="0.35"
            position="0 0 0.01"
          />
        </a-entity>
        </a-scene>
      )}
    </>
  );
}