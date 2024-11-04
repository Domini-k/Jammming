import React, {useEffect, useState} from 'react';
import styles from "./PlaylistsManager.module.css";
import PlaylistNew from "./PlaylistNew";
import UserAccountPlaylists from "./UserAccountPlaylists";
import {spotifyService} from "../services/spotifyService";
import Loader from "./styledComponents/Loader";

function PlaylistsManager({
                              addTrackToThePlaylist,
                              sendTrackOnPlaylistToMainComponent,
                              clearPlaylistAndSaveToUserProfile,
                              deactivateClearPlaylistAndSaveToUserProfileMarker,
                              activateUserPlaylistsViewer,
                              tracksOnUserPlaylist,
                              changeActivationStatusOfRenameModal,
                              playlistObjectToBeRenamed,
                              passPlaylistToBeRenamedDetailsToModal,
                              newPlaylistName,
                              clearSearchResults,
                              resetNewPlaylistName
                          }) {


    const [tracksInPlaylist, setTracksInPlaylist] = useState(tracksOnUserPlaylist ?? [])
    const [trackToRemoveFromPlaylist, setTrackToRemoveFromPlaylist] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    function getRemovedTrackFromPlaylistFromTrackChild(trackToBeRemoved) {
        setTrackToRemoveFromPlaylist(trackToBeRemoved)
    }

    useEffect(() => {
        const createPlaylist = async () => {
            const newPlaylistNameFromDOM = document.getElementById("playlistName").value
            if (!clearPlaylistAndSaveToUserProfile || !newPlaylistNameFromDOM || !tracksInPlaylist) {
                return;
            }
            try {
                setIsLoading(true);
                setError(null);
                // Call to get current user's profile id
                const currentUserProfile = await spotifyService.getUserProfile()
                // Call to create new playlist
                const response = await spotifyService.createPlaylist(currentUserProfile.id, newPlaylistNameFromDOM);
                const newPlaylistId = response.id
                // Call to add all tracks in the playlist maker view to the just created playlist
                const listOfUrisToAddToNewPlaylist = tracksInPlaylist.map(track => track.uri)
                const responseAddTracksToPlaylist = await spotifyService.addTracksToPlaylist(newPlaylistId, listOfUrisToAddToNewPlaylist)
                // Cleaning up after successfull call
                setTracksInPlaylist([])
                clearSearchResults()
                deactivateClearPlaylistAndSaveToUserProfileMarker()
            } catch (err) {
                setError('Failed to create new playlist and add tracks to it. Please try again.');
                console.error('Create playlist and tracks addition error:', err);
            } finally {
                setIsLoading(false);
            }
        };
        const timeoutId = setTimeout(() => {
            createPlaylist();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [clearPlaylistAndSaveToUserProfile]);


    useEffect(() => {
        let isTrackAlreadyPresentInPlaylist
        for (let element of tracksInPlaylist) {
            if (element.uri === addTrackToThePlaylist.uri) {
                isTrackAlreadyPresentInPlaylist = true;
                alert("Track already on the list")
            }
        }
        if (addTrackToThePlaylist && !isTrackAlreadyPresentInPlaylist) {
            setTracksInPlaylist(prevListOfTracks => [...prevListOfTracks, addTrackToThePlaylist])
        }
    }, [addTrackToThePlaylist])


    useEffect(() => {
        if (trackToRemoveFromPlaylist) {
            setTracksInPlaylist(prevState => prevState.filter(track => track.id !== trackToRemoveFromPlaylist.id))
        }
    }, [trackToRemoveFromPlaylist])


    useEffect(() => {

        sendTrackOnPlaylistToMainComponent(tracksInPlaylist)

    }, [tracksInPlaylist])


    return activateUserPlaylistsViewer ?
        (
            <UserAccountPlaylists changeActivationStatusOfRenameModal={changeActivationStatusOfRenameModal}
                                  playlistObjectToBeRenamed={playlistObjectToBeRenamed}
                                  passPlaylistToBeRenamedDetailsToModal={passPlaylistToBeRenamedDetailsToModal}
                                  newPlaylistName={newPlaylistName}
                                  resetNewPlaylistName={resetNewPlaylistName}
            />
        ) :
        (
            isLoading ?
                <Loader/> :
                <PlaylistNew listOfTrackObjectsFromResponse={tracksInPlaylist}
                             typeOfTracklist="Playlist"
                             getRemovedTrackFromPlaylistFromTrackChild={getRemovedTrackFromPlaylistFromTrackChild}/>
        )


}

export default PlaylistsManager