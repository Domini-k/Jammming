import React, {useEffect, useState} from 'react';
import Tracklist from './Tracklist'
import styles from "./PlaylistNew.module.css";

function PlaylistNew({listOfTrackObjectsFromResponse, typeOfTracklist, getRemovedTrackFromPlaylistFromTrackChild}) {
    return (
        <Tracklist listOfTrackObjectsFromResponse={listOfTrackObjectsFromResponse}
                   typeOfTracklist={typeOfTracklist}
                   getRemovedTrackFromPlaylistFromTrackChild={getRemovedTrackFromPlaylistFromTrackChild}/>
    )
}

export default PlaylistNew