const challengeInput = document.getElementById("challenge");
const userInput = document.getElementById("user-input");
const messageElement = document.getElementById("message");
const timerElement = document.getElementById("timer");
const levelElement = document.getElementById("level");
const restartBtn = document.getElementById("restart-btn");
const submitBtn = document.getElementById("submit-btn");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

let level = 1;
let challengeText;
let timeLeft = 45;
let timerInterval;

submitBtn.addEventListener("click", () => {
    const reversedText = userInput.value;
    const correctReversedtext = challengeText.split("").reverse().join("");
    if (reversedText === correctReversedtext) {
        if (level === 2) {
            endGame(true);
        } else {
            level++;
            timeLeft = 45;
            levelElement.textContent = level;
            messageElement.textContent = "Correct! Moving to the next level.";
            messageElement.style.color = 'green';
            userInput.value = "";
            setChallengetext();
        }
    } else {
        messageElement.textContent = "Incorrect! Try again.";
        messageElement.style.color = 'red';
    }
});

function endGame(won) {
    clearInterval(timerInterval);
    if (won) {
        messageElement.textContent = "Congratulations! You won the game!";
        messageElement.style.color = 'green';
    } else {
        messageElement.textContent = "Time's up! You lost the game.";
        messageElement.style.color = 'red';
    }
    restartBtn.classList.remove("hidden");
    submitBtn.classList.add("hidden");
}


function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame(false);
        }
    }, 1000);
}

function setChallengetext() {
    if (level === 1) {
        challengeText = getRandomElement(months);
    } else if (level === 2) {
        challengeText = getRandomElement(months) + getRandomElement(numbers);
    }
    challengeInput.value = challengeText;
}

function startGame() {
    level = 1;
    timeLeft = 45;
    levelElement.textContent = level;
    restartBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
    userInput.value = "";
    messageElement.textContent = "";
    setChallengetext();
    startTimer();    
}

restartBtn.addEventListener("click", startGame);

startGame();