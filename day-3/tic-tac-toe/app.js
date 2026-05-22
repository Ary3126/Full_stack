let boxes = document.querySelectorAll(".box");
let resetbtn = document.getElementById("reset");
let newgamebtn = document.getElementById("play-again");
let pvpBtn = document.getElementById("pvp");
let pvbotBtn = document.getElementById("pvbot");
let easyBtn = document.getElementById("easy");
let hardBtn = document.getElementById("hard");
let impossibleBtn = document.getElementById("impossible");
let difficultyRow = document.querySelector(".difficulty-select");
let messageContainer = document.querySelector(".msg-container");
let smsg = document.querySelector(".message");
let currentMode = "pvp";
let currentDifficulty = "easy";
let turnO = true;
let gameOver = false;
let movesCount = 0;
const winpatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const updateModeButtons = () => {
    if(pvpBtn) pvpBtn.classList.toggle("active", currentMode === "pvp");
    if(pvbotBtn) pvbotBtn.classList.toggle("active", currentMode === "pvbot");
    if(difficultyRow) difficultyRow.classList.toggle("hide", currentMode !== "pvbot");
};

const updateDifficultyButtons = () => {
    if(easyBtn) easyBtn.classList.toggle("active", currentDifficulty === "easy");
    if(hardBtn) hardBtn.classList.toggle("active", currentDifficulty === "hard");
    if(impossibleBtn) impossibleBtn.classList.toggle("active", currentDifficulty === "impossible");
};

const boardState = () => [...boxes].map(box => box.textContent);
const availableBoxes = () => [...boxes].filter(box => box.textContent === "");

const findWinningMove = (symbol) => {
    const board = boardState();
    for (let pattern of winpatterns) {
        const values = pattern.map(index => board[index]);
        const countSymbol = values.filter(value => value === symbol).length;
        const countEmpty = values.filter(value => value === "").length;
        if (countSymbol === 2 && countEmpty === 1) {
            const emptyIndex = pattern[values.indexOf("")];
            return emptyIndex;
        }
    }
    return -1;
};

const chooseRandomMove = () => {
    const freeBoxes = availableBoxes();
    const choice = freeBoxes[Math.floor(Math.random() * freeBoxes.length)];
    return [...boxes].indexOf(choice);
};

const chooseHardMove = () => {
    const board = boardState();
    let winIndex = findWinningMove("X");
    if (winIndex >= 0) return winIndex;
    let blockIndex = findWinningMove("O");
    if (blockIndex >= 0) return blockIndex;
    if (board[4] === "") return 4;

    const corners = [0,2,6,8].filter(index => board[index] === "");
    if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];
    const edges = [1,3,5,7].filter(index => board[index] === "");
    if (edges.length > 0) return edges[Math.floor(Math.random() * edges.length)];
    const freeIndexes = [...boxes].map((box, idx) => box.textContent === "" ? idx : -1).filter(idx => idx >= 0);
    return freeIndexes[0] ?? -1;
};

const getWinner = (board) => {
    for (let pattern of winpatterns) {
        const [a,b,c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
};

const minimax = (board, player) => {
    const winner = getWinner(board);
    if (winner === "X") return { score: 10 };
    if (winner === "O") return { score: -10 };
    if (board.every(cell => cell !== "")) return { score: 0 };

    const moves = [];
    const opponent = player === "X" ? "O" : "X";

    board.forEach((cell, index) => {
        if (cell === "") {
            const move = { index }; 
            board[index] = player;
            const result = minimax(board, opponent);
            move.score = result.score;
            board[index] = "";
            moves.push(move);
        }
    });

    if (player === "X") {
        let bestScore = -Infinity;
        let bestMove = null;
        for (let move of moves) {
            if (move.score > bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        }
        return bestMove;
    }

    let bestScore = Infinity;
    let bestMove = null;
    for (let move of moves) {
        if (move.score < bestScore) {
            bestScore = move.score;
            bestMove = move;
        }
    }
    return bestMove;
};

const chooseImpossibleMove = () => {
    const board = boardState();
    const move = minimax(board, "X");
    return move ? move.index : availableBoxes().length ? availableBoxes()[0] : null;
};

const robotMove = () => {
    const freeBoxes = availableBoxes();
    if (freeBoxes.length === 0) return;

    let moveIndex;
    if (currentDifficulty === "hard") {
        moveIndex = chooseHardMove();
    } else if (currentDifficulty === "impossible") {
        moveIndex = chooseImpossibleMove();
    } else {
        moveIndex = [...boxes].indexOf(chooseRandomMove());
    }

    if (moveIndex === null || moveIndex === undefined || moveIndex < 0) {
        moveIndex = [...boxes].findIndex(box => box.textContent === "");
    }

    const choice = boxes[moveIndex];
    if (!choice) return;

    choice.textContent = "X";
    choice.disabled = true;
    movesCount++;

    if (checkwin()) {
        endGame("X");
        return;
    }

    if (movesCount === 9) {
        smsg.innerText = "Draw";
        messageContainer.classList.remove("hide");
        gameOver = true;
        return;
    }

    turnO = true;
};

const showwinmsg = (winner) => {
    smsg.innerText = `${winner} wins`;
    messageContainer.classList.remove("hide");
};

const endGame = (winner) => {
    showwinmsg(winner);
    gameOver = true;
    boxes.forEach((box) => box.disabled = true);
};

const resetGame = () => {
    boxes.forEach((box) => {
        box.textContent = "";
        box.disabled = false;
    });
    turnO = true;
    gameOver = false;
    movesCount = 0;
    messageContainer.classList.add("hide");
};

const setMode = (mode) => {
    currentMode = mode;
    updateModeButtons();
    resetGame();
};

const setDifficulty = (difficulty) => {
    currentDifficulty = difficulty;
    updateDifficultyButtons();
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver || box.textContent !== "") {
            return;
        }

        if (currentMode === "pvbot" && !turnO) {
            return;
        }

        let current = turnO ? "O" : "X";
        box.textContent = current;
        box.disabled = true;
        movesCount++;

        if (checkwin()) {
            endGame(current);
            return;
        }

        if (movesCount === 9) {
            smsg.innerText = "Draw";
            messageContainer.classList.remove("hide");
            gameOver = true;
            return;
        }

        turnO = !turnO;

        if (currentMode === "pvbot" && !gameOver && !turnO) {
            robotMove();
        }
    });
});

const checkwin = () => {
    for (let pattern of winpatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            return true;
        }
    }
    return false;
};

if (pvpBtn) {
    pvpBtn.addEventListener("click", () => setMode("pvp"));
}

if (pvbotBtn) {
    pvbotBtn.addEventListener("click", () => setMode("pvbot"));
}

if (easyBtn) {
    easyBtn.addEventListener("click", () => setDifficulty("easy"));
}

if (hardBtn) {
    hardBtn.addEventListener("click", () => setDifficulty("hard"));
}

if (impossibleBtn) {
    impossibleBtn.addEventListener("click", () => setDifficulty("impossible"));
}

if (resetbtn) {
    resetbtn.addEventListener("click", resetGame);
}

if (newgamebtn) {
    newgamebtn.addEventListener("click", resetGame);
}

updateModeButtons();
updateDifficultyButtons();