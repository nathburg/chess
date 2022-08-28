let board = {
    
    a1: {
        color: 'white',
        piece: 'rook',
        image: 'wr'
        },
    b1:  {
        color: 'white',
        piece: 'knight',
        image: 'wn'
        },
    c1:  {
        color: 'white',
        piece: 'bishop',
        image: 'wb'
        },
    d1:  {
        color: 'white',
        piece: 'queen',
        image: 'wq'
        },
    e1:  {
        color: 'white',
        piece: 'king',
        image: 'wk'
        },
    f1:  {
        color: 'white',
        piece: 'bishop',
        image: 'wb'
        },
    g1: {
        color: 'white',
        piece: 'knight',
        image: 'wn'
        },
    h1: {
        color: 'white',
        piece: 'rook',
        image: 'wr'
        },
    a2: {
        color: 'white',
        piece: 'pawn',
        image: 'wp'
        },
    b2:  {
        color: 'white',
        piece: 'pawn',
        image: 'wp'
        },
    c2:  {
        color: 'white',
        piece: 'pawn',
        image: 'wp'
        },
    d2:  {
        color: 'white',
        piece: 'pawn',
        image: 'wp'
        },
    e2:  {
        color: 'white',
        piece: 'pawn',
        image: 'wp'
        },
    f2:  {
        color: 'white',
        piece: 'pawn',
        image: 'wp'
        },
    g2:  {
        color: 'white',
        piece: 'pawn',
        image: 'wp'
        },
    h2:  {
        color: 'white',
        piece: 'pawn',
        image: 'wp'
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
        image: '♟️'
        },
    c7:  {
        color: 'black',
        piece: 'pawn',
        image: 'bp'
        },
    d7:  {
        color: 'black',
        piece: 'pawn',
        image: 'bp'
        },
    e7:  {
        color: 'black',
        piece: 'pawn',
        image: 'bp'
        },
    f7:  {
        color: 'black',
        piece: 'pawn',
        image: 'bp'
        },
    g7:  {
        color: 'black',
        piece: 'pawn',
        image: 'bp'
        },
    h7:  {
        color: 'black',
        piece: 'pawn',
        image: 'bp'
        },
    a8:  {
        color: 'black',
        piece: 'rook',
        image: 'br'
        },
    b8:  {
        color: 'black',
        piece: 'knight',
        image: 'bn'
        },
    c8:  {
        color: 'black',
        piece: 'bishop',
        image: 'bb'
        },
    d8:  {
        color: 'black',
        piece: 'queen',
        image: 'bq'
        },
    e8:  { 
        color: 'black',
        piece: 'king',
        image: 'bk'
        },
    f8:  {
        color: 'black',
        piece: 'bishop',
        image: 'bb'
        },
    g8:  {
        color: 'black',
        piece: 'knight',
        image: 'bn'
        },
    h8:  {
        color: 'black',
        piece: 'rook',
        image: 'br'
        } 
}


let whiteCaptured = [];
let blackCaptured = [];

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
            // if the piece is a pawn
            if (board[position].piece === 'pawn') {
                // refresh the board
                displayBoard();
                // get the positions the pawn functions determines are viable moves
                const moves = pawn(position);
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
    })
}
    
// function displayMoves(moves)

function pawn(position) {
    let moves = [];

    const coords = stringToCoords(position);
    let x = coords[0];
    let y = coords[1];
    
    //white pawn
    if (currentPlayer === 'white') {
        if (inRange(y+1)) {
            //attack
            if (inRange(x-1)) {
                const test = coordsToString([x-1, y+1]);
                if (inspectSpace(test).condition === 'enemy') {
                    moves.push(inspectSpace(test));
                }
            }
            if (inRange(x+1)) {
                const test = coordsToString([x+1, y+1]);
                if (inspectSpace(test).condition === 'enemy') {
                    moves.push(inspectSpace(test));
                }
            }
            //move one space
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
                if (inspectSpace(test).condition === 'enemy') {
                    moves.push(inspectSpace(test));
                }
            }
            if (inRange(x+1)) {
                const test = coordsToString([x+1, y-1]);
                if (inspectSpace(test).condition === 'enemy') {
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
    if (moves === []) {
        alert('That piece can\'t move right now.');
    } else {
        return moves;
    }
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
    console.log(letterArray.indexOf('h'))
    console.log(letterArray.indexOf(splitString[0]))
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
