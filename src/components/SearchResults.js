import React from 'react';
import Tracklist from './Tracklist'
import styles from "./SearchResults.module.css";


function SearchResults({queryResponse}) {
    const listFromRequestedResponses = queryResponse.map( ({name,artist,album,id},key) => {
        return (
            <div className={styles.searchResultContent} key={key} album={album} id={id}>
                <h3>{name}</h3>
                <p>{artist}</p>
            </div>
        )
    })

    return(
        <div className={styles.searchResultsWrapper}>
            {listFromRequestedResponses}
        </div>
    )
}

export default SearchResults