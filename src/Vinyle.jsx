import React, { useEffect, useRef, useState } from "react";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";

export default function App() {
  const audioRef = useRef(null);
  const [audioReady, setAudioReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  // attache les listeners MindAR / audio
  useEffect(() => {
    const sceneEl = document.querySelector("a-scene");
    const targetEl = sceneEl?.querySelector("[mindar-image-target]");
    const audio = audioRef.current;
    if (!targetEl || !audio) return;

    const onTargetFound = async () => {
      console.log("targetFound");
      setShowPlayer(true); // Afficher le player dès la détection
      if (!audioReady) {
        console.log("⚠️ audio pas encore débloqué (clic requis)");
        return;
      }
      try {
        await audio.play();
        // play() succeeded -> l'event 'play' mettra isPlaying=true
      } catch (err) {
        console.warn("play() rejeté :", err);
      }
    };

    const onTargetLost = () => {
      console.log("targetLost (on laisse la musique tourner et le player visible)");
      // Le player reste visible même si target perdue
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

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
  }, [audioReady]);

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
      {/* bouton pour débloquer l'audio si nécessaire */}
      {!audioReady && (
        <button
          onClick={enableAudio}
          style={{
            position: "absolute",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2000,
            padding: "10px 18px",
            borderRadius: 10,
            background: "#111",
            color: "white",
          }}
        >
          🎧 Activer l'audio
        </button>
      )}

      {/* audio controlé via ref */}
      <audio
        ref={audioRef}
        id="player-audio"
        src="https://p-alom-a.github.io/ar_vsnr/bbc_irian-jaya_nhu0501904.mp3"
        preload="auto"
        playsInline
      />

      {/* player UI */}
      {showPlayer && (
        <div
          id="player-ui"
          style={{
            display: "flex",
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            gap: 12,
            alignItems: "center",
            background: "rgba(0,0,0,0.6)",
            color: "white",
            padding: "8px 14px",
            borderRadius: 12,
            zIndex: 2000,
          }}
        >
          <button onClick={togglePlay} style={{ fontSize: 18 }}>
            {isPlaying ? "⏸ Pause" : "▶️ Play"}
          </button>

          {/* bouton suivant si tu veux une playlist locale */}
          {/* <button onClick={nextTrack}>⏭️ Suivant</button> */}

          <a
            href="https://open.spotify.com/playlist/xxxxxxxx"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "lightgreen", textDecoration: "none" }}
          >
            🎶 Playlist Spotify
          </a>
        </div>
      )}

      {/* ta scène A-Frame / MindAR */}
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
            position="0 0 0"
            scale="0.4 0.4 0.4"
            src="#vinyleModel"
            animation="property: rotation; to:0 0 -360; loop: true; dur: 8000; easing: linear"
          />
          <a-ring
            color="pink"
            radius-inner="0.3"
            radius-outer="0.35"
            position="0 0 0.01"
            animation="property: scale; from: 1 1 1; to: 3 3 3; dur: 2000; loop: true; easing: linear"
            animation__fade="property: opacity; from: 1; to: 0; dur: 2000; loop: true"
          />
          <a-ring
            color="pink"
            radius-inner="0.3"
            radius-outer="0.35"
            position="0 0 0.01"
            animation="property: scale; from: 1 1 1; to: 3 3 3; dur: 2000; delay: 1000; loop: true; easing: linear"
            animation__fade="property: opacity; from: 1; to: 0; dur: 2000; delay: 1000; loop: true"
          />
        </a-entity>
      </a-scene>
    </>
  );
}
