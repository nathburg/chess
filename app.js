let board = {
    
    a1: {
        color: 'white',
        piece: 'rook',
        image: '♖'
        },
    b1:  {
        color: 'white',
        piece: 'knight',
        image: '♘'
        },
    c1:  {
        color: 'white',
        piece: 'bishop',
        image: '♗'
        },
    d1:  {
        color: 'white',
        piece: 'queen',
        image: '♕'
        },
    e1:  {
        color: 'white',
        piece: 'king',
        image: '♔'
        },
    f1:  {
        color: 'white',
        piece: 'bishop',
        image: '♗'
        },
    g1: {
        color: 'white',
        piece: 'knight',
        image: '♘'
        },
    h1: {
        color: 'white',
        piece: 'rook',
        image: '♖'
        },
    a2: {
        color: 'white',
        piece: 'pawn',
        image: '♙'
        },
    b2:  {
        color: 'white',
        piece: 'pawn',
        image: '♙'
        },
    c2:  {
        color: 'white',
        piece: 'pawn',
        image: '♙'
        },
    d2:  {
        color: 'white',
        piece: 'pawn',
        image: '♙'
        },
    e2:  {
        color: 'white',
        piece: 'pawn',
        image: '♙'
        },
    f2:  {
        color: 'white',
        piece: 'pawn',
        image: '♙'
        },
    g2:  {
        color: 'white',
        piece: 'pawn',
        image: '♙'
        },
    h2:  {
        color: 'white',
        piece: 'pawn',
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
        piece: 'pawn',
        image: '♟'
        },
    b7:  {
        color: 'black',
        piece: 'pawn',
        image: '♟'
        },
    c7:  {
        color: 'black',
        piece: 'pawn',
        image: '♟'
        },
    d7:  {
        color: 'black',
        piece: 'pawn',
        image: '♟'
        },
    e7:  {
        color: 'black',
        piece: 'pawn',
        image: '♟'
        },
    f7:  {
        color: 'black',
        piece: 'pawn',
        image: '♟'
        },
    g7:  {
        color: 'black',
        piece: 'pawn',
        image: '♟'
        },
    h7:  {
        color: 'black',
        piece: 'pawn',
        image: '♟'
        },
    a8:  {
        color: 'black',
        piece: 'rook',
        image: '♜'
        },
    b8:  {
        color: 'black',
        piece: 'knight',
        image: '♞'
        },
    c8:  {
        color: 'black',
        piece: 'bishop',
        image: '♝'
        },
    d8:  {
        color: 'black',
        piece: 'queen',
        image: '♛'
        },
    e8:  { 
        color: 'black',
        piece: 'king',
        image: '♚'
        },
    f8:  {
        color: 'black',
        piece: 'bishop',
        image: '♝'
        },
    g8:  {
        color: 'black',
        piece: 'knight',
        image: '♞'
        },
    h8:  {
        color: 'black',
        piece: 'rook',
        image: '♜'
        } 
}



let whiteCaptured = [];
let blackCaptured = [];
let whiteKingSideCastling = true;
let whiteQueenSideCastling = true;
let blackKingSideCastling = true;
let blackQueenSideCastling = true;

let blackChecked = false;
let whiteChecked = false;


let pastMoves = [['ready', 'set']];

let storedPieces = ['queen', 'king', 'bishop', 'knight', 'rook', 'pawn'];

