// FUNCTION TO RANDOMLY RETURN EITHER 'ROCK', 'PAPER', OR 'SCISSORS' TO BE USED AS THE COMPUTER'S CHOICE
function getComputerChoice() {
    const choice = parseInt((Math.random() * 3) + 1);
    switch (choice) {
        case 1:
            return 'ROCK';
        case 2:
            return 'PAPER';
        default: // 3
            return 'SCISSORS';
    }
}

// LINK TO ELEMENTS IN DOM
const rockButton = document.getElementById('btn-rock');
const paperButton = document.getElementById('btn-paper');
const scissorsButton = document.getElementById('btn-scissors');

const results = document.getElementById('game-log');

const currentRound = document.getElementById('current-round');

// EVENT LISTENERS FOR BUTTONS
rockButton.addEventListener('click', playRockRound);
rockButton.addEventListener('click', gameWon);

paperButton.addEventListener('click', playPaperRound);
paperButton.addEventListener('click', gameWon);

scissorsButton.addEventListener('click', playScissorsRound);
scissorsButton.addEventListener('click', gameWon);

// CONTAINED FUNCTIONS FOR THE BUTTONS
function playRockRound() {
    displayRoundResults(playRoundv2('ROCK'));
}

function playPaperRound() {
    displayRoundResults(playRoundv2('PAPER'));
}

function playScissorsRound() {
    displayRoundResults(playRoundv2('SCISSORS'));
}

// REFACTORED ROUND FUNCTION (TO PLAY ONE ROUND)
function playRoundv2(playerChoice) {
    const computerChoice = getComputerChoice();
    playerChoice = playerChoice.toUpperCase();

    // CREATE AN OBJECT FOR THE ROUND RESULTS THAT INCLUDES EACH CHOICE, WHETHER THE PLAYER WON, OR IF IT'S A TIE
    const roundResult = {
        playerSelection: playerChoice,
        computerSelection: computerChoice,
        playerWon: null,
        tie: false,
    };

    // NESTED CONDITIONS TO DETERMINE ROUND WINNER
    if (playerChoice === 'ROCK') {
        if (computerChoice === 'ROCK') {
            roundResult.playerWon = false;
            roundResult.tie = true;
        } else if (computerChoice === 'PAPER') {
            roundResult.playerWon = false;
        } else if (computerChoice === 'SCISSORS') {
            roundResult.playerWon = true;
        }
    } else if (playerChoice === 'PAPER') {
        if (computerChoice === 'ROCK') {
            roundResult.playerWon = true;
        } else if (computerChoice === 'PAPER') {
            roundResult.playerWon = false;
            roundResult.tie = true;
        } else if (computerChoice === 'SCISSORS') {
            roundResult.playerWon = false;
        }
    } else if (playerChoice === 'SCISSORS') {
        if (computerChoice === 'ROCK') {
            roundResult.playerWon = false;
        } else if (computerChoice === 'PAPER') {
            roundResult.playerWon = true;
        } else if (computerChoice === 'SCISSORS') {
            roundResult.playerWon = false;
            roundResult.tie = true;
        }
    }

    // RETURN OBJECT WITH ALL NEEDED DATA
    return roundResult;
}

// FUNCTION TO DISPLAY ROUND RESULTS TO THE USER
function displayRoundResults(roundResult) {
    // GRAB DOM ELEMENTS
    let computerScore = parseInt(document.getElementById('computer-score-num').textContent);
    let playerScore = parseInt(document.getElementById('player-score-num').textContent);
    let thisRound = parseInt(currentRound.textContent);

    // DISPLAY THE CORRECT WINNER, OR DECLARE A TIE
    if (roundResult.playerWon === true) {
        playerScore++;
        document.getElementById('player-score-num').textContent = playerScore;

        const thisRoundResult = document.createElement('p');
        const resultText = document.createTextNode(`Round ${thisRound}: YOU WIN! ${roundResult.playerSelection} beats ${roundResult.computerSelection}.`);

        thisRoundResult.appendChild(resultText);
        results.appendChild(thisRoundResult);
    } else if (roundResult.tie === false) {
        computerScore++;
        document.getElementById('computer-score-num').textContent = computerScore;

        const thisRoundResult = document.createElement('p');
        const resultText = document.createTextNode(`Round ${thisRound}: YOU LOSE! ${roundResult.computerSelection} beats ${roundResult.playerSelection}.`);

        thisRoundResult.appendChild(resultText);
        results.appendChild(thisRoundResult);
    } else {
        const thisRoundResult = document.createElement('p');
        const resultText = document.createTextNode(`Round ${thisRound}: IT'S A TIE! YOU BOTH CHOSE ${roundResult.playerSelection}.`);

        thisRoundResult.appendChild(resultText);
        results.appendChild(thisRoundResult);
    }

    // INCREMENT THE ROUND NUMBER AND DISPLAY IT
    thisRound++;
    currentRound.textContent = thisRound;

    return;
}

// FUNCTION THAT DETERMINES IF THERE'S A WINNER
function gameWon() {
    let computerScore = parseInt(document.getElementById('computer-score-num').textContent);
    let playerScore = parseInt(document.getElementById('player-score-num').textContent);

    const winnerPara = document.createElement('p');

    if (playerScore === 5) {
        winnerPara.textContent = 'Congratulations! You won!';
        results.appendChild(winnerPara);

        rockButton.removeEventListener('click', playRockRound);
        rockButton.removeEventListener('click', gameWon)

        paperButton.removeEventListener('click', playPaperRound);
        paperButton.removeEventListener('click', gameWon)

        scissorsButton.removeEventListener('click', playScissorsRound);
        scissorsButton.removeEventListener('click', gameWon)
    } else if (computerScore === 5) {
        winnerPara.textContent = 'Sorry! You lost!';
        results.appendChild(winnerPara);

        rockButton.removeEventListener('click', playRockRound);
        rockButton.removeEventListener('click', gameWon)

        paperButton.removeEventListener('click', playPaperRound);
        paperButton.removeEventListener('click', gameWon)

        scissorsButton.removeEventListener('click', playScissorsRound);
        scissorsButton.removeEventListener('click', gameWon)
    }

    return;

}