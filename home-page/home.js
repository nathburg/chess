import { startNewGame, getUser, getGames, signOutUser, getPlayerNames } from "../fetch-utils.js";
import { renderGame } from "../render-utils.js";

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

    await startNewGame(playerOneName, playerTwoName);
    // gameId = response.data.id;
    
    await displayUserGames();

    window.location.replace('../');
    
    form.reset();
});

async function displayUserGames() {
    gamesList.textContent = '';
    const games = await getGames();
    for (let game of games) {
        const gamesDiv = renderGame(game, user);
        gamesList.append(gamesDiv);
    }
}

getNames.addEventListener('click', async () => {
    const games = await getGames();
    for (let game of games) {
    const response = await getPlayerNames(user.id);
    console.log(response);
    }
})


