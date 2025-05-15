const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('scoreDisplay');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScoreDisplay = document.getElementById('finalScore');
const restartButton = document.getElementById('restartButton');
const startButton = document.getElementById('startButton');

// --- Configuración del Juego ---
const birdWidth = 30;
const birdHeight = 24;
const birdColor = 'yellow';
const birdX = 50; // Posición X fija del pájaro

const pipeWidth = 60;
const pipeColor = 'green';
const pipeGap = 120; // Espacio vertical entre tuberías
const pipeSpeed = 2; // Píxeles por frame
const pipeSpawnInterval = 2000; // Milisegundos para generar nueva tubería

const gravity = 0.4;
const lift = -8; // Impulso hacia arriba

let birdY;
let birdVelocity;
let pipes; // Array de objetos de tuberías { x, topPipeHeight }
let score;
let gameOver;
let gameStarted;
let lastPipeSpawnTime;
let animationFrameId;

// --- Funciones del Juego ---

function resetGame() {
    canvas.width = 400;
    canvas.height = 600;

    birdY = canvas.height / 2 - birdHeight / 2;
    birdVelocity = 0;
    pipes = [];
    score = 0;
    gameOver = false;
    gameStarted = false; // Para controlar el inicio con botón
    lastPipeSpawnTime = 0;

    scoreDisplay.textContent = `Puntuación: 0`;
    gameOverScreen.classList.add('hidden');
    startButton.classList.remove('hidden'); // Mostrar botón de inicio
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId); // Detener bucle anterior si existe
    }
}

function startGame() {
    if (gameStarted) return; // Evitar múltiples inicios
    gameStarted = true;
    gameOver = false;
    startButton.classList.add('hidden'); // Ocultar botón de inicio
    resetGameInternals(); // Resetear variables internas sin afectar el canvas
    gameLoop();
}

function resetGameInternals() {
    birdY = canvas.height / 2 - birdHeight / 2;
    birdVelocity = 0;
    pipes = [];
    score = 0;
    lastPipeSpawnTime = 0;
    spawnPipe(); // Generar la primera tubería
}


function drawBird() {
    ctx.fillStyle = birdColor;
    ctx.fillRect(birdX, birdY, birdWidth, birdHeight);
    // Podrías dibujar un pájaro más complejo o usar una imagen aquí
}

function drawPipes() {
    ctx.fillStyle = pipeColor;
    pipes.forEach(pipe => {
        // Tubería superior
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topPipeHeight);
        // Tubería inferior
        const bottomPipeY = pipe.topPipeHeight + pipeGap;
        ctx.fillRect(pipe.x, bottomPipeY, pipeWidth, canvas.height - bottomPipeY);
    });
}

function spawnPipe() {
    const minHeight = 50;
    const maxHeight = canvas.height - pipeGap - minHeight;
    const topPipeHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
    pipes.push({ x: canvas.width, topPipeHeight: topPipeHeight, scored: false });
}

function updateBird() {
    birdVelocity += gravity;
    birdY += birdVelocity;

    // Evitar que el pájaro salga por arriba
    if (birdY < 0) {
        birdY = 0;
        birdVelocity = 0;
    }
}

function updatePipes() {
    pipes.forEach(pipe => {
        pipe.x -= pipeSpeed;

        // Incrementar puntuación si el pájaro pasa la tubería
        if (!pipe.scored && pipe.x + pipeWidth < birdX) {
            score++;
            pipe.scored = true;
            scoreDisplay.textContent = `Puntuación: ${score}`;
        }
    });

    // Eliminar tuberías que salen de la pantalla
    pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);

    // Generar nuevas tuberías
    if (Date.now() - lastPipeSpawnTime > pipeSpawnInterval) {
        spawnPipe();
        lastPipeSpawnTime = Date.now();
    }
}

function checkCollisions() {
    // Colisión con el suelo
    if (birdY + birdHeight > canvas.height) {
        return true;
    }

    // Colisión con tuberías
    for (let pipe of pipes) {
        const birdRight = birdX + birdWidth;
        const birdBottom = birdY + birdHeight;
        const pipeRight = pipe.x + pipeWidth;

        if (
            birdRight > pipe.x &&      // El pájaro está a la derecha del borde izquierdo de la tubería
            birdX < pipeRight &&       // El pájaro está a la izquierda del borde derecho de la tubería
            (birdY < pipe.topPipeHeight || birdBottom > pipe.topPipeHeight + pipeGap) // El pájaro choca con la parte superior o inferior
        ) {
            return true;
        }
    }
    return false;
}

function handleGameOver() {
    gameOver = true;
    gameStarted = false; // Permitir reiniciar con el botón de inicio
    finalScoreDisplay.textContent = score;
    gameOverScreen.classList.remove('hidden');
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
}

function gameLoop(timestamp) {
    if (gameOver) return;

    if (!lastPipeSpawnTime) lastPipeSpawnTime = timestamp; // Inicializar para el primer spawn

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Actualizar lógica
    updateBird();
    updatePipes();

    // Dibujar elementos
    drawPipes();
    drawBird();

    // Comprobar colisiones
    if (checkCollisions()) {
        handleGameOver();
        return; // Detener el bucle si hay colisión
    }

    animationFrameId = requestAnimationFrame(gameLoop);
}

// --- Event Listeners ---
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && gameStarted && !gameOver) {
        birdVelocity = lift;
    }
});

// Para dispositivos táctiles (un toque en cualquier lugar del canvas)
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Evitar comportamientos por defecto como scroll
    if (gameStarted && !gameOver) {
        birdVelocity = lift;
    }
});

restartButton.addEventListener('click', () => {
    resetGame(); // Resetea todo, incluyendo ocultar game over y mostrar start
    // startGame(); // No iniciar automáticamente, esperar al botón "Empezar"
});

startButton.addEventListener('click', startGame);


// --- Inicialización ---
resetGame(); // Prepara el juego al cargar la página
// El juego no comenzará hasta que se presione "Empezar Juego"