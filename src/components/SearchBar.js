import React from 'react';
import styles from './SearchBar.module.css'

function SearchBar() {
    
return(
    <div className={styles.searchQuerryWrapper}>
    <input placeholder='Enter Search query' className={styles.mainSearchQuery}/>
    <button>Submit search query</button>
    </div>
)
}

export default SearchBar