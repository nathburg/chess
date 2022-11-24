import {
	startNewGame,
	getUser,
	getGames,
	signOutUser,
	checkAuth,
} from '../fetch-utils.js';
import { renderGame } from '../render-utils.js';

checkAuth();

const form = document.getElementById('new-game-form');
const gamesList = document.getElementById('past-games-el');
const signOut = document.getElementById('sign-out');
const getNames = document.getElementById('names-btn');

signOut.addEventListener('click', async () => {
	await signOutUser();
});

const user = getUser();

displayUserGames();

form.addEventListener('submit', async (e) => {
	e.preventDefault();

	const data = new FormData(form);

	const playerOneName = data.get('player-one-name');
	const playerTwoName = data.get('player-two-name');

	const gameData = await startNewGame(playerOneName, playerTwoName);
	const gameIdCont = gameData.data.id;
	await displayUserGames();
	window.location.replace(`../?id=${gameIdCont}`);

	// form.reset();
});

async function displayUserGames() {
	gamesList.textContent = '';
	const games = await getGames();
	for (let game of games) {
		const gamesDiv = renderGame(game, user);
		const gameButton = gamesDiv.children[3];
		if (gameButton.textContent === 'Resume Game') {
			gameButton.addEventListener('click', () => {
				console.log('resume clicked');
			});
		} else {
			gameButton.addEventListener('click', () => {
				console.log('view clicked');
			});
		}
		gamesList.append(gamesDiv);
	}
}

// getNames.addEventListener('click', async () => {
//     const games = await getGames();
//     for (let game of games) {
//     const response = await getPlayerNames(user.id);
//     console.log(response);
//     }
// })
