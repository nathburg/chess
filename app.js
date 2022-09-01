let board = {
    
    a1: {
        color: 'white',
        piece: rook,
        image: '♖'
        },
    b1:  {
        color: 'white',
        piece: knight,
        image: '♘'
        },
    c1:  {
        color: 'white',
        piece: bishop,
        image: '♗'
        },
    d1:  {
        color: 'white',
        piece: queen,
        image: '♕'
        },
    e1:  {
        color: 'white',
        piece: king,
        image: '♔'
        },
    f1:  {
        color: 'white',
        piece: bishop,
        image: '♗'
        },
    g1: {
        color: 'white',
        piece: knight,
        image: '♘'
        },
    h1: {
        color: 'white',
        piece: rook,
        image: '♖'
        },
    a2: {
        color: 'white',
        piece: pawn,
        image: '♙'
        },
    b2:  {
        color: 'white',
        piece: pawn,
        image: '♙'
        },
    c2:  {
        color: 'white',
        piece: pawn,
        image: '♙'
        },
    d2:  {
        color: 'white',
        piece: pawn,
        image: '♙'
        },
    e2:  {
        color: 'white',
        piece: pawn,
        image: '♙'
        },
    f2:  {
        color: 'white',
        piece: pawn,
        image: '♙'
        },
    g2:  {
        color: 'white',
        piece: pawn,
        image: '♙'
        },
    h2:  {
        color: 'white',
        piece: pawn,
        image: '♙'
        },
    a3: false,
    b3: false,
    c3: false,
    d3: false,
    e3: false,
    f3: false,
    g3: false,
    h3: false,
    a4: false,
    b4: false,
    c4: false,
    d4: false,
    e4: false,
    f4: false,
    g4: false,
    h4: false,
    a5: false,
    b5: false,
    c5: false,
    d5: false,
    e5: false,
    f5: false,
    g5: false,
    h5: false,
    a6: false,
    b6: false,
    c6: false,
    d6: false,
    e6: false,
    f6: false,
    g6: false,
    h6: false,
    a7:  {
        color: 'black',
        piece: pawn,
        image: '♟'
        },
    b7:  {
        color: 'black',
        piece: pawn,
        image: '♟'
        },
    c7:  {
        color: 'black',
        piece: pawn,
        image: '♟'
        },
    d7:  {
        color: 'black',
        piece: pawn,
        image: '♟'
        },
    e7:  {
        color: 'black',
        piece: pawn,
        image: '♟'
        },
    f7:  {
        color: 'black',
        piece: pawn,
        image: '♟'
        },
    g7:  {
        color: 'black',
        piece: pawn,
        image: '♟'
        },
    h7:  {
        color: 'black',
        piece: pawn,
        image: '♟'
        },
    a8:  {
        color: 'black',
        piece: rook,
        image: '♜'
        },
    b8:  {
        color: 'black',
        piece: knight,
        image: '♞'
        },
    c8:  {
        color: 'black',
        piece: bishop,
        image: '♝'
        },
    d8:  {
        color: 'black',
        piece: queen,
        image: '♛'
        },
    e8:  { 
        color: 'black',
        piece: king,
        image: '♚'
        },
    f8:  {
        color: 'black',
        piece: bishop,
        image: '♝'
        },
    g8:  {
        color: 'black',
        piece: knight,
        image: '♞'
        },
    h8:  {
        color: 'black',
        piece: rook,
        image: '♜'
        } 
}


let whiteCaptured = [];
let blackCaptured = [];

let check = false;
let checkDefense = [];

let currentPlayer = 'white';
const letterArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];



let kings = {
    white: 'e1',
    black: 'e8'
}

displayBoard()

