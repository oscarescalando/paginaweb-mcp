document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game-board');
    const context = canvas.getContext('2d');
    const nextCanvas = document.getElementById('next-piece-canvas');
    const nextContext = nextCanvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const levelElement = document.getElementById('level'); // No implementado, pero aquí estaría

    const COLS = 10;
    const ROWS = 20;
    const BLOCK_SIZE = 30; // Ajusta según el tamaño deseado del tablero
    const NEXT_BLOCK_SIZE = 20; // Para la vista previa

    canvas.width = COLS * BLOCK_SIZE;
    canvas.height = ROWS * BLOCK_SIZE;
    nextCanvas.width = 4 * NEXT_BLOCK_SIZE; // Suficiente para cualquier pieza 4x4
    nextCanvas.height = 4 * NEXT_BLOCK_SIZE;

    context.scale(BLOCK_SIZE, BLOCK_SIZE);
    nextContext.scale(NEXT_BLOCK_SIZE, NEXT_BLOCK_SIZE);

    let board = createBoard();
    let currentPiece;
    let nextPiece;
    let score = 0;
    let gameOver = false;
    let gamePaused = false;
    let dropCounter = 0;
    let dropInterval = 1000; // ms
    let lastTime = 0;

    const COLORS = [
        null,       // 0 - empty
        '#FF0D72',  // 1 - T (purple in video)
        '#0DC2FF',  // 2 - I (cyan)
        '#0DFF72',  // 3 - S (green)
        '#F538FF',  // 4 - Z (red in video, but used T's purple already, so magenta)
        '#FF8E0D',  // 5 - L (orange)
        '#FFE138',  // 6 - O (yellow)
        '#3877FF'   // 7 - J (blue)
    ];
    
    // Gris para piezas ya fijadas (como en el video)
    const LOCKED_COLOR_INDEX = 8; 
    COLORS[LOCKED_COLOR_INDEX] = '#808080'; // Gris

    // Para el score +10, +20 etc.
    const SCORE_TEXT_COLOR = 'white';
    const SCORE_TEXT_FONT = '1px "Press Start 2P"'; // Tamaño relativo al scale
    let floatingScores = [];


    const SHAPES = [
        [], // Placeholder for 0 index
        [[0, 1, 0], [1, 1, 1], [0, 0, 0]], // T
        [[0, 0, 0, 0], [2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0]], // I
        [[0, 3, 3], [3, 3, 0], [0, 0, 0]], // S
        [[4, 4, 0], [0, 4, 4], [0, 0, 0]], // Z
        [[0, 0, 5], [5, 5, 5], [0, 0, 0]], // L
        [[6, 6], [6, 6]], // O
        [[7, 0, 0], [7, 7, 7], [0, 0, 0]]  // J
    ];

    function createBoard() {
        return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    }

    function drawBlock(ctx, x, y, colorIndex, blockSize = 1) {
        if (colorIndex === 0) return; // No dibujar bloques vacíos
        
        const color = COLORS[colorIndex];
        ctx.fillStyle = color;
        ctx.fillRect(x, y, blockSize, blockSize);

        // Simular borde pixelado más oscuro
        ctx.strokeStyle = 'rgba(0,0,0,0.5)'; // Borde oscuro
        ctx.lineWidth = 0.05 * blockSize; // Muy fino
        ctx.strokeRect(x + ctx.lineWidth / 2, y + ctx.lineWidth / 2, 
                       blockSize - ctx.lineWidth, blockSize - ctx.lineWidth);
        
        // Simular un brillo pequeño en la parte superior/izquierda
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fillRect(x + 0.1*blockSize, y + 0.1*blockSize, 0.8*blockSize, 0.15*blockSize); // Top highlight
        ctx.fillRect(x + 0.1*blockSize, y + 0.1*blockSize, 0.15*blockSize, 0.8*blockSize); // Left highlight
    }
    
    function drawBoard() {
        board.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    drawBlock(context, x, y, value);
                }
            });
        });
        // Dibuja la cuadrícula
        context.strokeStyle = '#00000030'; // Color de la cuadrícula
        context.lineWidth = 0.02; // Grosor de línea muy fino
        for (let i = 0; i <= COLS; i++) {
            context.beginPath();
            context.moveTo(i, 0);
            context.lineTo(i, ROWS);
            context.stroke();
        }
        for (let i = 0; i <= ROWS; i++) {
            context.beginPath();
            context.moveTo(0, i);
            context.lineTo(COLS, i);
            context.stroke();
        }
    }

    function drawPiece(piece, ctx, offset_x = 0, offset_y = 0, customBlockSize = 1) {
        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    drawBlock(ctx, piece.x + x + offset_x, piece.y + y + offset_y, piece.colorIndex, customBlockSize);
                }
            });
        });
    }
    
    function drawNextPiece() {
        nextContext.fillStyle = '#0f0821'; // Fondo del canvas de la siguiente pieza
        nextContext.fillRect(0, 0, nextCanvas.width / NEXT_BLOCK_SIZE, nextCanvas.height / NEXT_BLOCK_SIZE);
        if (nextPiece) {
            // Centrar la pieza en el canvas de vista previa
            const shape = nextPiece.shape;
            const w = shape[0].length;
            const h = shape.length;
            const offsetX = (4 - w) / 2; // 4 es el ancho del canvas de vista previa en bloques
            const offsetY = (4 - h) / 2;
            
            // Crear una copia temporal de la pieza para dibujar, sin modificar la original
            const tempPiece = {
                ...nextPiece,
                x: 0, // Coordenadas relativas al canvas de la siguiente pieza
                y: 0
            };
            drawPiece(tempPiece, nextContext, offsetX, offsetY, 1); // blockSize es 1 porque ya está escalado
        }
    }
    
    function drawFloatingScores() {
        context.font = SCORE_TEXT_FONT;
        context.textAlign = 'center';
        context.fillStyle = SCORE_TEXT_COLOR;

        for (let i = floatingScores.length - 1; i >= 0; i--) {
            const fs = floatingScores[i];
            context.fillText(fs.text, fs.x, fs.y);
            fs.y -= 0.05; // Mover hacia arriba
            fs.life--;
            if (fs.life <= 0) {
                floatingScores.splice(i, 1);
            }
        }
    }


    function spawnPiece() {
        currentPiece = nextPiece || createRandomPiece();
        nextPiece = createRandomPiece();
        currentPiece.x = Math.floor(COLS / 2) - Math.floor(currentPiece.shape[0].length / 2);
        currentPiece.y = 0;

        if (collides(currentPiece, board)) {
            gameOver = true;
            showGameOver();
        }
        drawNextPiece();
    }

    function createRandomPiece() {
        const typeId = Math.floor(Math.random() * (SHAPES.length -1)) + 1;
        return {
            shape: SHAPES[typeId],
            colorIndex: typeId,
            x: 0,
            y: 0
        };
    }

    function collides(piece, gameBoard) {
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x] !== 0) { // Si es parte de la pieza
                    let newX = piece.x + x;
                    let newY = piece.y + y;
                    if (newX < 0 || newX >= COLS || newY >= ROWS || // Fuera de límites
                        (newY >= 0 && gameBoard[newY] && gameBoard[newY][newX] !== 0)) { // Choca con pieza existente
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function merge(piece, gameBoard) {
        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    // Usar el color gris para las piezas fijadas, como en el video
                    gameBoard[piece.y + y][piece.x + x] = LOCKED_COLOR_INDEX; 
                }
            });
        });
    }

    function rotate(piece) {
        const matrix = piece.shape;
        // Transponer y luego invertir filas para rotar en sentido horario
        const N = matrix.length;
        const M = matrix[0].length; // Puede no ser cuadrada
        
        let newMatrix = Array.from({length: M}, () => Array(N).fill(0));

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < M; j++) {
                newMatrix[j][N - 1 - i] = matrix[i][j];
            }
        }
        piece.shape = newMatrix;

        // Manejar colisiones después de rotar (wall kick simple)
        let offset = 1;
        while (collides(piece, board)) {
            piece.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1)); // Alternar: 1, -2, 3, -4 ...
            if (offset > piece.shape[0].length) { // Si no puede rotar, deshacer
                rotate(piece); // Rotar 3 veces más para volver al original
                rotate(piece);
                rotate(piece);
                return;
            }
        }
    }

    function pieceDrop() {
        if (gameOver || gamePaused) return;
        const nextPos = { ...currentPiece, y: currentPiece.y + 1 };
        if (!collides(nextPos, board)) {
            currentPiece.y++;
        } else {
            merge(currentPiece, board);
            clearLines();
            spawnPiece();
        }
        dropCounter = 0;
    }

    function movePiece(dir) {
        if (gameOver || gamePaused) return;
        const nextPos = { ...currentPiece, x: currentPiece.x + dir };
        if (!collides(nextPos, board)) {
            currentPiece.x += dir;
        }
    }
    
    function addFloatingScore(text, x, y) {
        floatingScores.push({ text, x: x + 0.5, y: y + 0.5, life: 30 }); // life en frames
    }

    function clearLines() {
        let linesCleared = 0;
        outer: for (let y = ROWS - 1; y >= 0; y--) {
            for (let x = 0; x < COLS; x++) {
                if (board[y][x] === 0) {
                    continue outer;
                }
            }
            // Si llegamos aquí, la línea está llena
            const row = board.splice(y, 1)[0].fill(0);
            board.unshift(row);
            linesCleared++;
            addFloatingScore(`+${10 * linesCleared}`, COLS / 2 -1 , y); // Mensaje flotante
            y++; // Volver a revisar la misma línea (que ahora es la de arriba)
        }
        if (linesCleared > 0) {
            score += linesCleared * 10 * linesCleared; // Puntuación exponencial simple
            updateScoreDisplay();
            // Opcional: acelerar el juego
            // dropInterval = Math.max(200, dropInterval - linesCleared * 10);
        }
    }

    function updateScoreDisplay() {
        scoreElement.textContent = score;
    }

    function gameLoop(time = 0) {
        if (gameOver) {
            return;
        }
        
        const deltaTime = time - lastTime;
        lastTime = time;

        if (!gamePaused) {
            dropCounter += deltaTime;
            if (dropCounter > dropInterval) {
                pieceDrop();
            }
        }

        draw();
        requestAnimationFrame(gameLoop);
    }

    function draw() {
        context.fillStyle = '#0f0821'; // Fondo del tablero
        context.fillRect(0, 0, canvas.width, canvas.height); // Limpiar tablero

        drawBoard();
        if (currentPiece) {
            drawPiece(currentPiece, context);
        }
        drawFloatingScores();
    }
    
    function resetGame() {
        board = createBoard();
        score = 0;
        updateScoreDisplay();
        gameOver = false;
        gamePaused = false;
        dropInterval = 1000;
        floatingScores = [];
        document.getElementById('game-over-message').style.display = 'none';
        document.getElementById('pause-icon').style.display = 'inline';
        document.getElementById('play-icon').style.display = 'none';
        spawnPiece(); // Para currentPiece
        spawnPiece(); // Para inicializar nextPiece correctamente
        if (!lastTime) { // Si es el primer inicio
            gameLoop();
        }
    }

    function showGameOver() {
        document.getElementById('game-over-message').style.display = 'flex';
    }
    
    function togglePause() {
        if (gameOver) return;
        gamePaused = !gamePaused;
        const pauseIcon = document.getElementById('pause-icon');
        const playIcon = document.getElementById('play-icon');
        if (gamePaused) {
            pauseIcon.style.display = 'none';
            playIcon.style.display = 'inline';
        } else {
            pauseIcon.style.display = 'inline';
            playIcon.style.display = 'none';
            // Para evitar que la pieza caiga inmediatamente al reanudar si pasó mucho tiempo
            dropCounter = 0; 
            lastTime = performance.now(); // Resincronizar el tiempo
        }
    }

    // Controles
    document.addEventListener('keydown', event => {
        if (gameOver) return;
        if (event.key === 'ArrowLeft') {
            movePiece(-1);
        } else if (event.key === 'ArrowRight') {
            movePiece(1);
        } else if (event.key === 'ArrowDown') {
            pieceDrop();
        } else if (event.key === 'ArrowUp' || event.key === ' ') { // Espacio también para rotar
            if (!gamePaused) rotate(currentPiece);
        } else if (event.key.toLowerCase() === 'p') {
            togglePause();
        }
    });

    document.getElementById('left-btn').addEventListener('click', () => movePiece(-1));
    document.getElementById('right-btn').addEventListener('click', () => movePiece(1));
    document.getElementById('down-btn').addEventListener('click', () => pieceDrop());
    document.getElementById('rotate-btn').addEventListener('click', () => {
        if (!gamePaused && currentPiece) rotate(currentPiece);
    });
    document.getElementById('reset-btn').addEventListener('click', resetGame);
    document.getElementById('pause-btn').addEventListener('click', togglePause);
    document.getElementById('restart-game-btn').addEventListener('click', resetGame);


    // Iniciar juego
    resetGame();
});