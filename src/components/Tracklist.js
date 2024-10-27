import React, {useEffect, useState} from 'react';
import Track from './Track';
import styles from './Tracklist.module.css'

function Tracklist({
                       listOfTrackObjectsFromResponse,
                       typeOfTracklist,
                       getAddedTrackToPlaylistFromTrackChild,
                       trackRemovedFromSearchList,
                       getRemovedTrackFromPlaylistFromTrackChild
                   }) {
    const [listOfTrackTagsFromResponse, setlistOfTrackTagsFromResponse] = useState([])


    useEffect(() => {
        setlistOfTrackTagsFromResponse(
            listOfTrackObjectsFromResponse.map(({name, artist, album, id}, key) => {
                return (
                    <Track key={key} name={name} artist={artist} album={album} id={id}
                           typeOfTracklist={typeOfTracklist}
                           getAddedTrackToPlaylistFromTrackChild={getAddedTrackToPlaylistFromTrackChild}
                           getRemovedTrackFromPlaylistFromTrackChild={getRemovedTrackFromPlaylistFromTrackChild}/>
                )
            })
        )
    }, [listOfTrackObjectsFromResponse])


    useEffect(() => {
        if (trackRemovedFromSearchList) {
            setlistOfTrackTagsFromResponse(prevState => prevState.filter(track => track.props.id !== trackRemovedFromSearchList.id))
        }
    }, [trackRemovedFromSearchList])


    return (
        <div className={styles.searchResultsWrapper}>
            {listOfTrackTagsFromResponse.length > 0 ? listOfTrackTagsFromResponse : "..."}
        </div>
    )
}

export default Tracklist