// the point of displayBoard is to update the display with the current state of the board object
function displayBoard() {
    let white = false;
    let counter = 0;
    // We loop through all the positions in the board object.
    // Each "position" is one of the keys, like a4 or g6. 
    for (const position in board) {

        
            
        // grab the proper html element for this position
        const getPosition = document.getElementById(position);
        // make a new button to replace it
        const newPosition = document.createElement('button');
        // give it the right id and classes
        newPosition.id = position;
        newPosition.classList.add('square');
        if (white) {
            newPosition.classList.add('white');
        } else {
            newPosition.classList.add('black');
        }
        // replace old element with the new one
        getPosition.replaceWith(newPosition);

        // we go deeper into the function if there is actually something at the current board position
        // otherwise the function just stops right here with an empty button and loops to a new position
        if (board[position]) {
            // if there's a piece at the position we insert an image of the piece at the position
            newPosition.textContent = `${board[position].image}`;
            // we go deeper again if the current piece is the same color as the current player
            // if it use, we enter the renderPlayable function to give this piece a button to play
            if (board[position].color === currentPlayer) {
                renderPlayable(position);
            }
        }
        counter++;
        if (counter%8) {
        white = !white;
        }

    }

}

// this function uses the pawn function to determine which positions the pawn can move to
// it then renders those positions with attack buttons or move buttons depending on if the
// position is empty or has an enemy on it
// (this is where the functions for other pieces will go once we build those)
function renderPlayable(position) {
        const positionEl = document.getElementById(position);
        
        positionEl.addEventListener('click', () => {


            

                // refresh the board
                displayBoard();
                // get the positions the pawn functions determines are viable moves
                let moves = board[position].piece(position);
                if (check) {
                    moves = performIntersection(moves, defenseMoves)
                }
                // loop through those moves
                for (let move of moves) {
                    // if the positions is empty, give it a move button
                    if (move.condition === 'empty') {
                        moveButton(position, move.space);
                    }
                    // if the position has an enemy piece, give it an attack button
                    if (move.condition === 'enemy') {
                        attackButton(position, move.space);
                    }
                }

            
        });
}



function moveButton(currentPosition, targetPosition) {
    const targetPositionEl = document.getElementById(targetPosition);
    targetPositionEl.textContent = 'x';
    targetPositionEl.addEventListener('click', () => {
        const savePiece = board[currentPosition];
        board[currentPosition] = false;
        board[targetPosition] = savePiece;
        changePlayer();
        displayBoard();
        checkCheck();
    })
}

function kingMoveButton(currentPosition, targetPosition) {
    const targetPositionEl = document.getElementById(targetPosition);
    targetPositionEl.textContent = 'x';
    targetPositionEl.addEventListener('click', () => {
        kings[currentPlayer] = targetPosition;
        const savePiece = board[currentPosition];
        board[currentPosition] = false;
        board[targetPosition] = savePiece;
        console.log(kings);
        changePlayer();
        displayBoard();
        console.log(kings);
    })
}

function attackButton(currentPosition, targetPosition) {
    
    const targetPositionEl = document.getElementById(targetPosition);
    targetPositionEl.textContent = `x${board[targetPosition].image}`;
    targetPositionEl.addEventListener('click', () => {
        const savePiece = board[targetPosition];
        if (savePiece.color === 'white') {
            whiteCaptured.push(savePiece);
        } else {
            blackCaptured.push(savePiece);
        }
        board[targetPosition] = board[currentPosition];
        board[currentPosition] = false;
        changePlayer();
        displayBoard();
        checkCheck();
    })
}

function kingAttackButton(currentPosition, targetPosition) {
    
    const targetPositionEl = document.getElementById(targetPosition);
    targetPositionEl.textContent = `x${board[targetPosition].image}`;
    targetPositionEl.addEventListener('click', () => {
        kings[currentPlayer] = targetPosition;
        const savePiece = board[targetPosition];
        if (savePiece.color === 'white') {
            whiteCaptured.push(savePiece);
        } else {
            blackCaptured.push(savePiece);
        }
        board[targetPosition] = board[currentPosition];
        board[currentPosition] = false;
        changePlayer();
        displayBoard();
        console.log(kings);
    })
}



