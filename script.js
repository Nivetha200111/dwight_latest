document.addEventListener('DOMContentLoaded', () => {
    const runButton = document.getElementById('run-button');
    const status = document.getElementById('status');
    const escaped = document.getElementById('escaped');
    const deaths = document.getElementById('deaths');
    const alive = document.getElementById('alive');
    const fires = document.getElementById('fires');
    const confidence = document.getElementById('confidence');
    const rlDecisions = document.getElementById('rl-decisions');
    const gridContainer = document.getElementById('grid-container');
    const clickSound = document.getElementById('click-sound');
    const successSound = document.getElementById('success-sound');

    // Create the grid
    for (let i = 0; i < 50 * 70; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        gridContainer.appendChild(cell);
    }

    runButton.addEventListener('click', async () => {
        clickSound.play();
        status.textContent = 'Running...';
        runButton.disabled = true;

        try {
            const response = await fetch('/api/run_simulation');

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server error:', errorData);
                status.textContent = `Error: ${errorData.error || 'Server error'}`;
                return;
            }

            const data = await response.json();

            if (data.error) {
                console.error('Simulation error:', data.error);
                status.textContent = `Error: ${data.error}`;
                return;
            }

            status.textContent = 'Finished';
            escaped.textContent = data.escaped || 0;
            deaths.textContent = data.deaths || 0;
            alive.textContent = data.alive || 0;
            fires.textContent = data.fires_active || 0;
            confidence.textContent = `${((data.neural_confidence || 0) * 100).toFixed(1)}%`;
            rlDecisions.textContent = data.rl_decisions || 0;

            successSound.play();

        } catch (error) {
            console.error('Error running simulation:', error);
            status.textContent = `Error: ${error.message}`;
        } finally {
            runButton.disabled = false;
        }
    });
});
