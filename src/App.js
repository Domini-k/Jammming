import React, {useEffect, useState} from 'react';
import styles from "./App.module.css";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";

function App() {
    const [musicSearchQuery, setMusicSearchQuery] = useState();
    const [trackAddedToPlaylist, setTrackAddedToPlaylist] = useState();
    const [trackRemovedFromSearchList, setTrackRemovedFromSearchList] = useState();

    function getMusicQueryDetailsFromChild(data) {
        setMusicSearchQuery(data);
    }

    function getAddedTrackToPlaylistFromTrackChild(addedTrack) {
        setTrackAddedToPlaylist(addedTrack)
        setTrackRemovedFromSearchList(addedTrack)
    }

    /*    function getRemovedTrackFromPlaylistFromTrackChild(trackToRemoveFromPlaylist) {
        }*/


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

                    <div className={styles.searchAndPlaylistNameSection}>
                        <SearchBar sendQueryDataToParent={getMusicQueryDetailsFromChild}/>


                        <div>
                            <input
                                placeholder="Playlist name"
                                className={styles.playlistNameInput}
                            />
                        </div>


                    </div>

                    <div className={styles.trackListsSection}>
                        <div className={styles.colLeft}>
                            <div className={styles.subColLeft}>
                                <h2>Search Results</h2>
                                <SearchResults queryText={musicSearchQuery}
                                               getAddedTrackToPlaylistFromTrackChild={getAddedTrackToPlaylistFromTrackChild}
                                               removeTrackFromTheSearchResultsList={trackRemovedFromSearchList}/>
                            </div>
                        </div>
                        <div className={styles.colRight}>
                            <div className={styles.subColRight}>
                                <h2>Your Playlist</h2>
                                <Playlist addTrackToThePlaylist={trackAddedToPlaylist}/>
                            </div>
                        </div>
                    </div>

                    <div className={styles.savePlaylistBtnWrapper}>
                        <div className={styles.savePlaylistBtnSpacer}></div>
                        <button className={styles.savePlaylistBtn}>💾 Save playlist</button>
                    </div>

                </div>

            </main>
        </div>
    );
//==================================================================
//==================== RETURN STATEMENT ============================
//==================================================================
}

export default App;