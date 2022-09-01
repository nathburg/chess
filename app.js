// here we go

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

let whiteKingSideCastling = true;
let whiteQueenSideCastling = true;
let blackKingSideCastling = true;
let blackQueenSideCastling = true;

let check = false;
let checkDefense = [];

let currentPlayer = 'white';
const letterArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];


let kings = {
    white: 'e1',
    black: 'e8'
}

let pastMoves = ['ready', 'set'];

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
        const enPassantMoves = pastMoves.slice(-1);
        displayBoard();
        let moves = board[position].piece(position);
        if (board[position].piece === pawn) {
            if (currentPlayer === 'black') {
                // attempt at en passant for white
                if (position === 'a4') {
                    if (enPassantMoves[0][0] === 'b2' && enPassantMoves[0][1] === 'b4') {
                        moveButton('a4', 'b3')
                        const savePiece = board['b4'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);
                        board['b4'] = false;
                    }
                }
                if (position === 'b4') {
                    if (enPassantMoves[0][0] === 'a2' && enPassantMoves[0][1] === 'a4') {
                        moveButton('b4', 'a3')
                        const savePiece = board['a4'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);
                        board['a4'] = false;
                    }
                    if (enPassantMoves[0][0] === 'c2' && enPassantMoves[0][1] === 'c4') {
                        moveButton('b4', 'c3')
                        const savePiece = board['c4'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);

                        board['c4'] = false;
                    }
                }
                if (position === 'c4') {
                    if (enPassantMoves[0][0] === 'b2' && enPassantMoves[0][1] === 'b4') {
                        moveButton('c4', 'b3')
                        const savePiece = board['b4'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);
                        board['b4'] = false;
                    }
                    if (enPassantMoves[0][0] === 'd2' && enPassantMoves[0][1] === 'd4') {
                        moveButton('c4', 'd3')
                        const savePiece = board['d4'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);

                        board['d4'] = false;
                    }
                }
                if (position === 'd4') {
                    if (enPassantMoves[0][0] === 'c2' && enPassantMoves[0][1] === 'c4') {
                        moveButton('d4', 'c3')
                        const savePiece = board['c4'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);
                        board['c4'] = false;
                    }
                    if (enPassantMoves[0][0] === 'e2' && enPassantMoves[0][1] === 'e4') {
                        moveButton('d4', 'e3')
                        const savePiece = board['e4'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);

                        board['e4'] = false;
                    }
                }
                if (position === 'e4') {
                    if (enPassantMoves[0][0] === 'd2' && enPassantMoves[0][1] === 'd4') {
                        moveButton('e4', 'd3')
                        const savePiece = board['d4'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);
                        board['d4'] = false;
                    }
                    if (enPassantMoves[0][0] === 'f2' && enPassantMoves[0][1] === 'f4') {
                        moveButton('e4', 'f3')
                        const savePiece = board['f4'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);

                        board['f4'] = false;
                    }
                }
                if (position === 'f4') {
                    if (enPassantMoves[0][0] === 'e2' && enPassantMoves[0][1] === 'e4') {
                        moveButton('f4', 'e3')
                        const savePiece = board['e4'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);
                        board['e4'] = false;
                    }
                    if (enPassantMoves[0][0] === 'g2' && enPassantMoves[0][1] === 'g4') {
                        moveButton('f4', 'g3')
                        const savePiece = board['g4'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);

                        board['g4'] = false;
                    }
                }
                if (position === 'g4') {
                    if (enPassantMoves[0][0] === 'f2' && enPassantMoves[0][1] === 'f4') {
                        moveButton('g4', 'f3')
                        const savePiece = board['f4'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);
                        board['f4'] = false;
                    }
                    if (enPassantMoves[0][0] === 'h2' && enPassantMoves[0][1] === 'h4') {
                        moveButton('g4', 'h3')
                        const savePiece = board['h4'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);
                        board['h4'] = false;
                    }
                }
                if (position === 'h4') {
                    if (enPassantMoves[0][0] === 'g2' && enPassantMoves[0][1] === 'g4') {
                        moveButton('h4', 'g3')
                        const savePiece = board['g4'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);
                        board['g4'] = false;
                    }
                }
                //promotion

            } else 
            // white pawns can capture en passant
                    {
                if (position === 'a5') {
                    if (enPassantMoves[0][0] === 'b7' && enPassantMoves[0][1] === 'b5') {
                        moveButton('a5', 'b6')
                        const savePiece = board['b5'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);
                        board['b5'] = false;
                    }
                }
                if (position === 'b5') {
                    if (enPassantMoves[0][0] === 'a7' && enPassantMoves[0][1] === 'a7') {
                        moveButton('b5', 'a6')
                        const savePiece = board['a5'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);
                        board['c5'] = false;
                    }
                    if (enPassantMoves[0][0] === 'c7' && enPassantMoves[0][1] === 'c5') {
                        moveButton('b5', 'c6')
                        const savePiece = board['c5'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);
                        board['c5'] = false;
                    }
                }
                if (position === 'c5') {
                    if (enPassantMoves[0][0] === 'b7' && enPassantMoves[0][1] === 'b5') {
                        moveButton('c5', 'b6')
                        const savePiece = board['b5'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);
                        board['b5'] = false;
                    }
                    if (enPassantMoves[0][0] === 'd7' && enPassantMoves[0][1] === 'd5') {
                        moveButton('c5', 'd6')
                        const savePiece = board['d5'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);
                        board['d5'] = false;
                    }
                }
                if (position === 'd5') {
                    if (enPassantMoves[0][0] === 'c7' && enPassantMoves[0][1] === 'c5') {
                        moveButton('d5', 'c6')
                        const savePiece = board['c5'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);
                        board['c5'] = false;
                    }
                    if (enPassantMoves[0][0] === 'e7' && enPassantMoves[0][1] === 'e5') {
                        moveButton('d5', 'e6')
                        const savePiece = board['e5'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);
                        board['e5'] = false;
                    }
                }
                if (position === 'e5') {
                    if (enPassantMoves[0][0] === 'd7' && enPassantMoves[0][1] === 'd5') {
                        moveButton('e5', 'd6')
                        const savePiece = board['d5'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);
                        board['d5'] = false;
                    }
                    if (enPassantMoves[0][0] === 'f7' && enPassantMoves[0][1] === 'f5') {
                        moveButton('e5', 'f6')
                        const savePiece = board['f5'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);
                        board['f5'] = false;
                    }
                }
                if (position === 'f5') {
                    if (enPassantMoves[0][0] === 'e7' && enPassantMoves[0][1] === 'e5') {
                        moveButton('f5', 'e6')
                        const savePiece = board['e5'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);
                        board['e5'] = false;
                    }
                    if (enPassantMoves[0][0] === 'g7' && enPassantMoves[0][1] === 'g5') {
                        moveButton('f5', 'g6')
                        const savePiece = board['g5'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);

                        board['g5'] = false;
                    }
                }
                if (position === 'g5') {
                    if (enPassantMoves[0][0] === 'f7' && enPassantMoves[0][1] === 'f5') {
                        moveButton('g5', 'f6')
                        const savePiece = board['f5'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);
                        board['f5'] = false;
                    }
                    if (enPassantMoves[0][0] === 'h7' && enPassantMoves[0][1] === 'h5') {
                        moveButton('g5', 'h6')
                        const savePiece = board['h5'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);
                        board['h5'] = false;
                    }
                }
                if (position === 'h5') {
                    if (enPassantMoves[0][0] === 'g7' && enPassantMoves[0][1] === 'g5') {
                        moveButton('h5', 'g6')
                        const savePiece = board['g5'];
                        // push piece to the right color of array
                        whiteCaptured.push(savePiece);
                        board['g5'] = false;
                    }
                }
            } 
        } else         
        if (board[position].piece === king) {
            if (currentPlayer === 'white' && whiteKingSideCastling === true && board.f1 === false && board.g1 === false && board.h1.piece === rook) {
                moveButton('e1', 'g1')
        }
            // white castling queen side
            if (currentPlayer === 'white' && whiteQueenSideCastling === true && board.a1.piece === rook && board.b1 === false && board.c1 === false && board.d1 === false) {
                moveButton('e1', 'c1')
        }
            // black castling king side
            if (currentPlayer === 'black' && blackKingSideCastling === true && board.f8 === false && board.g8 === false && board.h8.piece === rook) {
                moveButton('e8', 'g8')
        }  
            // black castling queen side
            if (currentPlayer === 'black' && blackQueenSideCastling === true && board.a8.piece === rook && board.b8 === false && board.c8 === false && board.d8 === false) {
                moveButton('e8', 'c8')
        } 
            let safeMoves = [];
            for (let move of moves) {
                if (checkChecker(move.space)) {
                    safeMoves.push(move);
                }
            }
            moves = safeMoves;
            // white castling king side

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
        let spot7 = '';
        let spot8 = '';
        spot7 = stringToCoords(currentPosition);
        spot8 = stringToCoords(targetPosition);
        pastMoves.push([currentPosition, targetPosition]);  

        if (board[currentPosition].piece === pawn && spot7[1] === 7 && spot8[1] === 8) {
            console.log('in if')
            let test = [];
            if (currentPlayer === 'white') {
                test = { 
                    color: 'white',
                    piece: 'queen',
                    image: '♕'
                    } 
                    board[currentPosition] = false;
                    board[targetPosition] = test;
            }

        } 
        if (board[currentPosition].piece === pawn && spot7[1] === 2 && spot8[1] === 1) {
            console.log('in if')
            let test = [];
            if (currentPlayer === 'black') {
                test = { 
                    color: 'black',
                    piece: 'queen',
                    image: '♛'
                    } 
                    board[currentPosition] = false;
                    board[targetPosition] = test;
            }






        } else {
            pastMoves.push([currentPosition, targetPosition]);  
            const savePiece = board[currentPosition];
            board[currentPosition] = false;
            board[targetPosition] = savePiece;
  
            if (whiteKingSideCastling === true && currentPosition === 'e1' && targetPosition === 'g1') {
                board['f1'] = board['h1']
                board['h1'] = false;
                whiteKingSideCastling = false;
            }
            if (whiteQueenSideCastling === true && currentPosition === 'e1' && targetPosition === 'c1') {
                board['d1'] = board['a1']
                board['a1'] = false;
                whiteQueenSideCastling = false;
            }
            if (blackKingSideCastling === true && currentPosition === 'e8' && targetPosition === 'g8') {
                board['f8'] = board['h8']
                board['h8'] = false;
                blackKingSideCastling = false;
            }
            if (blackQueenSideCastling === true && currentPosition === 'e8' && targetPosition === 'c8') {
                board['d8'] = board['a8']
                board['a8'] = false;
                blackQueenSideCastling = false;
            }

       // make castling impossible if white or black king moves
       if (board[targetPosition].piece === king)  {
        if (currentPlayer === 'white') {
            if (targetPosition != 'g1') {
                whiteKingSideCastling = false;
                whiteQueenSideCastling = false;
            }
        }
    }
    if (board[targetPosition].piece === king)  {
        if (currentPlayer === 'black') {
            if (targetPosition != 'c8') {
                blackKingSideCastling = false;
                blackQueenSideCastling = false;
            }
        }
    }

    // make castling impossible if white or black rooks move
    // need to clarify which rook has moved, currently if any white rook moves white can no longer castle (vice versa)
    if (board[targetPosition].piece === rook)  {
        if (currentPlayer === 'white') {
                whiteKingSideCastling = false;
                whiteQueenSideCastling = false;
        }
    }
    if (board[targetPosition].piece === rook)  {
        if (currentPlayer === 'black') {
                blackKingSideCastling = false;
                blackQueenSideCastling = false;
        }
    }
            changePlayer();
            displayBoard();
            checkDefense = [];
            check = false;
            fullCheck();
        }
    })
}


