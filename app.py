import os
import sys

# Ensure headless mode
os.environ["HEADLESS"] = "1"
os.environ["SDL_VIDEODRIVER"] = "dummy"
os.environ["SDL_AUDIODRIVER"] = "dummy"

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from flask import Flask, jsonify, send_from_directory
from dwight import run_headless_simulation
import traceback

app = Flask(__name__, static_folder='.', static_url_path='')

# CORS headers
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST')
    return response

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('.', filename)

@app.route('/sounds/<path:filename>')
def sounds(filename):
    return send_from_directory('sounds', filename)

@app.route('/api/run_simulation', methods=['GET', 'POST'])
def run_simulation():
    """
    Runs the headless simulation and returns the results as JSON.
    """
    try:
        results = run_headless_simulation(steps=240)
        return jsonify(results)
    except Exception as e:
        error_trace = traceback.format_exc()
        print(f"Error in simulation: {error_trace}")
        return jsonify({
            'error': str(e),
            'traceback': error_trace
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
