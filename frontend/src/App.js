import React, { useState, useCallback } from 'react';
import './App.css';

function App() {
  const [simulation, setSimulation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clickSound = new Audio('sounds/click.mp3');
  const successSound = new Audio('sounds/success.mp3');

  const runSimulation = useCallback(async () => {
    clickSound.play();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/run_simulation');
      const data = await response.json();
      setSimulation(data);
      successSound.play();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [clickSound, successSound]);

  return (
    <div className="container">
      <div className="main-screen">
        <div id="grid-container">
          {Array.from({ length: 50 * 70 }).map((_, i) => (
            <div key={i} className="grid-cell" />
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
              <p><strong>Status:</strong> Finished</p>
              <p><strong>Escaped:</strong> {simulation.escaped}</p>
              <p><strong>Deaths:</strong> {simulation.deaths}</p>
              <p><strong>Alive:</strong> {simulation.alive}</p>
              <p><strong>Fires Active:</strong> {simulation.fires_active}</p>
              <p><strong>Neural Confidence:</strong> {(simulation.neural_confidence * 100).toFixed(1)}%</p>
              <p><strong>RL Decisions:</strong> {simulation.rl_decisions}</p>
            </>
          ) : (
            <p><strong>Status:</strong> {loading ? 'Running...' : 'Idle'}</p>
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
        <button id="run-button" onClick={runSimulation} disabled={loading}>
          {loading ? 'Running...' : 'RUN SIMULATION'}
        </button>
      </div>
    </div>
  );
}

export default App;