let currentPlayer = 'white';
const letterArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']



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
            // grab dem last moves
            const enPassantMoves = pastMoves.slice(-1);
            // if the piece is a pawn
            if (board[position].piece === 'pawn') {
                // refresh the board
                displayBoard();
                // get the positions the pawn functions determines are viable moves
                const moves = pawn(position);
                // loop through those moves
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
            }

            if (board[position].piece === 'king') {
                displayBoard();
                const moves = king(position);

                // white castling king side
                if (currentPlayer === 'white' && whiteKingSideCastling === true && board.f1 === false && board.g1 === false && board.h1.piece === 'rook') {
                    moveButton('e1', 'g1')
            }
                // white castling queen side
                if (currentPlayer === 'white' && whiteQueenSideCastling === true && board.a1.piece === 'rook' && board.b1 === false && board.c1 === false && board.d1 === false) {
                    moveButton('e1', 'c1')
            }
                // black castling king side
                if (currentPlayer === 'black' && blackKingSideCastling === true && board.f8 === false && board.g8 === false && board.h8.piece === 'rook') {
                    moveButton('e8', 'g8')
            }  
                // black castling queen side
                if (currentPlayer === 'black' && blackQueenSideCastling === true && board.a8.piece === 'rook' && board.b8 === false && board.c8 === false && board.d8 === false) {
                    moveButton('e8', 'c8')
            } 
                for (let move of moves) {
                    if (move.condition === 'enemy') {
                        attackButton(position, move.space) ;
                    }
                    if (move.condition === 'empty') {
                        moveButton(position, move.space);
                    }
                }
            }
            if (board[position].piece === 'queen') {
                displayBoard();
                const moves = queen(position);
                for (let move of moves) {
                    if (move.condition === 'enemy') {
                        attackButton(position, move.space) ;
                    }
                    if (move.condition === 'empty') {
                        moveButton(position, move.space);
                    }
                }
            }
            if (board[position].piece === 'rook') {
                displayBoard();
                const moves = rook(position);
                for (let move of moves) {
                    if (move.condition === 'empty') {
                        moveButton(position, move.space);
                    }
                    if (move.condition === 'enemy') {
                        attackButton(position, move.space);
                    }
                }
            }
            if (board[position].piece === 'bishop') {
                displayBoard();
                const moves = bishop(position);

                for (let move of moves) {
                    if (move.condition === 'enemy') {
                        attackButton(position, move.space) ;
                    }

                    if (move.condition === 'empty') {
                        moveButton(position, move.space);
                    }
                }
            }
            if (board[position].piece === 'knight') {
                displayBoard();
                const moves = knight(position);

                for (let move of moves) {
                    if (move.condition === 'enemy') {
                        attackButton(position, move.space) ;
                    }

                    if (move.condition === 'empty') {
                        moveButton(position, move.space);
                    }
                }
            }
        });
}

// this function moves the piece from its current position to the target position
function moveButton(currentPosition, targetPosition) {
    // grab the element of the target position
    const targetPositionEl = document.getElementById(targetPosition);
    // make the target positions have an x in it
    targetPositionEl.textContent = 'x';
    // make the position an event listener that on click moves the piece in the current position to the target position
    targetPositionEl.addEventListener('click', () => {

        if (currentPosition === 'b1' && targetPosition === 'a3') {
            let test = [];
            if (currentPlayer === 'black') {
                test = { 
                    color: 'black',
                    piece: 'queen',
                    image: '♛'
                    }
            } 
            if (currentPlayer === 'white') {
                test = { 
                    color: 'white',
                    piece: 'queen',
                    image: '♕'
                    } 
            }
            board[currentPosition] = false;
            board[targetPosition] = test;
            console.log(board);
        } 
        else 
        {
        pastMoves.push([currentPosition, targetPosition]);        
        // save the piece in a variable so you can delete it off of its current position without losing what was there
        const savePiece = board[currentPosition];
        // replace the current position with false
        board[currentPosition] = false;
        // put the saved piece that was on the current position onto the target position
        board[targetPosition] = savePiece;

        //castling buttons
        if (whiteKingSideCastling === true && currentPosition === 'e1' && targetPosition === 'g1') {
            board['f1'] = board['h1']
            board['h1'] = false;
        }
        if (whiteQueenSideCastling === true && currentPosition === 'e1' && targetPosition === 'c1') {
            board['d1'] = board['a1']
            board['a1'] = false;
        }
        if (blackKingSideCastling === true && currentPosition === 'e8' && targetPosition === 'g8') {
            board['f8'] = board['h8']
            board['h8'] = false;
        }
        if (blackQueenSideCastling === true && currentPosition === 'e8' && targetPosition === 'c8') {
            board['d8'] = board['a8']
            board['a8'] = false;
        }

        }


        let test = getAllBlackMoves();
        console.log(test);
        changePlayer();
        displayBoard();


        // make castling impossible if white or black king moves
        if (board[targetPosition].piece === 'king')  {
            if (currentPlayer === 'black') {
                if (targetPosition != 'g1') {
                    whiteKingSideCastling = false;
                    whiteQueenSideCastling = false;
                }

            }
        }
        if (board[targetPosition].piece === 'king')  {
            if (currentPlayer === 'white') {
                if (targetPosition != 'c8') {
                    blackKingSideCastling = false;
                    blackQueenSideCastling = false;
                }

            }
        }

        // make castling impossible if white or black rooks move
        // need to clarify which rook has moved, currently if any white rook moves white can no longer castle (vice versa)
        if (board[targetPosition].piece === 'rook')  {
            if (currentPlayer === 'black') {
                    whiteKingSideCastling = false;
                    whiteQueenSideCastling = false;
            }
        }
        if (board[targetPosition].piece === 'rook')  {
            if (currentPlayer === 'white') {
                    blackKingSideCastling = false;
                    blackQueenSideCastling = false;
            }
        }



    })
}