function checkWhite(findWhiteKing, position) {
    let enemyMovesArr = [];
    
    // loop through pieces array
    console.log('piece', position.piece);
    if (position.piece === 'pawn') {
        let pawnMoves = pawn(position);
        console.log('pawnmoves', pawnMoves);
        for (let move of pawnMoves) {
            enemyMovesArr.push(move);
        }
        
    }
    if (position.piece === 'rook') {
        console.log('rook position', position);
        let rook = rook(position);
        enemyMovesArr.push(rook);
    }
    if (position.piece === 'queen') {
        let queen = queen(position);
        enemyMovesArr.push(queen);
    }
    if (position.piece === 'bishop') {
        let bishop = bishop(position);
        enemyMovesArr.push(bishop);
    }
    if (position.piece === 'knight') {
        let knight = knight(position);
        enemyMovesArr.push(knight);
    }

    // let kingPosition = findWhiteKing();

    // console.log(enemyMoves, kingPosition);
    for (let move of enemyMovesArr) {
        if (move === kingPosition) {
            alert('check');
            
            check = true;
            break;
        }

    console.log('enemy moves array', enemyMovesArr);
    return enemyMovesArr;

    
}
}



function findWhiteKing(){
    for (let location of document.querySelectorAll('button')) {
        if (location.textContent.includes('♔')) {
            return location.id;
        }
    } 
}

function findBlackKing(){
    for (let location of document.querySelectorAll('button')) {
        if (location.textContent.includes('♚')) {
            return location.id;
        }
    } 
}





    
function pawn(position) {
    
    let moves = [];
    const coords = stringToCoords(position);
    let x = coords[0];
    let y = coords[1];
    
    if (currentPlayer === 'white') {
        if (inRange(y+1)) {
            if (inRange(x-1)) {

                const test = coordsToString([x-1, y+1]);

                if (inspectSpace(test) && inspectSpace(test).condition  === 'enemy') {
                    moves.push(inspectSpace(test));
                } 
            }
            if (inRange(x+1)) {
                const test = coordsToString([x+1, y+1]);
                if (inspectSpace(test) && inspectSpace(test).condition  === 'enemy') {
                    moves.push(inspectSpace(test));
                }
            }

            if (inspectSpace(coordsToString([x, y+1])) && inspectSpace(coordsToString([x, y+1])).condition === 'empty') {
                
                moves.push(inspectSpace(coordsToString([x, y+1])));
                if (y === 2 && inspectSpace(coordsToString([x, y+2])) && inspectSpace(coordsToString([x, y+2])).condition === 'empty') {
                    moves.push(inspectSpace(coordsToString([x, y+2])))
                }
            }
        }
    }

    if (currentPlayer === 'black') {
        
        if (inRange(y-1)) {
            if (inRange(x-1)) {
                const test = coordsToString([x-1, y-1]);
                if (inspectSpace(test) && inspectSpace(test).condition  === 'enemy') {
                    moves.push(inspectSpace(test));
                }
            }
            if (inRange(x+1)) {
                const test = coordsToString([x+1, y-1]);
                if (inspectSpace(test) && inspectSpace(test).condition  === 'enemy') {
                    moves.push(inspectSpace(test));
                }
            }
            if (inspectSpace(coordsToString([x, y-1])) && inspectSpace(coordsToString([x, y-1])).condition === 'empty') {
                moves.push(inspectSpace(coordsToString([x, y-1])));
                if (y === 7 && inspectSpace(coordsToString([x, y-2])) && inspectSpace(coordsToString([x, y-2])).condition === 'empty') {
                    moves.push(inspectSpace(coordsToString([x, y-2])))
                }
            }
        }
    }
    
    return moves;
    
}  

function king(position) {
    let moves = [];

    const coords = stringToCoords(position);
    let x = coords[0];
    let y = coords[1];

    if (testSpace(x, y+1)) {
        moves.push(testSpace(x, y+1))
    }
    if (testSpace(x, y-1)) {
        moves.push(testSpace(x, y-1))
    }
    if (testSpace(x+1, y+1)) {
        moves.push(testSpace(x+1, y+1))
    }
    if (testSpace(x+1, y-1)) {
        moves.push(testSpace(x+1, y-1))
    }
    if (testSpace(x+1, y)) {
        moves.push(testSpace(x+1, y))
    }
    if (testSpace(x-1, y+1)) {
        moves.push(testSpace(x-1, y+1))
    }
    if (testSpace(x-1, y-1)) {
        moves.push(testSpace(x-1, y-1))
    }
    if (testSpace(x-1, y)) {
        moves.push(testSpace(x-1, y))
    }


    
    return moves;

    
}

