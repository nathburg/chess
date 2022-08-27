let positions = {
    
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


function displayBoard() {
    let white = true;
    let counter = 0;
    for (const position in positions) {
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

console.log(stringToCoords('f7'));

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
