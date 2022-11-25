import {
	startNewGame,
	getUser,
	getGames,
	signOutUser,
	checkAuth,
	deleteGameById,
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
	console.log(gameData);
	const gameIdCont = gameData.data.id;
	await displayUserGames();
	window.location.replace(`../?id=${gameIdCont}`);

	// form.reset();
});

export async function displayUserGames() {
	gamesList.textContent = '';
	const games = await getGames();
	for (let game of games) {
		const gamesDiv = renderGame(game);
		console.log(gamesDiv.children);
		const deleteButton = gamesDiv.children[4];
		deleteButton.addEventListener('click', async () => {
			const resp = await deleteGameById(game.id);
			if (!resp.error) {
				displayUserGames();
			}
		});
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
