from flask import Flask, jsonify
from dwight import run_headless_simulation

app = Flask(__name__)

@app.route('/api/run_simulation')
def run_simulation():
    """
    Runs the headless simulation and returns the results as JSON.
    """
    results = run_headless_simulation()
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
