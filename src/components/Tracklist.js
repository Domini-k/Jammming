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

    useEffect(() => {
        
        if (listOfTrackObjectsFromResponse) {
            setlistOfTrackTagsFromResponse(
                listOfTrackObjectsFromResponse.map(({name, artists, album, id, uri, images}, key) => {
                    return (
                        <Track
                            key={key}
                            name={name}
                            artist={artists.map(element => element.name).join(', ')}
                            album={album}
                            id={id}
                            typeOfTracklist={typeOfTracklist}
                            getAddedTrackToPlaylistFromTrackChild={getAddedTrackToPlaylistFromTrackChild}
                            getRemovedTrackFromPlaylistFromTrackChild={getRemovedTrackFromPlaylistFromTrackChild}
                            uri={uri}
                            playlistImages={images}
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

    return (
        <div className={styles.searchResultsWrapper}>
            {listOfTrackTagsFromResponse.length > 0 ? listOfTrackTagsFromResponse : "..."}
        </div>
    )
}

export default Tracklist