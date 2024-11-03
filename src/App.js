import React, {useEffect, useState} from 'react';
import styles from "./App.module.css";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import PlaylistsManager from "./components/PlaylistsManager";
import Switch from "./components/styledComponents/Switch";
import RenameModal from "./components/styledComponents/RenameModal";
import LoginButton from "./components/styledComponents/LoginButton";
import SpotifyApiIntegration from "./components/api/SpotifyApiIntegration";
import LogoutButton from "./components/styledComponents/LogoutButton";
import {spotifyAuth} from "./api/spotifyAuth";


//TODO - There is a bug which makes the list not rerender after first render
// To redo this problem user needs to enter search query, click the button, then change the query and click the button.


function App() {
    const [musicSearchQuery, setMusicSearchQuery] = useState();
    const [trackAddedToPlaylist, setTrackAddedToPlaylist] = useState();
    const [trackRemovedFromSearchList, setTrackRemovedFromSearchList] = useState();
    const [tracksOnUserPlaylist, setTracksOnUserPlaylist] = useState();
    const [clearPlaylistAndSaveToUserProfile, setClearPlaylistAndSaveToUserProfile] = useState(false);
    const [userPlaylistsViewerActive, setUserPlaylistsViewerActive] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);
    const [playlistObjectToBeRenamed, setPlaylistObjectToBeRenamed] = useState();
    const [newPlaylistName, setNewPlaylistName] = useState();
    const [playlistToBeRenamedDetailsToModal, setPlaylistToBeRenamedDetailsToModal] = useState();

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

    function deactivateClearPlaylistAndSaveToUserProfileMarker() {
        setClearPlaylistAndSaveToUserProfile(false)
    }

    function switchPlaylistView() {
        setUserPlaylistsViewerActive(prevState => !prevState)
    }

    function changeActivationStatusOfRenameModal(isComponentActivated) {
        setDisplayModal(isComponentActivated);
    }

    function renamePlaylistFromUserPlaylists(playlistObjectToBeRenamed, newPlaylistNameString) {
        setPlaylistObjectToBeRenamed(playlistObjectToBeRenamed)
        setNewPlaylistName(newPlaylistNameString)
    }

    function passPlaylistToBeRenamedDetailsToModal(playlistToBeRenamed) {
        setPlaylistToBeRenamedDetailsToModal(playlistToBeRenamed)
    }

    function displayModalBasedOnModalState(displayModal) {
        if (displayModal) {
            return (
                <div className={styles.modalWrapper}>
                    <div className={styles.modalDeactivationBackground} onClick={() => {
                        changeActivationStatusOfRenameModal(false)
                    }}></div>
                    <RenameModal changeActivationStatusOfRenameModal={changeActivationStatusOfRenameModal}
                                 renamePlaylistFromUserPlaylists={renamePlaylistFromUserPlaylists}
                                 playlistToBeRenamedDetailsToModal={playlistToBeRenamedDetailsToModal}
                    />
                </div>
            )
        }
    }

    useEffect(() => {
        document.getElementById("playlistViewSwitch").addEventListener('click', switchPlaylistView)
        return () => {
            document.getElementById("playlistViewSwitch").removeEventListener('click', switchPlaylistView)
        }
    }, [])

    const [initiateSpotifyApiAuth, setInitiateSpotifyApiAuth] = useState(true);
    const [userClickedAuthButton, setUserClickedAuthButton] = useState(false);
    const [spotifyToken, setSpotifyToken] = useState();

    function setAuthTokenWhenObtainedInMainComponent(token) {
        setSpotifyToken(token)
    }

    function spotifyAuthStatusSetter(spotifyAuthStatus) {
        setInitiateSpotifyApiAuth(spotifyAuthStatus);
    }

    function performAuthWithUserConsent(boolVal) {
        setUserClickedAuthButton(boolVal)
    }

    function performSpotifyLogout() {
        spotifyAuth.logout()
        setInitiateSpotifyApiAuth(false)
        console.log("Logged out")
    }

    //==================================================================
    //==================== RETURN STATEMENT ============================
    //==================================================================

    return (
        <div className={styles.App}>
            {displayModalBasedOnModalState(displayModal)}
            <header>
                <h1>Jammming - Create Playlist</h1>
                {initiateSpotifyApiAuth ?
                    <div className={styles.statusAndLogoutButtonsWrapper}>
                        <SpotifyApiIntegration spotifyAuthStatusSetter={spotifyAuthStatusSetter}
                                               userClickedAuthButton={userClickedAuthButton}
                                               setAuthTokenWhenObtainedInMainComponent={setAuthTokenWhenObtainedInMainComponent}/>
                        <LogoutButton performSpotifyLogout={performSpotifyLogout}/>
                    </div> :
                    <LoginButton spotifyAuthStatusSetter={spotifyAuthStatusSetter}
                                 performAuthWithUserConsent={performAuthWithUserConsent}/>}

                {/*{renderBasedOnTokenAndLoadingStatus()}*/}
                {/*<p>Spotify token obtained |{useSpotifyAuth().token ? "✅" : "❌"}|</p>*/}
                {/*<p>Spotify is loading |{useSpotifyAuth().loading.toString()}|</p>*/}
                {/*<button onClick={handleClickSpotifyLogout}>Logout from Spotify</button>*/}
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
                                                  deactivateClearPlaylistAndSaveToUserProfileMarker={deactivateClearPlaylistAndSaveToUserProfileMarker}
                                                  activateUserPlaylistsViewer={userPlaylistsViewerActive}
                                                  tracksOnUserPlaylist={tracksOnUserPlaylist}
                                                  changeActivationStatusOfRenameModal={changeActivationStatusOfRenameModal}
                                                  playlistObjectToBeRenamed={playlistObjectToBeRenamed}
                                                  passPlaylistToBeRenamedDetailsToModal={passPlaylistToBeRenamedDetailsToModal}
                                                  newPlaylistName={newPlaylistName}
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
        </div>);
//==================================================================
//==================== RETURN STATEMENT ============================
//==================================================================
}

export default App;