export function renderGame(game, user) {
    const gamesDiv = document.createElement('div');
    const playerOneNameEl = document.createElement('div');
    const playerTwoNameEl = document.createElement('div');
    const gameEl = document.createElement('div');
    const resumeGameBtn = document.createElement('button');
    const viewGameBtn = document.createElement('button');
    playerOneNameEl.textContent = game.player_one_name;
    playerTwoNameEl.textContent = game.player_two_name;
    gameEl.textContent = ''; 
    resumeGameBtn.textContent = 'Resume Game';
    viewGameBtn.textContent = 'View Game';
    if (user.id === game.user_id) {
        gamesDiv.append(playerOneNameEl, playerTwoNameEl, gameEl, resumeGameBtn);
    } else {
        gamesDiv.append(playerOneNameEl, playerTwoNameEl, gameEl, viewGameBtn);
    }
    
    return gamesDiv;
}