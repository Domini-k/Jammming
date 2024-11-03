import React, {useEffect, useState} from 'react';
import styles from '../api/SpotifyApiIntegration.module.css';
import LoginButton from "../styledComponents/LoginButton";
import {spotifyAuth} from "../../api/spotifyAuth";
import Loader from "../styledComponents/Loader";
import StatusBox from "../styledComponents/StatusBox";

//TODO - handle authentication error when user doesn't allow spotify to access the data when prompted


function SpotifyApiIntegration({
                                   spotifyAuthStatusSetter,
                                   userClickedAuthButton,
                                   setAuthTokenWhenObtainedInMainComponent
                               }) {

    const [authToken, setAuthToken] = useState(localStorage.getItem('spotify_token'));
    const [authTokenExpirationTime, setAuthTokenExpirationTime] = useState(localStorage.getItem('spotify_token_expiration'));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isTokenExpired, setIsTokenExpired] = useState(!spotifyAuth.isTokenValid(authTokenExpirationTime));

    const handleTokenFromUrl = () => {
        try {
            const authResponse = spotifyAuth.getTokenFromUrl()
            // const token = spotifyAuth.getTokenFromUrl();
            if (authResponse && authResponse.token && authResponse.expirationTime) {

                console.log("Token obtained successfully");
                setAuthToken(authResponse.token);
                localStorage.setItem('spotify_token', authResponse.token);

                console.log("Token expiry date obtained successfully");
                setAuthTokenExpirationTime(authResponse.expirationTime.toString())
                localStorage.setItem('spotify_token_expiration', authResponse.expirationTime.toString());

                spotifyAuthStatusSetter(true);
                // Clean URL using replaceState to avoid refresh
                window.history.replaceState({}, document.title, window.location.pathname);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error processing token:", error);
            setError("Failed to process authentication token");
            return false;
        }
    };

    // Handle initial login
    const performLoginToSpotify = async () => {
        try {
            setLoading(true);
            await spotifyAuth.login();
        } catch (error) {
            console.error("Login failed:", error);
            setError("Failed to initialize Spotify login");
            setLoading(false);
        }
    };


    useEffect(() => {
        // Check if we're returning from Spotify auth
        if (window.location.hash) {
            setLoading(true);
            const success = handleTokenFromUrl();
            if (!success) {
                setError("No valid token found in URL");
            }
            setLoading(false);
        }
        // Handle initial state
        else if ((!authToken || isTokenExpired) && userClickedAuthButton) {
            console.log("Auth is required");
            performLoginToSpotify();
        } else if ((!authToken || isTokenExpired) && !userClickedAuthButton) {
            console.log("Connection not established, user needs to click the button");
            spotifyAuthStatusSetter(false);
            setLoading(false);
        } else {
            // console.log("Connection already established");
            spotifyAuthStatusSetter(true);
            setLoading(false);
        }
    }, [userClickedAuthButton]); // Only depend on userClickedAuthButton

    // Validate token when it changes
    useEffect(() => {
        if (authToken && spotifyAuth.isTokenValid(authTokenExpirationTime)) {
            spotifyAuthStatusSetter(true);
            setAuthTokenWhenObtainedInMainComponent(authToken, authTokenExpirationTime)
            // console.log("Token Valid and not expired")
        }
    }, [authToken, authTokenExpirationTime]);


    return (
        <div className={styles.spotifySectionWrapper}>
            {loading ? <Loader/> : <StatusBox/>}
        </div>
    )

}

export default SpotifyApiIntegration;