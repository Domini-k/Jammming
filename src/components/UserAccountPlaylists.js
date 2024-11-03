import React, {useEffect, useState} from 'react';
import styles from "./UserAccountPlaylists.module.css";
import Tracklist from "./Tracklist";
import Loader from "./styledComponents/Loader";
import {spotifyService} from "../services/spotifyService";

function UserAccountPlaylists({
                                  changeActivationStatusOfRenameModal,
                                  playlistObjectToBeRenamed,
                                  passPlaylistToBeRenamedDetailsToModal,
                                  newPlaylistName
                              }) {
    // Place for API call to get list of playlists from user profile
    const [listOfUserPlaylists, setListOfUserPlaylists] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const getPlaylists = async () => {
            if (listOfUserPlaylists) {
                return;
            }
            try {
                setIsLoading(true);
                setError(null);
                // Call for list of current user's playlist
                const response = await spotifyService.getUserPlaylists();
                setListOfUserPlaylists(response.items);
            } catch (err) {
                setError('Failed to fetch tracks. Please try again.');
                console.error('Search tracks error:', err);
            } finally {
                setIsLoading(false);
            }
        };
        const timeoutId = setTimeout(() => {
            getPlaylists();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [listOfUserPlaylists])

    useEffect(() => {
        // RENAME THE PLAYLIST FUNCTIONALITY
        if (playlistObjectToBeRenamed && newPlaylistName && listOfUserPlaylists) {
            let listOfUserPlaylistsAfterRenaming = listOfUserPlaylists.toSpliced(listOfUserPlaylists.length)
            for (const playlistObject of listOfUserPlaylistsAfterRenaming) {
                if ((playlistObject.id === playlistObjectToBeRenamed.id) && (playlistObject.uri === playlistObjectToBeRenamed.uri)) {
                    playlistObject.name = newPlaylistName
                }
            }
            setListOfUserPlaylists(listOfUserPlaylistsAfterRenaming)
        }
    }, [playlistObjectToBeRenamed]);

    if (isLoading) {
        return <Loader/>
    }
    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <Tracklist listOfPlaylistsFromResponse={listOfUserPlaylists}
                   typeOfTracklist={"listOfPlaylists"}
                   changeActivationStatusOfRenameModal={changeActivationStatusOfRenameModal}
                   passPlaylistToBeRenamedDetailsToModal={passPlaylistToBeRenamedDetailsToModal}
        />
    )
}

export default UserAccountPlaylists