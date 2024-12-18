class SpotifyService {
    constructor(baseUrl = 'https://api.spotify.com/v1') {
        this.baseUrl = baseUrl;
    }

    // Helper method to get headers with auth token
    getHeaders() {
        const token = localStorage.getItem('spotify_token');
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    }

    // Helper method for making API requests
    async makeRequest(endpoint, options = {}) {
        try {
            if (!localStorage.getItem('spotify_token')) {
                throw new Error('Connection with Spotify is not established');
            }
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                ...options,
                headers: this.getHeaders()
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Check if the response has content
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            } else {
                // No content to parse
                return null;
            }
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Search tracks
    async searchTracks(query, limit = 20) {
        return await this.makeRequest(
            `/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`
        );
    }

    // Get user's playlists
    async getUserPlaylists(limit = 50) {
        return await this.makeRequest('/me/playlists');
    }

    // Get current user's Profile
    async getUserProfile() {
        return await this.makeRequest('/me');
    }

    // Create a playlist
    async createPlaylist(userId, name, description = '', isPublic = true) {
        return await this.makeRequest(
            `/users/${userId}/playlists`,
            {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    description,
                    public: isPublic
                })
            }
        );
    }

    // Add tracks to playlist
    async addTracksToPlaylist(playlistId, uris) {
        return await this.makeRequest(
            `/playlists/${playlistId}/tracks`,
            {
                method: 'POST',
                body: JSON.stringify({
                    uris
                })
            }
        );
    }

    // Remove tracks from playlist
    async removeTracksFromPlaylist(playlistId, uris) {
        return await this.makeRequest(
            `/playlists/${playlistId}/tracks`,
            {
                method: 'DELETE',
                body: JSON.stringify({
                    tracks: uris.map(uri => ({uri}))
                })
            }
        );
    }

    // Update playlist details
    // PlaylistID to be updated
    // name to which this playlist's name should be changed
    // same for desc.
    async updatePlaylistDetails(playlistId, name, description = '') {
        return await this.makeRequest(
            `/playlists/${playlistId}`,
            {
                method: 'PUT',
                body: JSON.stringify({
                    name,
                    description
                })
            }
        );
    }
}

export const spotifyService = new SpotifyService();