from flask import Flask, jsonify
from dwight import run_headless_simulation
import traceback

app = Flask(__name__)

# CORS headers
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST')
    return response

@app.route('/api/run_simulation', methods=['GET', 'POST'])
def run_simulation():
    """
    Runs the headless simulation and returns the results as JSON.
    """
    try:
        results = run_headless_simulation()
        return jsonify(results)
    except Exception as e:
        error_trace = traceback.format_exc()
        print(f"Error in simulation: {error_trace}")
        return jsonify({
            'error': str(e),
            'traceback': error_trace
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
