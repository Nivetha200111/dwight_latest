# How to Run DWIGHT UX - Neural ACO Emergency Response System

## Fixed Issues ✅

1. **500 Server Error & JSON Parsing Issue**
   - Added proper error handling in Flask backend
   - Backend now returns JSON even on errors
   - Frontend handles error responses gracefully

2. **Favicon 404 Error**
   - Added custom Y2K-themed SVG favicon
   - Favicon matches the application's purple/cyan color scheme

3. **Y2K Theme Update**
   - Changed from green/black to purple/cyan/magenta theme
   - Added gradient backgrounds and glowing effects
   - Updated button styles with Y2K aesthetic

## Requirements

- Python 3.13 (or 3.8+)
- Virtual environment with Flask, pygame, and numpy

## Installation

1. Install dependencies:
```bash
cd /home/nivetha/dwight_latest
./venv/bin/pip install -r backend/requirements.txt
```

2. Verify installation:
```bash
./venv/bin/python -c "import flask; import pygame; import numpy; print('All dependencies installed!')"
```

## Running the Application

### Option 1: Run Backend and Frontend Separately (Recommended for Development)

1. **Start the Flask Backend**:
```bash
cd /home/nivetha/dwight_latest/backend
HEADLESS=1 ../venv/bin/python app.py
```

The backend will start on `http://0.0.0.0:5000`

2. **Serve the Frontend** (in a new terminal):
```bash
cd /home/nivetha/dwight_latest/frontend
python -m http.server 8000
```

3. **Access the Application**:
Open your browser and navigate to:
```
http://localhost:8000
```

### Option 2: Run the Standalone Pygame Simulation

```bash
cd /home/nivetha/dwight_latest/backend
../venv/bin/python dwight.py
```

This will launch the interactive Pygame window with the full simulation.

## Features

- 🧠 **Neural Predictive ACO (NP-ACO)**: LSTM network predicts fire spread
- 📡 **IoT Sensor Fusion**: Simulated temperature, smoke, CO, and motion sensors
- 🤖 **RL Evacuation Coordinator**: Q-learning agent optimizes warden deployment
- 🎯 **Y2K Aesthetic**: Purple, cyan, and magenta themed interface with glowing effects

## Troubleshooting

### If you get "Module not found" errors:
```bash
./venv/bin/pip install flask pygame numpy
```

### If the simulation crashes:
Make sure HEADLESS mode is enabled when running the backend:
```bash
export HEADLESS=1
```

### If you see CORS errors:
The backend includes CORS headers, but if you still have issues, make sure the frontend is accessing the backend at the correct URL (`http://localhost:5000/api/run_simulation`).

## API Endpoint

**GET/POST** `/api/run_simulation`

Returns JSON with simulation results:
```json
{
  "steps_run": 240,
  "escaped": 45,
  "deaths": 2,
  "alive": 13,
  "fires_active": 3,
  "neural_confidence": 0.73,
  "rl_decisions": 15,
  "sensor_coverage": 96.5,
  "avg_temp": 28.4
}
```

---

Enjoy the Y2K-themed emergency evacuation simulation! 🔥🚨💜
