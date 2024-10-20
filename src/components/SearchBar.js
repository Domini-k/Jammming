import React, { useState } from 'react';
import styles from './SearchBar.module.css'

function SearchBar({sendQueryDataToParent}) {
    const [musicSearchQuery,setMusicSearchQuery] = useState("");
    function handleClick(e){
        sendQueryDataToParent(musicSearchQuery)
    }
    const handleChange = e => setMusicSearchQuery(e.target.value)

return(
    <div className={styles.searchBarWrapper}>
        <input value={musicSearchQuery} placeholder='Enter Search query' className={styles.mainSearchQuery} onChange={handleChange}/>
        <button className={styles.searchQueryButton} onClick={handleClick}>🔎 Query Spotify</button>
    </div>
)
}

export default SearchBar