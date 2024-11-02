import React, {useEffect, useState} from 'react';
import Track from './Track';
import styles from './Tracklist.module.css'

function Tracklist(props) {

    let listOfTrackObjectsFromResponse = props.listOfTrackObjectsFromResponse ?? props.listOfPlaylistsFromResponse
    let typeOfTracklist = props.typeOfTracklist
    let getAddedTrackToPlaylistFromTrackChild = props.getAddedTrackToPlaylistFromTrackChild
    let trackRemovedFromSearchList = props.trackRemovedFromSearchList
    let getRemovedTrackFromPlaylistFromTrackChild = props.getRemovedTrackFromPlaylistFromTrackChild


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

        if (listOfTrackObjectsFromResponse) {

            setlistOfTrackTagsFromResponse(
                listOfTrackObjectsFromResponse.map(({name, artist, album, id, uri, images}, key) => {
                    return (
                        <Track key={key} name={name} artist={artist} album={album} id={id}
                               typeOfTracklist={typeOfTracklist}
                               getAddedTrackToPlaylistFromTrackChild={getAddedTrackToPlaylistFromTrackChild}
                               getRemovedTrackFromPlaylistFromTrackChild={getRemovedTrackFromPlaylistFromTrackChild}
                               uri={uri} playlistImages={images}
                               changeActivationStatusOfRenameModal={props.changeActivationStatusOfRenameModal}
                               passPlaylistToBeRenamedDetailsToModal={props.passPlaylistToBeRenamedDetailsToModal}
                        />
                    )
                })
            )

        }


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