// mostly same as above but the target position has an enemy piece to remove and push to its array of captured pieces
function attackButton(currentPosition, targetPosition) {
    const targetPositionEl = document.getElementById(targetPosition);
    // put x next to the text of the piece on the target position
    targetPositionEl.textContent = `x${board[targetPosition].image}`;
    targetPositionEl.addEventListener('click', () => {
        pastMoves.push([currentPosition, targetPosition]);
        const savePiece = board[targetPosition];
        // push piece to the right color of array
        if (savePiece.color === 'white') {
            whiteCaptured.push(savePiece);
        } else {
            blackCaptured.push(savePiece);
        }
        board[targetPosition] = board[currentPosition];
        board[currentPosition] = false;
        let test = getAllBlackMoves();
        console.log(test);
        changePlayer();
        displayBoard();

    })
}
    
// the pawn function takes the current position it's on and returns an array of positions the pawn can move to
function pawn(position) {
    
    // this is array the valid moved will be pushed to
    let moves = [];

    // we convert the board notion of the current position into a length-2 array, ie algebraic coordinates
    const coords = stringToCoords(position);
    // x is the first coordinate
    let x = coords[0];
    // y is the second coordinate
    let y = coords[1];
    
    //white pawn
    if (currentPlayer === 'white') {
        // check if the the row ahead of the current positions is still on the board
        // i.e. checking if the current position is already on the last row and moving forward goes off the board
        if (inRange(y+1)) {
            //attack
            // check if column to the left is on the board
            if (inRange(x-1)) {
                // here we take x-1 and y+1 and convert those to the chess board notation of that position
                //we call it test because we're testing what's going on at that position
                const test = coordsToString([x-1, y+1]);
                //here we call inspectSpace, which looks at the space and tells us if it's empty or has an enemy on it
                // inspectSpace returns objects that look like {space: g5, condition: 'enemy'}.
                // this tells you that at g5 there's an enemy
                if (inspectSpace(test) && inspectSpace(test).condition  === 'enemy') {
                    // push this object from inspectSpace into the moves array
                    moves.push(inspectSpace(test));
                } 
            }
            if (inRange(x+1)) {
                const test = coordsToString([x+1, y+1]);
                if (inspectSpace(test) && inspectSpace(test).condition  === 'enemy') {
                    moves.push(inspectSpace(test));
                }
            }
            //move one space
            // console.log(inspectSpace(coordsToString([x,y+1])));
            if (inspectSpace(coordsToString([x, y+1])).condition === 'empty') {
                
                moves.push(inspectSpace(coordsToString([x, y+1])));
                //move two spaces if in starting row
                if (y === 2 && inspectSpace(coordsToString([x, y+2])).condition === 'empty') {
                    moves.push(inspectSpace(coordsToString([x, y+2])))
                }
            }
        }
    }

         //black pawn
    if (currentPlayer === 'black') {
        if (inRange(y-1)) {
            //attack
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
            //move one space
            if (inspectSpace(coordsToString([x, y-1])).condition === 'empty') {
                moves.push(inspectSpace(coordsToString([x, y-1])));
                //move two spaces if in starting row
                if (y === 7 && inspectSpace(coordsToString([x, y-2])).condition === 'empty') {
                    moves.push(inspectSpace(coordsToString([x, y-2])))
                }
            }
        }
    }
    // this condition doesn't work because [] is actually truthy, so this needs to change
    // the idea though is that if there were no valid moves and nothing went in the moves array by the end then give an alert
    
        return moves;
    
}  

