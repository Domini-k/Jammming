import React, {useEffect, useState} from 'react';
import Tracklist from './Tracklist'
import styles from "./Playlist_new.module.css";

function Playlist_new({listOfTrackObjectsFromResponse, typeOfTracklist, getRemovedTrackFromPlaylistFromTrackChild}) {
    return (
        <Tracklist listOfTrackObjectsFromResponse={listOfTrackObjectsFromResponse}
                   typeOfTracklist={typeOfTracklist}
                   getRemovedTrackFromPlaylistFromTrackChild={getRemovedTrackFromPlaylistFromTrackChild}/>
    )
}

export default Playlist_new