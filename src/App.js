import React, { useEffect, useState } from 'react';
import styles from "./App.module.css";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
// =====================================================
// Mockup values to avoid using API
const apiResponse = [
  {
    name:"Namerson",
    artist:"Hey Bobby",
    album:"itsa me",
    id:"1"
  },
  {
    name:"TestyZesty",
    artist:"Tom Tomson",
    album:"Just Me",
    id:"2"
  }
]
const apiResponse2 = [
  {
    name:"Namerson",
    artist:"Hey Bobby",
    album:"itsa me",
    id:"1"
  },
  {
    name:"Namerson",
    artist:"Hey Bobby",
    album:"itsa me",
    id:"1"
  },
  {
    name:"Namerson",
    artist:"Hey Bobby",
    album:"itsa me",
    id:"1"
  },
  {
    name:"Namerson",
    artist:"Hey Bobby",
    album:"itsa me",
    id:"1"
  },
  {
    name:"Namerson",
    artist:"Hey Bobby",
    album:"itsa me",
    id:"1"
  },
  {
    name:"Namerson",
    artist:"Hey Bobby",
    album:"itsa me",
    id:"1"
  },
  {
    name:"Namerson",
    artist:"Hey Bobby",
    album:"itsa me",
    id:"1"
  },
  {
    name:"Namerson",
    artist:"Hey Bobby",
    album:"itsa me",
    id:"1"
  },
  {
    name:"Namerson",
    artist:"Hey Bobby",
    album:"itsa me",
    id:"1"
  },
  {
    name:"Namerson",
    artist:"Hey Bobby",
    album:"itsa me",
    id:"1"
  },
  {
    name:"Namerson",
    artist:"Hey Bobby",
    album:"itsa me",
    id:"1"
  },
  {
    name:"Namerson",
    artist:"Hey Bobby",
    album:"itsa me",
    id:"1"
  },
  {
    name:"Namerson",
    artist:"Hey Bobby",
    album:"itsa me",
    id:"1"
  },
  {
    name:"TestyZesty",
    artist:"Tom Tomson",
    album:"Just Me",
    id:"2"
  }
]
// =====================================================

function App() {
  const [musicSearchQuery,setMusicSearchQuery] = useState();
  const [querySearchResults,setQuerySearchResults] = useState([]);
  function getMusicQueryDetailsFromChild(data){
    setMusicSearchQuery(data);
  }
  useEffect(() => {
    if(typeof musicSearchQuery === "string"){
      setQuerySearchResults(apiResponse);
    }
  }, [musicSearchQuery]);

  //==================================================================
  //==================== RETURN STATEMENT ============================
  //==================================================================

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
              <h2 className={styles.searchResultsHeader}>Search Results</h2>
              <SearchResults queryResponse={querySearchResults}/>
            </div>
          </div>
          <div className={styles.colRight}>
            <input
              placeholder="Playlist name"
              className={styles.playlistNameInput}
            />

            <div className={styles.subColRight}>
            <h2>Your Playlist</h2>
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
//==================================================================
//==================== RETURN STATEMENT ============================
//==================================================================
}

export default App;