function king(position) {
    let moves = [];

    const coords = stringToCoords(position);
    let x = coords[0];
    let y = coords[1];

    if (inRange(y+1)) {
        if (inRange(x-1)) {
            const test = coordsToString([x-1, y+1]);
            if (inspectSpace(test)) {
                moves.push(inspectSpace(test));
            }
            const testSide = coordsToString([x-1, y]);
            if (inspectSpace(testSide)) {
                moves.push(inspectSpace(testSide));
            }
        }
        if (inRange(x+1)) {
            const test = coordsToString([x+1, y+1]);
                if (inspectSpace(test)) {
                    moves.push(inspectSpace(test));
                }
            const testSide = coordsToString([x+1, y]);
                if (inspectSpace(testSide)) {
                    moves.push(inspectSpace(testSide));
                }
        }
        const test = coordsToString([x, y+1])
            if (inspectSpace(test)) {
                moves.push(inspectSpace(test));
            }
    }
    if (inRange(y-1)) {
        if (inRange(x-1)) {
            const test = coordsToString([x-1, y-1]);
            if (inspectSpace(test)) {
                moves.push(inspectSpace(test));
            }
        }
        if (inRange(x+1)) {
            const test = coordsToString([x+1, y]); // bug change: y+1 to y
                if (inspectSpace(test)) {
                    moves.push(inspectSpace(test));
                }
                const testSide = coordsToString([x-1, y]); //added movement in x direction while on black back row
                if (inspectSpace(testSide)) {
                    moves.push(inspectSpace(testSide));
                }
        }
        
        const test = coordsToString([x, y-1])
            if (inspectSpace(test)) {
                moves.push(inspectSpace(test));
            }
    }  
         return moves;
    
    
} 



function queen(position) {
    let moves = bishop(position).concat(rook(position));
    return moves;
}
   
