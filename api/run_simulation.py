import sys
import os

# Add backend to path so we can import dwight
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from dwight import run_headless_simulation
import json

def handler(request):
    """
    Vercel serverless function handler for running the simulation.
    """
    try:
        # Run the simulation
        results = run_headless_simulation(steps=240)

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': json.dumps(results)
        }
    except Exception as e:
        import traceback
        error_trace = traceback.format_exc()
        print(f"Error in simulation: {error_trace}")

        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            'body': json.dumps({
                'error': str(e),
                'traceback': error_trace
            })
        }
