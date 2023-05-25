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

// LINK TO ELEMENTS IN DOM:
// LINKS TO SECTIONS
const results = document.getElementById('game-log');
const mainEntry = document.getElementById('start-game');
const mainContent = document.getElementById('main-content');
const gameDisplay = document.getElementById('game-display');
const playAgainBtn01 = document.getElementById('play-again-btn-01');
const playAgainBtn02 = document.getElementById('play-again-btn-02');

// BUTTONS
const rockButton = document.getElementById('btn-rock');
const paperButton = document.getElementById('btn-paper');
const scissorsButton = document.getElementById('btn-scissors');

// CURRENT ROUND DISPLAY
const currentRound = document.getElementById('current-round');

// EVENT LISTENER FOR 'START GAME' BUTTON
mainEntry.addEventListener('click', () => {
    mainEntry.classList.add('hidden');
    mainContent.classList.remove('hidden');
});

// EVENT LISTENER FOR 'PLAY AGAIN' BUTTON
playAgainBtn01.addEventListener('click', resetGame);
playAgainBtn02.addEventListener('click', resetGame);

// EVENT LISTENERS FOR GAME BUTTONS
rockButton.addEventListener('click', playRockRound);
rockButton.addEventListener('click', gameWon);

paperButton.addEventListener('click', playPaperRound);
paperButton.addEventListener('click', gameWon);

scissorsButton.addEventListener('click', playScissorsRound);
scissorsButton.addEventListener('click', gameWon);

// CONTAINED FUNCTIONS FOR THE BUTTONS
function playRockRound() {
    changePlayerImage('ROCK');
    displayRoundResults(playRoundv2('ROCK'));
}

function playPaperRound() {
    changePlayerImage('PAPER');
    displayRoundResults(playRoundv2('PAPER'));
}

function playScissorsRound() {
    changePlayerImage('SCISSORS');
    displayRoundResults(playRoundv2('SCISSORS'));
}

// REFACTORED ROUND FUNCTION (TO PLAY ONE ROUND)
function playRoundv2(playerChoice) {
    const computerChoice = getComputerChoice();
    playerChoice = playerChoice.toUpperCase();

    // UPDATE THE COMPUTER IMAGE WITH CURRENT CHOICE
    changeComputerImage(computerChoice);

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
        displayEndScreen('WIN');
    } else if (computerScore === 5) {
        winnerPara.textContent = 'Sorry! You lost!';
        results.appendChild(winnerPara);
        displayEndScreen('LOSE');
    }

    return;

}

// FUNCTION TO CHANGE PLAYER IMAGE
function changePlayerImage(imageNeeded) {
    const playerImage = document.getElementById('player-image');
    switch (imageNeeded) {
        case 'ROCK':
            playerImage.setAttribute('src', './img/img-player/player-rock.png');
            break;
        case 'PAPER':
            playerImage.setAttribute('src', './img/img-player/player-paper.png');
            break;
        case 'SCISSORS':
            playerImage.setAttribute('src', './img/img-player/player-scissors.png');
            break;
        default:
            playerImage.setAttribute('src', './img/img-player/player-face.png');
            break;
    }

    return;
}

// FUNCTION TO CHANGE COMPUTER IMAGE
function changeComputerImage(imageNeeded) {
    const computerImage = document.getElementById('computer-image');
    switch (imageNeeded) {
        case 'ROCK':
            computerImage.setAttribute('src', './img/img-computer/comp-rock.png');
            break;
        case 'PAPER':
            computerImage.setAttribute('src', './img/img-computer/comp-paper.png');
            break;
        case 'SCISSORS':
            computerImage.setAttribute('src', './img/img-computer/comp-scissors.png');
            break;
        default:
            computerImage.setAttribute('src', './img/img-computer/comp-face.png');
            break;
    }
}

// FUNCTION TO DISPLAY WINNER/LOSER SCREEN
function displayEndScreen(result) {
    const winnerScreen = document.getElementById('winner-screen');
    const loserScreen = document.getElementById('loser-screen');

    // HIDE ALL OTHER SECTIONS/ASSETS
    gameDisplay.classList.add('hidden');
    mainContent.classList.add('hidden');

    // DISPLAY CORRECT END SCREEN
    if (result === 'WIN') {
        winnerScreen.classList.remove('hidden');
    } else {
        loserScreen.classList.remove('hidden');
    }

    return;
}

// FUNCTION TO RESET THE GAME ON 'PLAY AGAIN'
function resetGame() {
    // GRAB ALL NECESSARY ELEMENTS
    const winnerScreen = document.getElementById('winner-screen');
    const loserScreen = document.getElementById('loser-screen');
    const playerScore = document.getElementById('player-score-num');
    const computerScore = document.getElementById('computer-score-num');

    // UNHIDE THE CORRECT ELEMENTS
    gameDisplay.classList.remove('hidden');
    mainContent.classList.remove('hidden');

    // RESET THE IMAGES
    changeComputerImage('FACE');
    changePlayerImage('FACE');

    // HIDE THE REST
    winnerScreen.classList.add('hidden');
    loserScreen.classList.add('hidden');

    // RESET THE GAME LOG
    results.innerHTML = '';

    // RESET ROUND
    currentRound.textContent = '1';

    // RESET PLAYER + COMPUTER SCORES
    playerScore.textContent = '0';
    computerScore.textContent = '0';

    return;
}