function bishop(position) {
    let moves = [];

    const coords = stringToCoords(position);
    let x = coords[0];
    let y = coords[1];

    if(inRange(y+1)) {
        
        
        if(inRange(x-1)) {
            let testY = y+1;
            let testX = x-1;
            let open = true;
            while (open === true) {
                if (inRange(testY) && inRange(testX)) {
                const test = coordsToString([testX, testY]);
                    if (inspectSpace(test)) {
                        moves.push(inspectSpace(test));

                        if (inspectSpace(test).condition === 'empty') {
                            
                            
                            testY++;
                            testX--;
                        } else {
                        open = false;
                        }     
                    } else {
                        // console.log('Ello World')
                        open = false;
                    }    
                } else {
                    open = false;
                }
            }
        }

        if(inRange(x+1)) {
            let testY = y+1;
            let testX = x+1;
            let open = true;
            while (open === true) {
                if (inRange(testY) && inRange(testX)) {
                const test = coordsToString([testX, testY]);
                    if (inspectSpace(test)) {
                        moves.push(inspectSpace(test));

                        if (inspectSpace(test).condition === 'empty') {
                            
                            
                            testY++;
                            testX++;
                        } else {
                        open = false;
                        }     
                    } else {
                        // console.log('Ello World')
                        open = false;
                    }    
                } else {
                    open = false;
                }
            }
        }
    }
    if(inRange(y-1)) {
        
        
        if(inRange(x-1)) {
            let testY = y-1;
            let testX = x-1;
            let open = true;
            while (open === true) {
                if (inRange(testY) && inRange(testX)) {
                const test = coordsToString([testX, testY]);
                    if (inspectSpace(test)) {
                        moves.push(inspectSpace(test));

                        if (inspectSpace(test).condition === 'empty') {
                            // console.log('moves', moves);
                            
                            testY--;
                            testX--;
                        } else {
                        open = false;
                        }     
                    } else {
                        // console.log('Ello World')
                        open = false;
                    }    
                } else {
                    open = false;
                }
            }
        }

        if(inRange(x+1)) {
            let testY = y-1;
            let testX = x+1;
            let open = true;
            while (open === true) {
                if (inRange(testY) && inRange(testX)) {
                const test = coordsToString([testX, testY]);
                    if (inspectSpace(test)) {
                        moves.push(inspectSpace(test));

                        if (inspectSpace(test).condition === 'empty') {
                            // console.log('moves', moves);
                            
                            testY--;
                            testX++;
                        } else {
                        open = false;
                        }     
                    } else {
                        // console.log('Ello World')
                        open = false;
                    }    
                } else {
                    open = false;
                }
            }
        }
    }
    return moves;
}
function rook(position) {
    let moves = [];
    const coords = stringToCoords(position);
    let x = coords[0];
    let y = coords[1];

    if (inRange(y+1)) {
        let open = true;
        let testY = y + 1;
        while (open === true) {
            if (inRange(testY)) {
                const test = coordsToString([x, testY])
                if (inspectSpace(test)) {
                    moves.push(inspectSpace(test));
                    if (inspectSpace(test).condition === 'empty') {
                        testY++;
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
    }
    if (inRange(y-1)) {
        let open = true;
        let testY = y - 1;
        while (open === true) {
            if (inRange(testY)) {
                const test = coordsToString([x, testY])
                if (inspectSpace(test)) {
                    moves.push(inspectSpace(test));
                    if (inspectSpace(test).condition === 'empty') {
                        testY--;
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
    }
    if (inRange(x+1)) {
        let open = true;
        let testX = x + 1;
        while (open === true) {
            if (inRange(testX)) {
                const test = coordsToString([testX, y])
                if (inspectSpace(test)) {
                    moves.push(inspectSpace(test));
                    if (inspectSpace(test).condition === 'empty') {
                        testX++;
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
    }
    if (inRange(x-1)) {
        let open = true;
        let testX = x - 1;
        while (open === true) {
            if (inRange(testX)) {
                const test = coordsToString([testX, y])
                if (inspectSpace(test)) {
                    moves.push(inspectSpace(test));
                    if (inspectSpace(test).condition === 'empty') {
                        testX--;
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
    }
    
         return moves;
    
}

function knight(position) {
    let moves = [];
    const coords = stringToCoords(position);
    let x = coords[0];
    let y = coords[1];
    if(inRange(y+1)) {

        if(inRange(x+2)) {
            const test = coordsToString([x+2, y+1]);
            if (inspectSpace(test)) {
                moves.push(inspectSpace(test));
            }
        }
        if(inRange(x-2)) {
            const test = coordsToString([x-2, y+1])
            if (inspectSpace(test)) {
                moves.push(inspectSpace(test));
                }   
        }
        
    }
    if(inRange(y-1)) {
        if(inRange(x-2)) {
            const test = coordsToString([x-2, y-1]);
            if (inspectSpace(test)) {
                moves.push(inspectSpace(test));
            }
        }
        if(inRange(x+2)) {
            const test = coordsToString([x+2, y-1])
            if (inspectSpace(test)) {
                moves.push(inspectSpace(test));
            }   
        }
        
    }
    if(inRange(x+1)) {
        if(inRange(y+2)) {
            const test = coordsToString([x+1, y+2]);
            if (inspectSpace(test)) {
                moves.push(inspectSpace(test));
            }
        }
        if(inRange(y-2)) {
            const test = coordsToString([x+1, y-2])
            if (inspectSpace(test)) {
                moves.push(inspectSpace(test));
            }   
        }
        
    }
    if(inRange(x-1)) {
        if(inRange(y-2)) {
            const test = coordsToString([x-1, y-2]);
            if (inspectSpace(test)) {
                moves.push(inspectSpace(test));
            }
        }
        if(inRange(y+2)) {
            const test = coordsToString([x-1, y+2])
            if (inspectSpace(test)) {
                moves.push(inspectSpace(test));
            }   
        }
        
    }
    return moves;
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

function getAllBlackMoves() {
    let enemyArray = [];
    let test = Object.keys(board);
    // console.log(test);
    for (let position of test) {
        if (board[position].color === 'black') {
            if (board[position].piece === 'queen') {
                let queenMoves = queen(position)
                for (let i = 0; i < queenMoves.length; i++) {
                    enemyArray.push(queenMoves[i].space)
                }
                // console.log('queen moves' + enemyArray + ' ')
            } 
            if (board[position].piece === 'rook') {
                let rookMoves = rook(position)
                for (let i = 0; i < rookMoves.length; i++) {
                    enemyArray.push(rookMoves[i].space)
                }
                // console.log('rook moves' + enemyArray + ' ')
            } 
            if (board[position].piece === 'bishop') {
                let bishopMoves = bishop(position)
                for (let i = 0; i < bishopMoves.length; i++) {
                    enemyArray.push(bishopMoves[i].space)
                }
                // console.log('bishop moves' + enemyArray + ' ')
            } 
            if (board[position].piece === 'knight') {
                let knightMoves = knight(position)
                for (let i = 0; i < knightMoves.length; i++) {
                    enemyArray.push(knightMoves[i].space)
                }
                // console.log('knight moves' + enemyArray + ' ')
            } 
            // having issue with pawns
            // if (board[position].piece === 'pawn') {
            //     let pawnMoves = pawn(position)
            //     for (let i = 0; i < pawnMoves.length; i++) {
            //         enemyArray.push(pawnMoves[i].space)
            //     }
            //     console.log('pawn moves' + enemyArray + ' ')
            // } 
            if (board[position].piece === 'king') {
                let kingMoves = king(position)
                for (let i = 0; i < kingMoves.length; i++) {
                    enemyArray.push(kingMoves[i].space)
                }
                // console.log('king moves' + enemyArray + ' ')
            } 
        }
    }   return enemyArray;
}
