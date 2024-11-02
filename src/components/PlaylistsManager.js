import React, {useEffect, useState} from 'react';
import styles from "./PlaylistsManager.module.css";
import Playlist_new from "./Playlist_new";
import UserAccountPlaylists from "./UserAccountPlaylists";

function PlaylistsManager({
                              addTrackToThePlaylist,
                              sendTrackOnPlaylistToMainComponent,
                              clearPlaylistAndSaveToUserProfile,
                              deativateClearPlaylistAndSaveToUserProfileMarker,
                              activateUserPlaylistsViewer,
                              tracksOnUserPlaylist
                          }) {

    const [tracksInPlaylist, setTracksInPlaylist] = useState(tracksOnUserPlaylist ?? [])
    const [playlistName, setPlaylistName] = useState('')
    const [trackToRemoveFromPlaylist, setTrackToRemoveFromPlaylist] = useState()

    function getRemovedTrackFromPlaylistFromTrackChild(trackToBeRemoved) {
        setTrackToRemoveFromPlaylist(trackToBeRemoved)
    }

    function savePlaylistToUserProfile(playlistName, tracksInPlaylist) {
//        Temporary solution with mockup values to get uri Array
        console.log(tracksInPlaylist.map(track => track.uri))
    }

    useEffect(() => {
        if (clearPlaylistAndSaveToUserProfile) {
            setPlaylistName(document.getElementById("playlistName").value)
            savePlaylistToUserProfile(playlistName, tracksInPlaylist)
            setTracksInPlaylist([])
            deativateClearPlaylistAndSaveToUserProfileMarker()
        }
    }, [clearPlaylistAndSaveToUserProfile])

    useEffect(() => {
//        console.log("Add track - " + addTrackToThePlaylist)
//        console.log("Is it already on the list? - " + tracksInPlaylist.includes(addTrackToThePlaylist))
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


    // console.log(activateUserPlaylistsViewer)


    return activateUserPlaylistsViewer ? (<UserAccountPlaylists/>) : (
        <Playlist_new listOfTrackObjectsFromResponse={tracksInPlaylist} typeOfTracklist="Playlist"
                      getRemovedTrackFromPlaylistFromTrackChild={getRemovedTrackFromPlaylistFromTrackChild}/>)


}

export default PlaylistsManager