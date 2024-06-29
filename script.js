const cat = document.querySelector('.cat');
const gameContainer = document.querySelector('.game-container');
const obstacle = document.querySelector('.obstacle');
const gameOverContainer = document.getElementById('game-over');
const jumpButton = document.getElementById('jumpButton');

let isJumping = false;
let isGameOver = false;
let jumpCount = 0;

jumpButton.addEventListener('click', () => {
    if (!isJumping && !isGameOver) {
        jump();
        jumpCount++;
        updateJumpCount();
    }
});

function jump() {
    isJumping = true;
    let position = 0;
    let timerId = setInterval(function () {
        if (position === 150) {
            clearInterval(timerId);
            let downTimerId = setInterval(function () {
                if (position === 0) {
                    clearInterval(downTimerId);
                    isJumping = false;
                }
                position -= 5;
                cat.style.bottom = position + 'px';
            }, 20);
        }
        position += 5;
        cat.style.bottom = position + 'px';
    }, 20);
}

function updateJumpCount() {
    const jumpCountElement = document.getElementById('jumpCount');
    jumpCountElement.innerText = `SCORE \n ${jumpCount}`;
}

function checkCollision() {
    const catRect = cat.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        catRect.left < obstacleRect.left + obstacleRect.width &&
        catRect.left + catRect.width > obstacleRect.left &&
        catRect.top < obstacleRect.top + obstacleRect.height &&
        catRect.top + catRect.height > obstacleRect.top
    ) {
        isGameOver = true;
        obstacle.style.animation = 'none';
        obstacle.style.right = `${obstacleRect.right}px`;
        showGameOverMessage();
    }
}

function showGameOverMessage() {
    const message = document.createElement('h1');
    message.innerText = 'GAME OVER';
    gameOverContainer.appendChild(message);
    createTryAgainButton();
}

function createTryAgainButton() {
    const button = document.createElement('button');
    button.innerText = 'TRY AGAIN';
    button.classList.add('try-again-button');
    button.addEventListener('click', tryAgain);
    gameOverContainer.appendChild(button);
}

function tryAgain() {
    window.location.reload();
}

setInterval(checkCollision, 10);
