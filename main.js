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