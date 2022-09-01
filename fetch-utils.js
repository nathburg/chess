const SUPABASE_URL = 'https://jfjbgzuahxgxuzhpbvjy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmamJnenVhaHhneHV6aHBidmp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTk3MjEyNDQsImV4cCI6MTk3NTI5NzI0NH0.ALTank2v_SVyJvJfAF_p6loMLpa5JT8KDW0EllJpk5Q';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
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
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Helper for logging errors */

function checkError({ data, error }) {
    // eslint-disable-next-line no-console
    return error ? console.error(error) : data;
}

/////////

// export async function addGame(game) {
//     const response = await client.from('games').insert({ game_name: game });
//     console.log(response);
// }

export async function startNewGame(player1, player2) {
    const response = await client.from('games').insert({ player_one_name: player1, player_two_name: player2 });
    return response;
}

export async function getGameId() {
    const response = client.from('games').select(id);
    return response;
}

export async function getGames() {
    const response = await client.from('games').select('*');
    return response.data;
}

export async function getPlayerNames(id) {
    const response = await client.from('games').select({ player_one_name, player_two_name }).match({user_id: id});
    return response.data;
}

export async function saveGame(id, boardState) {
    const response = await client.from('games').upsert({ board_state: boardState }).match({ user_id: id }).single();

    return response.data;
}