function knight(position) {
    let moves = [];
    const coords = stringToCoords(position);
    let x = coords[0];
    let y = coords[1];

    if (testSpace(x+1, y+2)) {
        moves.push(testSpace(x+1, y+2))
    }
    if (testSpace(x+1, y-2)) {
        moves.push(testSpace(x+1, y-2))
    }
    if (testSpace(x+2, y+1)) {
        moves.push(testSpace(x+2, y+1))
    }
    if (testSpace(x+2, y-1)) {
        moves.push(testSpace(x+2, y-1))
    }
    if (testSpace(x-1, y+2)) {
        moves.push(testSpace(x-1, y+2))
    }
    if (testSpace(x-1, y-2)) {
        moves.push(testSpace(x-1, y-2))
    }
    if (testSpace(x-2, y+1)) {
        moves.push(testSpace(x-2, y+1))
    }
    if (testSpace(x-2, y-1)) {
        moves.push(testSpace(x-2, y-1))
    }
    return moves;
}

function bishop(position) {
    let moves = [];
    moves = moves.concat(continueMove(position, minusOne, plusOne));
    moves = moves.concat(continueMove(position, plusOne, plusOne));
    moves = moves.concat(continueMove(position, minusOne, minusOne));
    moves = moves.concat(continueMove(position, plusOne, minusOne));
    return moves;
}

function rook(position) {
    let moves = [];

    moves = moves.concat(continueMove(position, constantFunction, plusOne));
    moves = moves.concat(continueMove(position, constantFunction, minusOne));
    moves = moves.concat(continueMove(position, plusOne, constantFunction));
    moves = moves.concat(continueMove(position, minusOne, constantFunction));
    
    return moves;
}

function queen(position) {
    let moves = bishop(position).concat(rook(position));
    return moves;
}

function testSpace(x, y) {
    if (inRange(x) && inRange(y)) {
        const test = coordsToString([x, y]);
        if (inspectSpace(test)) {
            return inspectSpace(test)
        }
    }
}    

function continueMove(position, deltaXFunction, deltaYFunction) {
    let newMoves = [];
    const coords = stringToCoords(position);
    let x = coords[0];
    let y = coords[1];
    let open = true;
    let testX = deltaXFunction(x);
    let testY = deltaYFunction(y);
    while (open === true) {
        if (inRange(testX) && inRange(testY)) {
            const test = coordsToString([testX, testY]);
            if (inspectSpace(test)) {
                newMoves.push(inspectSpace(test));
                if (inspectSpace(test).condition === 'empty') {
                    testX = deltaXFunction(testX);
                    testY = deltaYFunction(testY);
                } else {
                    open = false;
                }
            } else {
                open = false;
            }
        } else {
            open = false;
        }
    }
    return newMoves;
}

function plusOne(a) {
    return a+1;
}

function minusOne(a) {
    return a-1;
}

function constantFunction(a) {
    return a;
}

function inverseFunction(fn) {
    const inverter = {
        minusOne: plusOne,
        plusOne: minusOne,
        constantFunction: constantFunction
    }

    return inverter[fn];
}

// this just makes sure that any coordinate we look at is between 0 and 8, i.e. on the board
function inRange(number) {
    if (0 < number && number <= 8) {
        return true;
    } else {
        return false;
    }
}


// this converts the board position string (let's say 'e7') and converts it to its coordinates (e7 is [5, 7]) 
function stringToCoords(string) {
    const splitString = string.split('');
    const coords = [letterArray.indexOf(splitString[0])+1, Number(splitString[1])]
    return coords;
}

// this converts coordinates back to the board position strings
function coordsToString(coords) {
    coords[0] = letterArray[coords[0]-1];
    return coords.join('');
}

