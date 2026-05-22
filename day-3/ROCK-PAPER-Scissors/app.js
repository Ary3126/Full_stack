let choiceButtons = document.querySelectorAll(".player-section .choice-btn");
let resetBtn = document.getElementById("reset");
let playAgainBtn = document.getElementById("play-again");
let easyBtn = document.getElementById("easy");
let hardBtn = document.getElementById("hard");
let impossibleBtn = document.getElementById("impossible");
let messageContainer = document.querySelector(".msg-container");
let msgText = document.querySelector(".message");
let p1ChoiceDisplay = document.getElementById("p1-choice");
let p2ChoiceDisplay = document.getElementById("p2-choice");
let p1ScoreDisplay = document.getElementById("p1-score");
let p2ScoreDisplay = document.getElementById("p2-score");

let currentDifficulty = "easy";
let p1Choice = null;
let p2Choice = null;
let p1Score = 0;
let p2Score = 0;
let roundCount = 0;
const MAX_ROUNDS = 5;

const updateDifficultyButtons = () => {
    if(easyBtn) easyBtn.classList.toggle("active", currentDifficulty === "easy");
    if(hardBtn) hardBtn.classList.toggle("active", currentDifficulty === "hard");
    if(impossibleBtn) impossibleBtn.classList.toggle("active", currentDifficulty === "impossible");
};

const disableChoiceButtons = () => {
    choiceButtons.forEach(btn => btn.disabled = true);
};

const enableChoiceButtons = () => {
    choiceButtons.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove("selected");
    });
};

const getRobotChoice = () => {
    const choices = ["rock", "paper", "scissors"];
    if (currentDifficulty === "easy") {
        return choices[Math.floor(Math.random() * 3)];
    } else if (currentDifficulty === "hard") {
        const random = Math.random();
        if (random < 0.6) {
            return counterChoice(p1Choice);
        }
        return choices[Math.floor(Math.random() * 3)];
    } else {
        return counterChoice(p1Choice);
    }
};

const counterChoice = (playerChoice) => {
    if (playerChoice === "rock") return "paper";
    if (playerChoice === "paper") return "scissors";
    return "rock";
};

const determineWinner = (c1, c2) => {
    if (c1 === c2) return "draw";
    if (c1 === "rock" && c2 === "scissors") return "p1";
    if (c1 === "paper" && c2 === "rock") return "p1";
    if (c1 === "scissors" && c2 === "paper") return "p1";
    return "p2";
};

const playRound = (p1, p2) => {
    const result = determineWinner(p1, p2);
    if (result === "p1") p1Score++;
    else if (result === "p2") p2Score++;
    roundCount++;
    
    p1ChoiceDisplay.textContent = p1;
    p2ChoiceDisplay.textContent = p2;
    p1ScoreDisplay.textContent = p1Score;
    p2ScoreDisplay.textContent = p2Score;

    setTimeout(() => {
        if (roundCount >= MAX_ROUNDS) {
            const winner = p1Score > p2Score ? "You" : p2Score > p1Score ? "Robot" : "Draw";
            msgText.innerText = winner + " wins the game!";
            messageContainer.classList.remove("hide");
            disableChoiceButtons();
        } else {
            enableChoiceButtons();
        }
    }, 1000);
};

const resetGame = () => {
    p1Choice = null;
    p2Choice = null;
    p1Score = 0;
    p2Score = 0;
    roundCount = 0;
    p1ChoiceDisplay.textContent = "-";
    p2ChoiceDisplay.textContent = "-";
    p1ScoreDisplay.textContent = "0";
    p2ScoreDisplay.textContent = "0";
    messageContainer.classList.add("hide");
    enableChoiceButtons();
};

const setDifficulty = (difficulty) => {
    currentDifficulty = difficulty;
    updateDifficultyButtons();
};

choiceButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        p1Choice = btn.dataset.choice;
        p1ChoiceDisplay.textContent = p1Choice;
        
        disableChoiceButtons();
        choiceButtons.forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        
        setTimeout(() => {
            p2Choice = getRobotChoice();
            playRound(p1Choice, p2Choice);
            p1Choice = null;
            p2Choice = null;
        }, 1000);
    });
});

if (easyBtn) {
    easyBtn.addEventListener("click", () => setDifficulty("easy"));
}

if (hardBtn) {
    hardBtn.addEventListener("click", () => setDifficulty("hard"));
}

if (impossibleBtn) {
    impossibleBtn.addEventListener("click", () => setDifficulty("impossible"));
}

if (resetBtn) {
    resetBtn.addEventListener("click", resetGame);
}

if (playAgainBtn) {
    playAgainBtn.addEventListener("click", resetGame);
}

updateDifficultyButtons();