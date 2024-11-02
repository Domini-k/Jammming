import {useState, useEffect} from 'react';
import {spotifyAuth} from './spotifyAuth';

export const useSpotifyAuth = () => {
    const [token, setToken] = useState(() => {
        // Initialize from localStorage if available
        return localStorage.getItem('spotify_token');
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check URL for token on component mount
        const token = spotifyAuth.getTokenFromUrl();
        if (token) {
            setToken(token);
            localStorage.setItem('spotify_token', token);
            // Clean URL
            window.location.hash = '';
        }
        setLoading(false);
    }, []);

    function logoutHandler() {
        setLoading(true);
        spotifyAuth.logout()
        setToken(localStorage.getItem('spotify_token'))
        setLoading(false);
    }

    return {
        token,
        loading,
        login: spotifyAuth.login,
        logout: logoutHandler
    };
};