const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.querySelector('.score');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

// Canvas size
canvas.width = 800;
canvas.height = 600;

let score = 0;
let gameRunning = false;  

// Images
const playerImage = new Image();
const fallingObjectImage = new Image();

let playerImageLoaded = false;
let fallingObjectImageLoaded = false;

playerImage.src = 'catcher.jpg'; 
fallingObjectImage.src = 'ball.png';  

playerImage.onload = () => {
    playerImageLoaded = true;
    startGameIfReady();
};

fallingObjectImage.onload = () => {
    fallingObjectImageLoaded = true;
    startGameIfReady();
};


function startGameIfReady() {
    if (playerImageLoaded && fallingObjectImageLoaded) {
        startButton.disabled = false;  
    }
}

// Player properties
const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 50,
    width: 50,  
    height: 50, 
    speed: 5,
    dx: 0
};

// Falling object properties
const fallingObject = {
    x: Math.random() * canvas.width,
    y: 0,
    width: 30,  
    height: 30, 
    speed: 3
};

// Event listeners for player movement
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        player.dx = -player.speed;
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
        player.dx = player.speed;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'a' || e.key === 'd') {
        player.dx = 0;
    }
});

// Game loop
function gameLoop() {
    if (!gameRunning) return; 

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.x += player.dx;
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    fallingObject.y += fallingObject.speed;

    if (
        fallingObject.y + fallingObject.height > player.y &&
        fallingObject.x + fallingObject.width > player.x &&
        fallingObject.x < player.x + player.width
    ) {
        score++;
        fallingObject.y = 0; 
        fallingObject.x = Math.random() * canvas.width;
    }

    if (fallingObject.y > canvas.height) {
        fallingObject.y = 0; 
        fallingObject.x = Math.random() * canvas.width;
    }

    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

    ctx.drawImage(fallingObjectImage, fallingObject.x, fallingObject.y, fallingObject.width, fallingObject.height);

    scoreDisplay.textContent = `Score: ${score}`;

    requestAnimationFrame(gameLoop);
}

// Stop game function
stopButton.addEventListener('click', () => {
    gameRunning = false;
    score = 0;  
    fallingObject.y = 0; 
    fallingObject.x = Math.random() * canvas.width;
    scoreDisplay.textContent = `Score: ${score}`;
    alert("Game Stopped!");
});

// Start game function
startButton.addEventListener('click', () => {
    if (!gameRunning && playerImageLoaded && fallingObjectImageLoaded) {
        gameRunning = true;
        score = 0;  
        fallingObject.y = 0; 
        fallingObject.x = Math.random() * canvas.width; 
        gameLoop();
    }
});
