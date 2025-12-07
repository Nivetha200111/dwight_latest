import React, { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

const GRID_ROWS = 45;
const GRID_COLS = 70;

function App() {
  const [simulation, setSimulation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);

  const clickSound = new Audio('sounds/click.mp3');
  const successSound = new Audio('sounds/success.mp3');

  const stopPlayback = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  };

  const startPlayback = useCallback((frames) => {
    stopPlayback();
    setFrameIndex(0);
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setFrameIndex(prevIndex => {
        if (prevIndex >= frames.length - 1) {
          stopPlayback();
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }, 60);
  }, []);

  const runSimulation = useCallback(async () => {
    clickSound.play();
    setLoading(true);
    setError(null);
    setSimulation(null);
    stopPlayback();
    try {
      const response = await fetch('/api/run_simulation');
      const data = await response.json();
      setSimulation(data);
      if (data.frames && data.frames.length > 0) {
        startPlayback(data.frames);
      }
      successSound.play();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [clickSound, successSound, startPlayback]);

  useEffect(() => {
    return () => stopPlayback(); // Cleanup on unmount
  }, []);

  const currentFrame = simulation?.frames[frameIndex];
  const grid = Array(GRID_ROWS * GRID_COLS).fill(null);

  if (currentFrame) {
    currentFrame.smoke.forEach(s => {
      const index = s.r * GRID_COLS + s.c;
      if (grid[index] === null) grid[index] = 'smoke';
    });
    currentFrame.fires.forEach(f => {
      const index = f.r * GRID_COLS + f.c;
      grid[index] = 'fire';
    });
    currentFrame.people.forEach(p => {
      const index = p.r * GRID_COLS + p.c;
      if (p.state === 'dead') {
         // Keep fire/smoke visible
      } else if (p.state === 'escaped') {
        if (grid[index] === null) grid[index] = 'escaped';
      } else if (p.warden) {
        grid[index] = 'warden';
      } else {
        grid[index] = 'alive';
      }
    });
  }

  const getStatusText = () => {
    if (loading) return 'Running...';
    if (isPlaying) return 'Playback in Progress...';
    if (simulation) return 'Finished';
    return 'Idle';
  }

  return (
    <div className="container">
      <div className="main-screen">
         <div className="scanline-overlay"></div>
        <div id="grid-container">
          {grid.map((cellType, i) => (
            <div key={i} className={`grid-cell ${cellType || ''}`} />
          ))}
        </div>
      </div>
      <div className="control-panel">
        <h1>DWIGHT UX</h1>
        <h2>Neural ACO Emergency Response System</h2>
        <div className="stats">
          <h3>SIMULATION RESULTS</h3>
          {simulation ? (
            <>
              <p><strong>Status:</strong> {getStatusText()}</p>
              <p><strong>Escaped:</strong> {simulation.escaped}</p>
              <p><strong>Deaths:</strong> {simulation.deaths}</p>
              <p><strong>Alive:</strong> {simulation.alive}</p>
              <p><strong>Fires Active:</strong> {simulation.fires_active}</p>
              <p><strong>Neural Confidence:</strong> {(simulation.neural_confidence * 100).toFixed(1)}%</p>
              <p><strong>RL Decisions:</strong> {simulation.rl_decisions}</p>
            </>
          ) : (
            <p><strong>Status:</strong> {getStatusText()}</p>
          )}
          {error && <p><strong>Error:</strong> {error}</p>}
        </div>
        <div className="innovations">
          <h3>PATENTABLE INNOVATIONS</h3>
          <ul>
            <li>🧠 Neural Predictive ACO (NP-ACO)</li>
            <li>📡 IoT Sensor Fusion Layer</li>
            <li>🤖 Reinforcement Learning Evacuation Coordinator</li>
            <li>🎯 3D Perspective View (Simulated)</li>
          </ul>
        </div>
        <button id="run-button" onClick={!isPlaying && simulation ? () => startPlayback(simulation.frames) : runSimulation} disabled={loading || isPlaying}>
          {loading ? 'Loading...' : (!isPlaying && simulation) ? 'Replay' : 'Run Simulation'}
        </button>
      </div>
    </div>
  );
}

export default App;
