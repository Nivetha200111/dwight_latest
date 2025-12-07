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
    let playbackTimer = null;
    let lastFrameIndex = 0;

    // Create the grid
    const rows = 50;
    const cols = 70;
    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        gridContainer.appendChild(cell);
    }

    const cells = Array.from(document.querySelectorAll('.grid-cell'));

    const clearPlayback = () => {
        if (playbackTimer) {
            cancelAnimationFrame(playbackTimer);
            playbackTimer = null;
        }
        lastFrameIndex = 0;
        cells.forEach(cell => {
            cell.classList.remove('fire', 'smoke', 'alive', 'dead', 'escaped', 'warden');
        });
    };

    const drawFrame = (frame) => {
        // Reset classes for dynamic elements
        cells.forEach(cell => cell.classList.remove('fire', 'smoke', 'alive', 'dead', 'escaped', 'warden'));

        frame.fires.forEach(({ r, c }) => {
            const idx = r * cols + c;
            cells[idx]?.classList.add('fire');
        });

        frame.smoke.forEach(({ r, c }) => {
            const idx = r * cols + c;
            cells[idx]?.classList.add('smoke');
        });

        frame.people.forEach(({ r, c, state, warden }) => {
            const idx = r * cols + c;
            if (!cells[idx]) return;
            cells[idx].classList.add(state);
            if (warden) cells[idx].classList.add('warden');
        });
    };

    const playFrames = (frames) => {
        if (!frames || !frames.length) return;
        const step = () => {
            const frame = frames[lastFrameIndex];
            drawFrame(frame);
            lastFrameIndex = (lastFrameIndex + 1) % frames.length;
            playbackTimer = requestAnimationFrame(step);
        };
        playbackTimer = requestAnimationFrame(step);
    };

    runButton.addEventListener('click', async () => {
        clickSound.play();
        status.textContent = 'Running...';
        runButton.disabled = true;
        clearPlayback();

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
            if (data.frames) {
                status.textContent = 'Replaying...';
                playFrames(data.frames);
            } else {
                status.textContent = 'Finished';
            }

        } catch (error) {
            console.error('Error running simulation:', error);
            status.textContent = `Error: ${error.message}`;
        } finally {
            runButton.disabled = false;
        }
    });
});
