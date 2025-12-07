import sys
import os

# Ensure headless mode for serverless
os.environ["HEADLESS"] = "1"
os.environ["SDL_VIDEODRIVER"] = "dummy"
os.environ["SDL_AUDIODRIVER"] = "dummy"

# Add backend to path so we can import dwight
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    """
    Vercel serverless function handler for running the simulation.
    """

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        self._handle_request()

    def do_POST(self):
        self._handle_request()

    def _send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def _handle_request(self):
        try:
            from dwight import run_headless_simulation

            # Run the simulation
            results = run_headless_simulation(steps=240)

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps(results).encode())

        except Exception as e:
            import traceback
            error_trace = traceback.format_exc()
            print(f"Error in simulation: {error_trace}")

            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({
                'error': str(e),
                'traceback': error_trace
            }).encode())
