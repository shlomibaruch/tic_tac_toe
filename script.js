let bord;
const player_1 = 'O';
const player_2 = 'X';
const WinningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]
const box = document.querySelectorAll('.box');
stratTheGame();

function stratTheGame() {
    document.querySelector(".endGame").style.display = "none";
    bord = Array.from(Array(9).keys());
    for (let i = 0; i < box.length; i++) {
        let element = box[i];
        element.innerText = "";
        element.style.removeProperty('background-color')
        element.addEventListener('click', yourTurnClick, false)
    }
}
function yourTurnClick(yourTurn) {
    if (typeof bord[yourTurn.target.id] == 'number') {
        turn(yourTurn.target.id, player_2);
        if (!checkTie()) turn(bestSpot(), player_1)

    }
}
function turn(yourTurnId, player) {
    bord[yourTurnId] = player;
    document.getElementById(yourTurnId).innerText = player;
    let gameWon = checkWin(bord, player)
    if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, [])

    let gameWon = null;
    for (let [index, win] of WinningCombo.entries()) {
        if (win.every(element => plays.indexOf(element) > -1)) {
            gameWon = { index: index, player: player };
            break;


        }

    }
    return gameWon;

}
function gameOver(gameWon) {
    for (let index of WinningCombo[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player == player_1 ? "red" : "green";
    }
    for (let i = 0; i < box.length; i++) {
        box[i].removeEventListener('click', yourTurnClick, false);
    }
}


function declareWinner(who) {
    document.querySelector(".endGame").style.display = "block";
    document.querySelector(".endGame .text").innerText = who;
}

function emptySquares() {
    return bord.filter(s => typeof s == 'number');
}

function bestSpot() {
    return minimax(bord, player_2).index;
}

function checkTie() {
    if (emptySquares().length == 0) {
        for (let i = 0; i < box.length; i++) {
            box[i].style.backgroundColor = "green";
            box[i].removeEventListener('click', yourTurnClick, false);
        }
        declareWinner(" Is a Tie!")
        return true;
    }
    return false;
}

function minimax(newBoard, player) {
    let availSpots = emptySquares();

    if (checkWin(newBoard, player_1)) {
        return { score: -10 };
    } else if (checkWin(newBoard, player_2)) {
        return { score: 10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }
    let moves = [];
    for (let i = 0; i < availSpots.length; i++) {
        let move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if (player == player_2) {
            let result = minimax(newBoard, player_2);
            move.score = result.score;
        } else {
            let result = minimax(newBoard, player_1);
            move.score = result.score;
        }

        newBoard[availSpots[i]] = move.index;

        moves.push(move);
    }

    let bestMove;
    if (player === player_2) {
        let bestScore = -100;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}



// function checkWin(board, player) {
// 	let plays = board.reduce((a, e, i) => 
// 		(e === player) ? a.concat(i) : a, []);
// 	let gameWon = null;
// 	for (let [index, win] of WinningCombo.entries()) {
// 		if (win.every(elem => plays.indexOf(elem) > -1)) {
// 			gameWon = {index: index, player: player};
// 			break;
// 		}
// 	}
// 	return gameWon;
// }
// function gameOver(gameWon){
//     for(let index of WinningCombo[gameWon,index]){
//         document.getElementById(index).style.backgroundColor = gameWon.player == player_1 ? 'green' : 'red';

//     }
//     for (let i = 0; i < box.length; i++) {
//         box[i].removeEventListener('click', youryourTurnClick , false)       
//     }