// this returns nothing if there's an ally piece in the space it's looking at
function inspectSpace(space) {
    // if there's nothing in the space, return the object with condition marked empty
    if (!board[space]) {
        return {'space': space, condition: 'empty'}
    // if an enemy piece is in the space, return the object with condition marked enemy
    } else if (board[space].color !== currentPlayer) {
        return {'space': space, condition: 'enemy'}
    } 
}

function changePlayer() {
    if (currentPlayer === 'white') {
        currentPlayer = 'black';
    } else {
        currentPlayer = 'white';
    }
}

function polarityChecker(number) {
    if (number < 0) {
        return minusOne;
    }
    if (number > 0) {
        return plusOne;
    } 
    else {
        return constantFunction;
    }
}

function checkCheck() {
    let kingPosition = '';
    let threatMoves = [];
    //loop through your pieces to find king
    for (let position in board) {
        //if the piece is a king and its color is the current color
        if (board[position].piece === king && board[position].color === currentPlayer) {
            //make kingposition equal to the position that we found
            kingPosition = position;
            break
        } 
    }
    
    //get its coordinates
    const kingX = stringToCoords(kingPosition)[0];
    const kingY = stringToCoords(kingPosition)[1];

    //loop through pieces again
    changePlayer();
    for (let position in board) {
        if (board[position].color === currentPlayer) {
            const checkArray = board[position].piece(position);
            // console.log(checkArray)
            for (let move of checkArray) {
                    if (move.space === kingPosition) {
                        // if that piece is a pawn or a knight
                        //(because those two don't have continuing moves)
                        if (board[position].piece === pawn || board[position].piece === knight) {
                            //
                            threatMoves.push({space: position, condition: 'enemy'})
                        }
                        else if (board[position].piece != king) {
                            // console.log('hi')
                            const threatX = stringToCoords(position)[0];
                            const threatY = stringToCoords(position)[1];
                            // console.log(stringToCoords(position));
                            // console.log(threatX);
                            // console.log(threatY);
                            const deltaXFunction = polarityChecker(threatX-kingX);
                            const deltaYFunction = polarityChecker(threatY-kingY);
                            // console.log(deltaXFunction, deltaYFunction);
                            changePlayer();

                            const newThreatMoves = threatMoves.concat(continueMove(kingPosition, deltaXFunction, deltaYFunction)) 
                            threatMoves = newThreatMoves;
                            changePlayer();
                        }
                    }

            }
        }
    }
    changePlayer();
    
    if (threatMoves.length > 0) {
        check = true;
        alert("you're in check");
        for (let position in board) {
            if (board[position].piece != king && board[position].color === currentPlayer) {
                const newDefenseMoves = board[position].piece(position);
                // console.log(newDefenseMoves)
                // console.log(threatMoves)
                const solutionForCheck = performIntersection(threatMoves, newDefenseMoves);
                const sendDefenseMoves = defenseMoves.concat(solutionForCheck);
                defenseMoves = sendDefenseMoves;
            }
        }
        console.log(defenseMoves);
        if (defenseMoves.length === 0) {
            console.log("you're in *checkmate")
        } 
        else {
            checkDefense = defenseMoves;
            console.log(checkDefense)
        } 
    }
        else {
        check = false;
    }
}






function performIntersection(arr1, arr2) {

    const set = new Set();

    for(const move of arr1) {
        set.add(move.space + move.condition);
    }
    
    const results = [];
    
    for(const move of arr2) {
        if(set.has(move.space + move.condition)) {
            results.push(move);
        }
    }
    
    return results;
    

}

// const array1 = [{space: 'c6', condition: 'empty'}, {space: 'c5', condition: 'empty'}];
// const array2 = [{space: 'd7', condition: 'empty'},
//                 {space: 'c6', condition: 'empty'},
//                 {space: 'b5', condition: 'empty'},
//                 {space: 'a4', condition: 'enemy'}      
// ];

// const result = performIntersection(array1, array2);
// console.log(result);




























