import React, { useEffect, useState } from 'react';
import styles from "./App.module.css";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";

function App() {
  const [musicSearchQuery,setMusicSearchQuery] = useState("");
  const [querySearchResults,setQuerySearchResults] = useState([]);

  function getMusicQueryDetailsFromChild(data){
    setMusicSearchQuery(data);
  }

  useEffect(() => {
    // If there is some querry defined for the spotify search then perform API query
    if(musicSearchQuery !== ""){
      // Mockup values to avoid using API
      const apiResponse = [
        {
          name:"",
          artist:"",
          album:"",
          id:""
        }
      ]
      setQuerySearchResults(apiResponse)
    }

  }, [musicSearchQuery]);

    return (
    <div className={styles.App}>
      <header>
        <h1>Jammming - Create Playlist</h1>
      </header>
      <main>
        <div className={styles.mainWrapper}>
          <div className={styles.colLeft}>
            <SearchBar sendQueryDataToParent={getMusicQueryDetailsFromChild}/>

            <div className={styles.subColLeft}>
              <SearchResults queryResponse={querySearchResults}/>
            </div>
          </div>
          <div className={styles.colRight}>
            <input
              placeholder="Playlist name"
              className={styles.playlistNameInput}
            />

            <div className={styles.subColRight}>
                <Playlist/>
            </div>
          </div>
        </div>
        <div className={styles.savePlaylistBtnWrapper}>    
            <div className={styles.savePlaylistBtnSpacer}></div>
            <button className={styles.savePlaylistBtn}>💾 Save playlist</button>
        </div>
      </main>
    </div>
  );
}

export default App;
