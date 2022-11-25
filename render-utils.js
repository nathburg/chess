export function renderGame(game) {
	const gamesDiv = document.createElement('div');
	const playerOneNameEl = document.createElement('p');
	const playerTwoNameEl = document.createElement('p');
	const gameEl = document.createElement('p');
	const resumeGameBtn = document.createElement('a');
	const deleteGameBtn = document.createElement('a');

	playerOneNameEl.textContent = `Player 1: ${game.player_one_name}`;
	playerTwoNameEl.textContent = `Player 2: ${game.player_two_name}`;
	gameEl.textContent = '';
	resumeGameBtn.textContent = 'Resume Game';
	resumeGameBtn.href = `../?id=${game.id}`;
	resumeGameBtn.classList.add('link-button');
	deleteGameBtn.textContent = 'Delete Game';
	deleteGameBtn.classList.add('link-button', 'red');

	gamesDiv.append(
		playerOneNameEl,
		playerTwoNameEl,
		gameEl,
		resumeGameBtn,
		deleteGameBtn
	);

	return gamesDiv;
}

export function renderPlayerNames(game, user) {}

export function renderPiece(piece) {
	const pieceEl = document.createElement('p');
	pieceEl.textContent = piece.image;
	return pieceEl;
}
