let positions = {
    '11': 'wr',
    '21': 'wn',
    '31': 'wb',
    '41': 'wq',
    '51': 'wk',
    '61': 'wb',
    '71': 'wn',
    '81': 'wr',
    '12': 'wp',
    '22': 'wp',
    '32': 'wp',
    '42': 'wp',
    '52': 'wp',
    '62': 'wp',
    '72': 'wp',
    '82': 'wp',
    '13': '',
    '23': '',
    '33': '',
    '43': '',
    '53': '',
    '63': '',
    '73': '',
    '83': '',
    '14': '',
    '24': '',
    '34': '',
    '44': '',
    '54': '',
    '64': '',
    '74': '',
    '84': '',
    '15': '',
    '25': '',
    '35': '',
    '45': '',
    '55': '',
    '65': '',
    '75': '',
    '85': '',
    '16': '',
    '26': '',
    '36': '',
    '46': '',
    '56': '',
    '66': '',
    '76': '',
    '86': '',
    '17': 'bp',
    '27': 'bp',
    '37': 'bp',
    '47': 'bp',
    '57': 'bp',
    '67': 'bp',
    '77': 'bp',
    '87': 'bp',
    '18': 'br',
    '28': 'bn',
    '38': 'bb',
    '48': 'bq',
    '58': 'bk',
    '68': 'bb',
    '78': 'bn',
    '88': 'br' 
}

let whiteTurn = true;



displayBoard()


function displayBoard() {
    for (const position in positions) {
        const newPosition = document.getElementById(`${position}`);
        newPosition.textContent = `${positions[position]}`;
        renderSquare(position);
    }
}

function renderSquare(position) {
    const positionEl = document.getElementById(`${position}`);
    if (positionEl.textContent) {
        positionEl.addEventListener('click', () => {
            const coords = position.split('');
            const piece = positions[position].split('');
            if (whiteTurn && piece[0] === 'w') {
                if (piece[1] === 'p') {
                    const pawnMoves = pawn(coords);
                    for (let move of pawnMoves) {
                        const moveEl = document.getElementById(`${move}`);
                        moveEl.textContent = 'x';
                        console.log(pawnMoves)
                    }
                }
            }    
        });
    }
}

function pawn(coords) {
    let moves = [];
    let x = Number(coords[0]);
    let y = Number(coords[1]);

    const potential = [`${x}`, `${y+1}`];
    const potentialString = potential.join('');
    
    if  (!positions[potentialString]) {
        moves.push(potentialString)
        if (coords[1] === '2' && !positions[`${x}`, `${y+2}}`]) {
            const newMove = [`${x}`, `${y+2}`];
            moves.push(newMove.join(''));
        }
    }

    return moves;
}   

