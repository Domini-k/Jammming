import React from 'react';
import styles from './Track.module.css'


function Track({name,artist,album,id}) {
    return(
        <div className={styles.searchResultContent} album={album} id={id}>
            <h3>{name}</h3>
            <p>{artist}</p>
        </div>
    )
}

export default Track