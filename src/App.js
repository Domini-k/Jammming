import React, {useEffect, useState} from 'react';
import styles from "./App.module.css";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import PlaylistsManager from "./components/PlaylistsManager";
import Switch from "./styledComponents/Switch";


//TODO - There is a bug which makes the list not rerender after first render
// To redo this problem user needs to enter search query, click the button, then change the query and click the button.


function App() {
    const [musicSearchQuery, setMusicSearchQuery] = useState();
    const [trackAddedToPlaylist, setTrackAddedToPlaylist] = useState();
    const [trackRemovedFromSearchList, setTrackRemovedFromSearchList] = useState();
    const [tracksOnUserPlaylist, setTracksOnUserPlaylist] = useState();
    const [clearPlaylistAndSaveToUserProfile, setClearPlaylistAndSaveToUserProfile] = useState(false);
    const [userPlaylistsViewerActive, setUserPlaylistsViewerActive] = useState(false);

    function getTracksOnPlaylistFromPlaylistComponent(data) {
        setTracksOnUserPlaylist(data)
    }

    function getMusicQueryDetailsFromChild(data) {
        setMusicSearchQuery(data);
    }

    function getAddedTrackToPlaylistFromTrackChild(addedTrack) {
        setTrackAddedToPlaylist(addedTrack)
        setTrackRemovedFromSearchList(addedTrack)
    }

    function handleClick(e) {
        if (!userPlaylistsViewerActive) {
            setClearPlaylistAndSaveToUserProfile(true)
        }
    }

    function deativateClearPlaylistAndSaveToUserProfileMarker() {
        setClearPlaylistAndSaveToUserProfile(false)
    }

    function switchPlaylistView() {
        setUserPlaylistsViewerActive(prevState => !prevState)
    }

    useEffect(() => {
        document.getElementById("playlistViewSwitch").addEventListener('click', switchPlaylistView)
        return () => {
            document.getElementById("playlistViewSwitch").removeEventListener('click', switchPlaylistView)
        }
    }, [])
//    document.getElementById("playlistViewSwitch").addEventListener('click', () => {
//        console.log("Click")
//    })

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
                                id="playlistName"
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
                                <div className={styles.rightHeaderWrapper}>
                                    <h2 className={styles.rightHeader}>Switch view between playlist creator and
                                        playlists browser</h2>
                                    <div id="playlistViewSwitch">
                                        <Switch/>
                                    </div>
                                </div>
                                <PlaylistsManager addTrackToThePlaylist={trackAddedToPlaylist}
                                                  sendTrackOnPlaylistToMainComponent={getTracksOnPlaylistFromPlaylistComponent}
                                                  clearPlaylistAndSaveToUserProfile={clearPlaylistAndSaveToUserProfile}
                                                  deativateClearPlaylistAndSaveToUserProfileMarker={deativateClearPlaylistAndSaveToUserProfileMarker}
                                                  activateUserPlaylistsViewer={userPlaylistsViewerActive}
                                                  tracksOnUserPlaylist={tracksOnUserPlaylist}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.savePlaylistBtnWrapper}>
                        <div className={styles.savePlaylistBtnSpacer}></div>
                        <button className={styles.savePlaylistBtn} onClick={handleClick}>💾 Save playlist</button>
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