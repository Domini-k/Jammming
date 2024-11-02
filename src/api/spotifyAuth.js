export const spotifyAuth = {
    async login() {
        const client_id = "307a5966baa344daa3c416c8c5f46b24";
        const redirect_uri = "http://localhost:3000/";
        const scope = 'user-read-private playlist-modify-public playlist-modify-private user-read-email';
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

        return hash.access_token;
    },

    logout() {
        // Logout logic
        localStorage.removeItem('spotify_token');
        // Additional cleanup
    }
};