function attackButton(currentPosition, targetPosition) {
    const targetPositionEl = document.getElementById(targetPosition);
    targetPositionEl.textContent = `x${board[targetPosition].image}`;
    targetPositionEl.addEventListener('click', () => {
        let spot7 = '';
        let spot8 = '';
        spot7 = stringToCoords(currentPosition);
        spot8 = stringToCoords(targetPosition);

        pastMoves.push([currentPosition, targetPosition]);  
        const savePiece = board[targetPosition];
        if (savePiece.color === 'white') {
            whiteCaptured.push(savePiece);
        } else {
            blackCaptured.push(savePiece);
        }
        if (board[currentPosition].piece === pawn && spot7[1] === 7 && spot8[1] === 8) {
            console.log('in if')
            let test = [];
            if (currentPlayer === 'white') {
                test = { 
                    color: 'white',
                    piece: 'queen',
                    image: '♕'
                    } 
            }
            board[currentPosition] = false;
            board[targetPosition] = test;
        } 
        else if (board[currentPosition].piece === pawn && spot7[1] === 2 && spot8[1] === 1) {
            console.log('in if')
            let test = [];
            if (currentPlayer === 'black') {
                test = { 
                    color: 'black',
                    piece: 'queen',
                    image: '♛'
                    } 
            }
            board[currentPosition] = false;
            board[targetPosition] = test;
            
        } else {
            pastMoves.push([currentPosition, targetPosition]);  
            board[targetPosition] = board[currentPosition];
            board[currentPosition] = false;
        }
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
























