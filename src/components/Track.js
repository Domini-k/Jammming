import React from 'react';
import styles from './Track.module.css'


function Track({name,artist,album,id,typeOfTracklist}) {
    return(
        <div className={styles.searchResultContent} album={album} id={id}>
            <div className={styles.trackCardleftCol}>
            <h3>{name}</h3>
            <p>{artist}</p>
            </div>
            <div className={styles.trackCardrightCol}>
            {typeOfTracklist=="SearchResultsList"?(<button className={styles.addButtonStyling}>+ Add</button>):(<button className={styles.removeButtonStyling}>Remove</button>)}
            </div>
        </div>
    )
}

export default Track