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

//    console.log("START=====================================================")
//    console.log([listOfTrackObjectsFromResponse, listOfTrackObjectsFromResponse.length,
//        typeOfTracklist,
//        trackRemovedFromSearchList,
//        getRemovedTrackFromPlaylistFromTrackChild])
//    console.log("END=====================================================")

    useEffect(() => {
//        console.log(typeOfTracklist)
//        console.log("The list on the left will be set")
//        console.log("Object that will be used -> " + listOfTrackObjectsFromResponse)
        setlistOfTrackTagsFromResponse(
            listOfTrackObjectsFromResponse.map(({name, artist, album, id, uri}, key) => {
                return (
                    <Track key={key} name={name} artist={artist} album={album} id={id}
                           typeOfTracklist={typeOfTracklist}
                           getAddedTrackToPlaylistFromTrackChild={getAddedTrackToPlaylistFromTrackChild}
                           getRemovedTrackFromPlaylistFromTrackChild={getRemovedTrackFromPlaylistFromTrackChild}
                           uri={uri}/>
                )
            })
        )
    }, [listOfTrackObjectsFromResponse])


    useEffect(() => {
        if (trackRemovedFromSearchList) {
            setlistOfTrackTagsFromResponse(prevState => prevState.filter(track => track.props.id !== trackRemovedFromSearchList.id))
        }
    }, [trackRemovedFromSearchList])


//    console.log("listOfTrackTagsFromResponse")
//    console.log(listOfTrackTagsFromResponse)

    return (
        <div className={styles.searchResultsWrapper}>
            {listOfTrackTagsFromResponse.length > 0 ? listOfTrackTagsFromResponse : "..."}
        </div>
    )
}

export default Tracklist