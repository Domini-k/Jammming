export const spotifyAuth = {
    async login() {
        const client_id = "307a5966baa344daa3c416c8c5f46b24";
        const redirect_uri = "http://localhost:3000/";
        const scope = 'user-read-private playlist-modify-public playlist-modify-private user-read-email playlist-read-private';
        const state = window.crypto.randomUUID().toString().substring(0, 15);
        let url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        url += '&state=' + encodeURIComponent(state);
        window.location.href = url;
    },

    getTokenFromUrl() {
        const hash = window.location.hash
            .substring(1)
            .split('&')
            .reduce((initial, item) => {
                const parts = item.split('=');
                initial[parts[0]] = decodeURIComponent(parts[1]);
                return initial;
            }, {});
        const token = hash.access_token;
        const expiresIn = hash.expires_in ? parseInt(hash.expires_in) : 3600; // Default 1 hour if not provided
        console.log(expiresIn)
        if (token) {
            // Store both token and its expiration timestamp
            const expirationTime = Date.now() + (expiresIn * 1000);
            return {
                token,
                expirationTime
            };
        }
        return null;
    },
    isTokenValid(expirationTime) {
        if (!expirationTime) return false;
        // Add a 60-second buffer to prevent edge cases
        // console.log("Date now -> " + new Date(Date.now()).toString())
        // console.log("expirationTime -> " + new Date((expirationTime - 60000)).toString())
        // console.log("Current time - Time left of the token -> " + Math.floor(((expirationTime - 60000) - (Date.now())) / (60000)).toString() + " min.")
        return Date.now() < (expirationTime - 60000);
    },

    logout() {
        localStorage.removeItem('spotify_token');
        localStorage.removeItem('spotify_token_expiration');
    }
};