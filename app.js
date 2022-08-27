let positions = {
    
    11: {
        color: 'white',
        piece: 'rook',
        image: 'wr'
        },
    21:  {
        color: 'white',
        piece: 'knight',
        image: 'wn'
        },
    31:  {
        color: 'white',
        piece: 'bishop',
        image: 'wb'
        },
    41:  {
        color: 'white',
        piece: 'queen',
        image: 'wq'
        },
    51:  {
        color: 'white',
        piece: 'king',
        image: 'wk'
        },
    61:  {
        color: 'white',
        piece: 'bishop',
        image: 'wb'
        },
    71: {
        color: 'white',
        piece: 'knight',
        image: 'wn'
        },
    81: {
        color: 'white',
        piece: 'rook',
        image: 'wr'
        },
    12: {
        color: 'white',
        piece: 'pawn',
        image: 'wp'
        },
    22:  {
        color: 'white',
        piece: 'pawn',
        image: 'wp'
        },
    32:  {
        color: 'white',
        piece: 'pawn',
        image: 'wp'
        },
    42:  {
        color: 'white',
        piece: 'pawn',
        image: 'wp'
        },
    52:  {
        color: 'white',
        piece: 'pawn',
        image: 'wp'
        },
    62:  {
        color: 'white',
        piece: 'pawn',
        image: 'wp'
        },
    72:  {
        color: 'white',
        piece: 'pawn',
        image: 'wp'
        },
    82:  {
        color: 'white',
        piece: 'pawn',
        image: 'wp'
        },
    13: false,
    23: false,
    33: false,
    43: false,
    53: false,
    63: false,
    73: false,
    83: false,
    14: false,
    24: false,
    34: false,
    44: false,
    54: false,
    64: false,
    74: false,
    84: false,
    15: false,
    25: false,
    35: false,
    45: false,
    55: false,
    65: false,
    75: false,
    85: false,
    16: false,
    26: false,
    36: false,
    46: false,
    56: false,
    66: false,
    76: false,
    86: false,
    17:  {
        color: 'black',
        piece: 'pawn',
        image: 'bp'
        },
    27:  {
        color: 'black',
        piece: 'pawn',
        image: 'bp'
        },
    37:  {
        color: 'black',
        piece: 'pawn',
        image: 'bp'
        },
    47:  {
        color: 'black',
        piece: 'pawn',
        image: 'bp'
        },
    57:  {
        color: 'black',
        piece: 'pawn',
        image: 'bp'
        },
    67:  {
        color: 'black',
        piece: 'pawn',
        image: 'bp'
        },
    77:  {
        color: 'black',
        piece: 'pawn',
        image: 'bp'
        },
    87:  {
        color: 'black',
        piece: 'pawn',
        image: 'bp'
        },
    18:  {
        color: 'black',
        piece: 'rook',
        image: 'br'
        },
    28:  {
        color: 'black',
        piece: 'knight',
        image: 'bn'
        },
    38:  {
        color: 'black',
        piece: 'bishop',
        image: 'bb'
        },
    48:  {
        color: 'black',
        piece: 'queen',
        image: 'bq'
        },
    58:  { 
        color: 'black',
        piece: 'king',
        image: 'bk'
        },
    68:  {
        color: 'black',
        piece: 'bishop',
        image: 'bb'
        },
    78:  {
        color: 'black',
        piece: 'knight',
        image: 'bn'
        },
    88:  {
        color: 'black',
        piece: 'rook',
        image: 'br'
        } 
}


let whiteCaptured = [];
let blackCaptured = [];

let currentPlayer = 'white';


displayBoard()


function displayBoard() {
    let white = true;
    let counter = 0;
    for (const position in positions) {
        console.log(position);
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


        if (positions[position]) {
            newPosition.textContent = `${positions[position].image}`;
            if (positions[position].color === currentPlayer) {
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
            if (positions[position].piece === 'pawn') {
                displayBoard();
                const moves = pawn(position);
                for (let move of moves) {
                    if (move.condition === 'empty') {
                        moveButton(position, move.space);
                    }
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
        const savePiece = positions[currentPosition];
        positions[currentPosition] = false;
        positions[targetPosition] = savePiece;
        changePlayer();
        displayBoard();
    })
}

function attackButton(currentPosition, targetPosition) {
    const targetPositionEl = document.getElementById(targetPosition);
    targetPositionEl.textContent = `x${positions[targetPosition].image}`;
    targetPositionEl.addEventListener('click', () => {
        const savePiece = positions[targetPosition];
        if (savePiece.color === 'white') {
            whiteCaptured.push(savePiece);
        } else {
            blackCaptured.push(savePiece);
        }
        positions[targetPosition] = positions[currentPosition];
        positions[currentPosition] = false;
        changePlayer();
        displayBoard();
    })
}
    
// function displayMoves(moves)

function pawn(position) {
    let moves = [];

    const coords = stringToCoords(position);
    let x = Number(coords[0]);
    let y = Number(coords[1]);
    
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
                console.log('left attack in range');
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
    return string.split('');
}

function coordsToString(coords) {
    return coords.join('');
}

function inspectSpace(space) {
    if (!positions[space]) {
        return {'space': space, condition: 'empty'}
    } else if (positions[space].color !== currentPlayer) {
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
