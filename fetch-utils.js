
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jfjbgzuahxgxuzhpbvjy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmamJnenVhaHhneHV6aHBidmp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTk3MjEyNDQsImV4cCI6MTk3NTI5NzI0NH0.ALTank2v_SVyJvJfAF_p6loMLpa5JT8KDW0EllJpk5Q';

const supabase = createClient(supabaseUrl, supabaseKey)

// const SUPABASE_URL = 'https://jfjbgzuahxgxuzhpbvjy.supabase.co';
// const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmamJnenVhaHhneHV6aHBidmp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTk3MjEyNDQsImV4cCI6MTk3NTI5NzI0NH0.ALTank2v_SVyJvJfAF_p6loMLpa5JT8KDW0EllJpk5Q';

// const client = supabase.createClient(supabaseUrl, supabaseKey);

/* Auth related functions */

export async function getUser() {
  const user = await supabase.auth.getUser();
  return user;
}

export function checkAuth() {
    const user = getUser();
    if (!user)
        location.replace(
            `/auth/?redirectUrl=${encodeURIComponent(location)}`
        );
    return user;
}

export async function signUpUser(email, password) {
    return await supabase.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await supabase.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await supabase.auth.signOut();
}

/* Helper for logging errors */

function checkError({ data, error }) {
    // eslint-disable-next-line no-console
    return error ? console.error(error) : data;
}

/////////

// export async function addGame(game) {
//     const response = await supabase.from('games').insert({ game_name: game });
//     console.log(response);
// }

export async function startNewGame(player1, player2) {
    const response = await supabase.from('games').insert({ player_one_name: player1, player_two_name: player2, black_captured: [], white_captured: [] }).single();
    return response;
}

export async function getGameId() {
    const response = supabase.from('games').select('*').single();
    return response.data.id;
}

export async function getGames() {
    const response = await supabase.from('games').select('*');
    return response.data;
}

export async function getGameById(id) {
    const response = await supabase.from('games').select('*').match({ id }).single();
    return response.data;
}

export async function getBoardStateById(id) {
    const response  =  await supabase.from('games').select('*').match({ id }).single();
    // console.log(response.data.board_state);
    // const json = await JSON.parse(response.data.board_state);
    return response.data.board_state;
}



export async function saveGame(id, boardState, blackCaptured, whiteCaptured) {
    const response = await supabase.from('games').update({ board_state: boardState, black_captured: blackCaptured, white_captured: whiteCaptured }).match({ id: id }).single();
    console.log(response);
    return response.data;
}

export async function getWhiteCaptured(id) {
    const response = await supabase.from('games').select('*').match({ id }).single();
    return response.data.white_captured;

}

export async function getBlackCaptured(id) {
    const response = await supabase.from('games').select('*').match({ id }).single();
    return response.data.black_captured;

}


