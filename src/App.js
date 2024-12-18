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

// TODO - Rename, App responsiveness
// TODO - Creating playlist validation - Don't create when there is already one present with the same name
// TODO - Better token management. It's authenticating automatically after it expires without any prompt / info
/*
* TODO - Renaming process needs to be handled better.
*  It should perform the rename and then perform loading loop to wait for update on spotify side
*  At any point of time user can stop the loading loop and rerender manually
*
* */
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
    const [clearSearchResultsStatus, setClearSearchResultsStatus] = useState(false);
    
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

    function clearSearchResults() {
        setClearSearchResultsStatus(true)
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
    const [spotifyTokenExpirationDate, setSpotifyTokenExpirationDate] = useState();

    function setAuthTokenWhenObtainedInMainComponent(token, authTokenExpirationTime) {
        setSpotifyToken(token)
        setSpotifyTokenExpirationDate(authTokenExpirationTime)

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
                                               setAuthTokenWhenObtainedInMainComponent={setAuthTokenWhenObtainedInMainComponent}
                        />
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
                                               removeTrackFromTheSearchResultsList={trackRemovedFromSearchList}
                                               clearSearchResultsStatus={clearSearchResultsStatus}
                                />
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
                                                  clearSearchResults={clearSearchResults}
                                                  resetNewPlaylistName={setNewPlaylistName}
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