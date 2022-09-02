import { startNewGame, getUser, getGames, signOutUser } from "../fetch-utils.js";
import { renderGame } from "../render-utils.js";

const form = document.getElementById('new-game-form');
const gamesList = document.getElementById('past-games-el');
const signOut = document.getElementById('sign-out');

signOut.addEventListener('click', async () => {
    await signOutUser();
})


const user = getUser();
displayUserGames();

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = new FormData(form);
 
    const playerOneName = data.get('player-one-name');
    const playerTwoName = data.get('player-two-name');

    await startNewGame(playerOneName, playerTwoName);
    
    await displayUserGames();

    window.location.replace('../');
    
    form.reset();
})

async function displayUserGames() {
    gamesList.textContent = '';
    const games = await getGames();
    for (let game of games) {
        const gamesDiv = renderGame(game, user);
        gamesList.append(gamesDiv);
    }
}


