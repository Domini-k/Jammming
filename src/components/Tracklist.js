import React, {useEffect, useState} from 'react';
import Track from './Track';
import styles from './Tracklist.module.css'

function Tracklist(props) {

    let listOfTrackObjectsFromResponse = props.listOfTrackObjectsFromResponse
    let listOfPlaylistsFromResponse = props.listOfPlaylistsFromResponse
    let typeOfTracklist = props.typeOfTracklist
    let getAddedTrackToPlaylistFromTrackChild = props.getAddedTrackToPlaylistFromTrackChild
    let trackRemovedFromSearchList = props.trackRemovedFromSearchList
    let getRemovedTrackFromPlaylistFromTrackChild = props.getRemovedTrackFromPlaylistFromTrackChild

    const [listOfTrackTagsFromResponse, setlistOfTrackTagsFromResponse] = useState([])

    // HANDLE LIST OF TRACKS GENERATION
    useEffect(() => {
        if (listOfTrackObjectsFromResponse) {
            // console.log("HANDLE LIST OF TRACKS GENERATION")
            setlistOfTrackTagsFromResponse(
                listOfTrackObjectsFromResponse.map(({name, artists, artist, album, id, uri, images}, key) => {
                    let artistName
                    if (artists) {
                        artistName = artists.map(element => element.name).join(', ')
                    }
                    if (artist) {
                        artistName = artist
                    }
                    return (
                        <Track
                            key={key}
                            name={name}
                            artist={artistName}
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

    // HANDLE LIST OF PLAYLISTS GENERATION
    useEffect(() => {
        if (listOfPlaylistsFromResponse) {
            // console.log("HANDLE LIST OF PLAYLISTS GENERATION")
            setlistOfTrackTagsFromResponse(
                listOfPlaylistsFromResponse.map(({name, album, id, uri, images}, key) => {
                    return (
                        <Track
                            key={key}
                            name={name}
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


    }, [listOfPlaylistsFromResponse])


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