import React from 'react';
import styles from './Track.module.css'


function Track({
                   name,
                   artist,
                   album,
                   id,
                   typeOfTracklist,
                   getAddedTrackToPlaylistFromTrackChild,
                   getRemovedTrackFromPlaylistFromTrackChild
               }) {


    function handleClickAdd() {
        getAddedTrackToPlaylistFromTrackChild({name, artist, album, id})
    }

    function handleClickRemove() {
        console.log("Clicked remove button")
        getRemovedTrackFromPlaylistFromTrackChild({name, artist, album, id})
    }


    return (
        <div className={styles.searchResultContent} album={album} id={id}>
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