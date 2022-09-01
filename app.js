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

function displayBoard() {
    let white = false;
    let counter = 0;

    for (const position in board) {
        const getPosition = document.getElementById(position);
        const newPosition = document.createElement('button');
        newPosition.id = position;
        newPosition.classList.add('square');
        if (white) {
            newPosition.classList.add('white');
        } else {
            newPosition.classList.add('black');
        }
        getPosition.replaceWith(newPosition);
        if (board[position]) {
            newPosition.textContent = `${board[position].image}`;
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


function renderPlayable(position) {
    const positionEl = document.getElementById(position);
    
    positionEl.addEventListener('click', () => {
        displayBoard();
        let moves = board[position].piece(position);
        if (board[position].piece === king) {
            let safeMoves = [];
            for (let move of moves) {
                if (checkChecker(move.space)) {
                    safeMoves.push(move);
                }
            }
            moves = safeMoves;
        }
        if (check && board[position].piece != king) {
            moves = performIntersection(moves, checkDefense)
        }
        for (let move of moves) {
            if (move.condition === 'empty') {
                moveButton(position, move.space);
            }
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
        checkDefense = [];
        check = false;
        fullCheck();
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
        checkDefense = [];
        check = false;
        fullCheck();
    })
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

    if (testSpace(x, y+1) ) {
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

// function testSpaceKing(x, y) {
//     if (inRange(x) && inRange(y)) {
//         const test = coordsToString([x, y]);
//         if (inspectSpace(test) && checkChecker(test)) {
//             return inspectSpace(test)
//         }
//     }
// }

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

function inRange(number) {
    if (0 < number && number <= 8) {
        return true;
    } else {
        return false;
    }
}


function stringToCoords(string) {
    const splitString = string.split('');
    const coords = [letterArray.indexOf(splitString[0])+1, Number(splitString[1])]
    return coords;
}

function coordsToString(coords) {
    coords[0] = letterArray[coords[0]-1];
    return coords.join('');
}

function inspectSpace(space) {
    if (!board[space]) {
        return {'space': space, condition: 'empty'}
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

function findKing(color) {
    for (let position in board) {
        if (board[position].piece === king
            && board[position].color === color) {
            
            return position;
        }
    }
}

function partialCheck(space) {
    let threatMoves = [];
    
    const kingX = stringToCoords(space)[0];
    const kingY = stringToCoords(space)[1];

    changePlayer();
    for (let position in board) {
        if (board[position].color === currentPlayer) {
            const checkArray = board[position].piece(position);
            for (let move of checkArray) {
                    if (move.space === space) {
                        if (board[position].piece === pawn || board[position].piece === knight) {
                            threatMoves.push({space: position, condition: 'enemy'})
                        }
                        else if (board[position].piece != king) {
                            const threatX = stringToCoords(position)[0];
                            const threatY = stringToCoords(position)[1];
                            const deltaXFunction = polarityChecker(threatX-kingX);
                            const deltaYFunction = polarityChecker(threatY-kingY);
                            changePlayer();
                            const newThreatMoves = threatMoves.concat(continueMove(space, deltaXFunction, deltaYFunction)) 
                            threatMoves = newThreatMoves;
                            changePlayer();
                        }
                    }

            }
        }
    }
    changePlayer();
    return threatMoves;
    
}


function checkChecker(position) {
    return partialCheck(position).length === 0;
}


function fullCheck() {
    let kingPosition = findKing(currentPlayer);
    let defenseMoves = [];
    let kingEvasionMoves = [];
    const threatMoves = partialCheck(kingPosition);
    if (threatMoves.length > 0) {
        check = true;
        alert('You\'re in check!')
        for (let position in board) {
            if (position === kingPosition) {
                const kingMoves = king(position);
                for (let move of kingMoves) {
                    if (checkChecker(move.space)) {
                        kingEvasionMoves.push(move);
                    }
                }
            } else if (board[position].color === currentPlayer) {
                const newDefenseMoves = board[position].piece(position);
                const solutionForCheck = performIntersection(threatMoves, newDefenseMoves);
                const sendDefenseMoves = defenseMoves.concat(solutionForCheck);
                defenseMoves = sendDefenseMoves;
            }
        }
        checkDefense = defenseMoves;
        const allDefense = kingEvasionMoves.concat(checkDefense);
        if (allDefense.length === 0 && threatMoves.length > 0) {
            alert('You\'re in checkmate!')
        } 
        else {
            displayBoard();
        } 
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



// function checkWhite(findWhiteKing, position) {
    //     let enemyMovesArr = [];
        
    //     // loop through pieces array
    //     console.log('piece', position.piece);
    //     if (position.piece === 'pawn') {
    //         let pawnMoves = pawn(position);
    //         console.log('pawnmoves', pawnMoves);
    //         for (let move of pawnMoves) {
    //             enemyMovesArr.push(move);
    //         }
            
    //     }
    //     if (position.piece === 'rook') {
    //         console.log('rook position', position);
    //         let rook = rook(position);
    //         enemyMovesArr.push(rook);
    //     }
    //     if (position.piece === 'queen') {
    //         let queen = queen(position);
    //         enemyMovesArr.push(queen);
    //     }
    //     if (position.piece === 'bishop') {
    //         let bishop = bishop(position);
    //         enemyMovesArr.push(bishop);
    //     }
    //     if (position.piece === 'knight') {
    //         let knight = knight(position);
    //         enemyMovesArr.push(knight);
    //     }
    
    //     // let kingPosition = findWhiteKing();
    
    //     // console.log(enemyMoves, kingPosition);
    //     for (let move of enemyMovesArr) {
    //         if (move === kingPosition) {
    //             alert('check');
                
    //             check = true;
    //             break;
    //         }
    
    //     console.log('enemy moves array', enemyMovesArr);
    //     return enemyMovesArr;
    
        
    // }
    // }
    
    
    
    // function findWhiteKing(){
    //     for (let location of document.querySelectorAll('button')) {
    //         if (location.textContent.includes('♔')) {
    //             return location.id;
    //         }
    //     } 
    // }
    
    // function findBlackKing(){
    //     for (let location of document.querySelectorAll('button')) {
    //         if (location.textContent.includes('♚')) {
    //             return location.id;
    //         }
    //     } 
    // }
























