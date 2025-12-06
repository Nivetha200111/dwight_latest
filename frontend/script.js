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
            const data = await response.json();

            status.textContent = 'Finished';
            escaped.textContent = data.escaped;
            deaths.textContent = data.deaths;
            alive.textContent = data.alive;
            fires.textContent = data.fires_active;
            confidence.textContent = `${(data.neural_confidence * 100).toFixed(1)}%`;
            rlDecisions.textContent = data.rl_decisions;

            successSound.play();

        } catch (error) {
            console.error('Error running simulation:', error);
            status.textContent = 'Error';
        } finally {
            runButton.disabled = false;
        }
    });
});
