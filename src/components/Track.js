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
                   uri
               }) {


    function handleClickAdd() {
        getAddedTrackToPlaylistFromTrackChild({name, artist, album, id, uri})
    }

    function handleClickRemove() {
        getRemovedTrackFromPlaylistFromTrackChild({name, artist, album, id, uri})
    }


    return (
        <div className={styles.searchResultContent} album={album} id={id} uri={uri}>
            <div className={styles.trackCardleftCol}>
                <h3>{name}</h3>
                <p>{artist}</p>
            </div>
            <div className={styles.trackCardrightCol}>
                {typeOfTracklist == "SearchResultsList" ? (
                    <button className={styles.addButtonStyling} onClick={handleClickAdd}>+ Add</button>) : (
                    <button className={styles.removeButtonStyling} onClick={handleClickRemove}>Remove</button>)}
            </div>
        </div>
    )
}

export default Track