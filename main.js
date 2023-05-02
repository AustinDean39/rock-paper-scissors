// function to randomly return either 'ROCK', 'PAPER', or 'SCISSORS' to be used as the computer's choice
function getComputerChoice() {
    const choice = parseInt((Math.random() * 3) + 1);
    switch (choice) {
        case 1:
            return 'ROCK';
        case 2:
            return 'PAPER';
        default:
            return 'SCISSORS';
    }
}

// function to ask for the player choice:
function playerSelection() {
    let playerSelection = prompt('Please Choose:\nROCK, PAPER, or SCISSORS?\n(if you do not make a choice, one will be randomly selected for you)', 'Please type your selection here').toUpperCase();
    if (playerSelection == 'ROCK' || playerSelection == 'SCISSORS' || playerSelection == 'PAPER') {
        return playerSelection;
    } else {
        return getComputerChoice();
    }
}