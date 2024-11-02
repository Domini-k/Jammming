import React from 'react';
import styles from './Track.module.css'


function Track({
                   name,
                   artist,
                   album,
                   id,
                   typeOfTracklist,
                   getAddedTrackToPlaylistFromTrackChild,
                   getRemovedTrackFromPlaylistFromTrackChild,
                   uri, playlistImages, changeActivationStatusOfRenameModal, passPlaylistToBeRenamedDetailsToModal
               }) {


    function handleClickAdd() {
        getAddedTrackToPlaylistFromTrackChild({name, artist, album, id, uri})
    }

    function handleClickRemove() {
        getRemovedTrackFromPlaylistFromTrackChild({name, artist, album, id, uri})
    }

    function handleClickRename() {
        // console.log("Rename Handler")
        // console.log("Track to be renamed details:")
        // console.log({id})
        // console.log({name})
        // console.log({uri})
        changeActivationStatusOfRenameModal(true)
        passPlaylistToBeRenamedDetailsToModal(
            {
                id: id,
                uri: uri,
                playlistImgUrl: playlistImages[0].url,
                name: name
            }
        )
    }


    function renderButtonBasedOnTypeOfTracklist(typeOfTracklist) {
        switch (typeOfTracklist) {
            case "SearchResultsList":
                return (<button className={styles.addButtonStyling} onClick={handleClickAdd}>+ Add</button>)
            case "Playlist":
                return (<button className={styles.removeButtonStyling} onClick={handleClickRemove}>Remove</button>)
            case "listOfPlaylists":
                return (<button className={styles.renameButtonStyling} onClick={handleClickRename}>Rename</button>)
            default:
                console.log("Type of tracklist not determined")
        }
    }

    return (
        <div className={styles.searchResultContent} album={album} id={id} uri={uri}>

            {typeOfTracklist !== "listOfPlaylists" ?
                (
                    <div className={styles.trackCardleftCol}>
                        <h3>{name}</h3>
                        <p>{artist}</p>
                    </div>
                ) :
                (
                    <div className={styles.playlistCardleftCol}>
                        <img src={playlistImages[0].url} className={styles.playlistCardImage}/>
                        <h3>{name}</h3>
                    </div>
                )
            }

            <div className={styles.trackCardrightCol}>
                {renderButtonBasedOnTypeOfTracklist(typeOfTracklist)}
            </div>
        </div>
    )
}

export default Track