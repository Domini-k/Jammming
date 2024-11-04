import React, {useEffect, useState} from 'react';
import styles from "./UserAccountPlaylists.module.css";
import Tracklist from "./Tracklist";
import Loader from "./styledComponents/Loader";
import {spotifyService} from "../services/spotifyService";

function UserAccountPlaylists({
                                  changeActivationStatusOfRenameModal,
                                  playlistObjectToBeRenamed,
                                  passPlaylistToBeRenamedDetailsToModal,
                                  newPlaylistName,
                                  resetNewPlaylistName
                              }) {
    // Place for API call to get list of playlists from user profile
    const [listOfUserPlaylists, setListOfUserPlaylists] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const getPlaylists = async () => {
            try {
                if (listOfUserPlaylists) {
                    return;
                }
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
            const renamePlaylist = async () => {
                if ((playlistObjectToBeRenamed.name===newPlaylistName)) {
                    return;
                }
                try {
                    setIsLoading(true);
                    setError(null);
                    // Call for list of current user's playlist
                    // console.log("Old playlist name -> "+playlistObjectToBeRenamed.name);
                    // console.log("New Playlist name -> "+newPlaylistName);
                    await spotifyService.updatePlaylistDetails(playlistObjectToBeRenamed.id,newPlaylistName);
                    // Update the local state to reflect the new playlist name
                    setListOfUserPlaylists((prevPlaylists) =>
                        prevPlaylists.map((playlist) =>
                            playlist.id === playlistObjectToBeRenamed.id
                                ? { ...playlist, name: newPlaylistName }
                                : playlist
                        )
                    );
                    resetNewPlaylistName(null);
                    // setListOfUserPlaylists(null);
                    // Delay the re-fetching to allow the API to update
                    setTimeout(() => {
                        setListOfUserPlaylists(null);
                    }, 10000); // Re-fetch after 10 seconds

                } catch (err) {
                    setError('Failed to rename playlist. Please try again.');
                    console.error('Renaming error:', err);
                } finally {
                    setIsLoading(false);
                }
            };
            const timeoutId = setTimeout(() => {
                renamePlaylist();
            }, 300);

            return () => clearTimeout(timeoutId);
        }
    }, [playlistObjectToBeRenamed,newPlaylistName ]);





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