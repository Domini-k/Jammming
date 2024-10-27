import React, {useEffect, useState} from 'react';
import Tracklist from './Tracklist'
import styles from "./Playlist.module.css";

function Playlist({
                      addTrackToThePlaylist/*,
                    getRemovedTrackFromPlaylistFromTrackChild*/
                  }) {

    const [tracksInPlaylist, setTracksInPlaylist] = useState([])
    const [playlistName, setPlaylistName] = useState('')
    const [trackToRemoveFromPlaylist, setTrackToRemoveFromPlaylist] = useState()

    function getRemovedTrackFromPlaylistFromTrackChild(trackToBeRemoved) {
        setTrackToRemoveFromPlaylist(trackToBeRemoved)
    }

    useEffect(() => {
        if (addTrackToThePlaylist) {
            setTracksInPlaylist(prevListOfTracks => [...prevListOfTracks, addTrackToThePlaylist])
        }
    }, [addTrackToThePlaylist])


    useEffect(() => {
        if (trackToRemoveFromPlaylist) {
            setTracksInPlaylist(prevState => prevState.filter(track => track.id !== trackToRemoveFromPlaylist.id))
        }
    }, [trackToRemoveFromPlaylist])

    return (
        <Tracklist listOfTrackObjectsFromResponse={tracksInPlaylist} typeOfTracklist="Playlist"
                   getRemovedTrackFromPlaylistFromTrackChild={getRemovedTrackFromPlaylistFromTrackChild}/>
    )
}

export default Playlist