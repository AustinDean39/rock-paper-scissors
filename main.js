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
function playRound(playerSelection, computerSelection) {
    let response = '';
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

const playerSelection = getPlayerSelection();
const computerSelection = getComputerChoice();

console.log(playRound(playerSelection, computerSelection));