// function to randomly return either 'ROCK', 'PAPER', or 'SCISSORS' to be used as the computer's choice
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

// function to ask for the player choice:
function getPlayerSelection() {
    let playerSelection = prompt('Please Choose:\nROCK, PAPER, or SCISSORS?\n(if you do not make a choice, one will be randomly selected for you)', 'Please type your selection here').toUpperCase();
    if (playerSelection == 'ROCK' || playerSelection == 'SCISSORS' || playerSelection == 'PAPER') {
        return playerSelection;
    } else {
        return getComputerChoice();
    }
}

// function to play one round of RPS:
function playRound(playerSelection) {
    let response = '';
    let computerSelection = getComputerChoice();
    switch (playerSelection) {
        case 'ROCK':
            switch (computerSelection) {
                case 'ROCK':
                    response = 'It\'s a tie! You both chose ROCK.';
                    break;

                case 'PAPER':
                    response = 'You lose! PAPER beats ROCK!';
                    break;

                default: // 'SCISSORS'
                    response = 'You win! ROCK beats SCISSORS!';
                    break;
            }
            break;

        case 'PAPER':
            switch (computerSelection) {
                case 'ROCK':
                    response = 'You win! PAPER beats ROCK!';
                    break;

                case 'PAPER':
                    response = 'It\'s a tie! You both chose PAPER.';
                    break;
            
                default: // 'SCISSORS'
                    response = 'You lose! SCISSORS beats PAPER!';
                    break;
            }
            break;
    
        default: // 'SCISSORS'
            switch (computerSelection) {
                case 'ROCK':
                    response = 'You lose! ROCK beats SCISSORS!';
                    break;
                
                case 'PAPER':
                    response = 'You win! SCISSORS beats PAPER!';
                    break;
            
                default: // 'SCISSORS'
                    response = 'It\'s a tie! You both chose SCISSORS.';
                    break;
            }
            break;
    }
    return response;
}

// MAIN GAME FUNCTION
function game(maxRounds, playerChoice) {
    let currentRound = 1;
    let playerScore = 0;
    let computerScore = 0;
    const winningScore = parseInt((maxRounds + 1) / 2);
    while (playerScore < winningScore && computerScore < winningScore && currentRound <= maxRounds) {
        const playerSelection = playerChoice;
        const computerSelection = getComputerChoice();
        const roundResult = playRound(playerSelection, computerSelection);
        if (roundResult.includes('lose')) {
            computerScore++;
        } else if (roundResult.includes('win')) {
            playerScore++;
        }
        console.log(`ROUND ${currentRound}: ${roundResult}`);
        console.log(`SCORE:\nPLAYER: ${playerScore}\nCOMPUTER: ${computerScore}`);
        currentRound++;
    }
    console.log(`FINAL SCORE:\nPLAYER: ${playerScore}\nCOMPUTER: ${computerScore}`);
    finalResult(playerScore, computerScore, winningScore);
    return;

}
// Function to display the fiinal result of the game based on score:
function finalResult(playerScore, computerScore, winningScore) {
    if (playerScore >= winningScore) {
        console.log(`CONGRATULATIONS! YOU WIN!`);
    } else if (computerScore >= winningScore) {
        console.log(`SORRY! YOU LOSE!`);
    } else {
        if (computerScore > playerScore) {
            console.log(`SORRY! YOU LOSE!`);
        } else if (playerScore > computerScore) {
            console.log(`CONGRATULATIONS! YOU WIN!`);
        } else {
            console.log(`IT'S A TIE! PLAY AGAIN TO TRY TO BEAT THE COMPUTER!`);
        }
    }
}

// LINK TO ELEMENTS IN DOM
const rockButton = document.getElementById('btn-rock');
const paperButton = document.getElementById('btn-paper');
const scissorsButton = document.getElementById('btn-scissors');

const results = document.getElementById('results');

const currentRound = document.getElementById('current-round');

// EVENT LISTENERS FOR BUTTONS
rockButton.addEventListener('click', () => {
    const roundResult = document.createElement('p');
    roundResult.appendChild(document.createTextNode(`Round ${currentRound.textContent}: ${playRound('ROCK')}`));
    results.appendChild(roundResult);
    // update score
    updateGame(roundResult);
});
paperButton.addEventListener('click', () => {
    const roundResult = document.createElement('p');
    roundResult.appendChild(document.createTextNode(`Round ${currentRound.textContent}: ${playRound('PAPER')}`));
    results.appendChild(roundResult);
    updateGame(roundResult);
});
scissorsButton.addEventListener('click', () => {
    const roundResult = document.createElement('p');
    roundResult.appendChild(document.createTextNode(`Round ${currentRound.textContent}: ${playRound('SCISSORS')}`));
    results.appendChild(roundResult);
    updateGame(roundResult);
});

// FUNCTION TO UPDATE GAME ROUNDS AND SCORES
function updateGame(roundResult) {
    const computerScore = document.getElementById('computer-score');
    const playerScore = document.getElementById('player-score');
    
    // UPDATE CURRENT ROUND NUMBER
    currentRound.textContent = parseInt(currentRound.textContent) + 1;

    // UPDATE PLAYER OR COMPUTER SCORE
    if (roundResult.textContent.includes('lose')) {
        computerScore.textContent = parseInt(computerScore.textContent) + 1;
    } else if (roundResult.textContent.includes('win')) {
        playerScore.textContent = parseInt(playerScore.textContent) + 1;
    }

    if (playerScore.textContent == '5' || computerScore.textContent == '5') {
        rockButton.removeEventListener('click', () => {
            const roundResult = document.createElement('p');
            roundResult.appendChild(document.createTextNode(`Round ${currentRound.textContent}: ${playRound('ROCK')}`));
            results.appendChild(roundResult);
            updateGame(roundResult);
        });
        paperButton.addEventListener('click', () => {
            const roundResult = document.createElement('p');
            roundResult.appendChild(document.createTextNode(`Round ${currentRound.textContent}: ${playRound('PAPER')}`));
            results.appendChild(roundResult);
            updateGame(roundResult);
        });
        scissorsButton.addEventListener('click', () => {
            const roundResult = document.createElement('p');
            roundResult.appendChild(document.createTextNode(`Round ${currentRound.textContent}: ${playRound('SCISSORS')}`));
            results.appendChild(roundResult);
            updateGame(roundResult);
        });
        if (playerScore.textContent == '5') {
            results.appendChild(document.createTextNode('YOU WIN! COMPUTER LOST!'));
        } else {
            results.appendChild(document.createTextNode('YOU LOSE! COMPUTER WON!'));
            
        }
    }
}

// FUNCTION TO DECLARE A WINNER AT FIVE POINTS
