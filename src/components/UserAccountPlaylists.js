import React, {useEffect, useState} from 'react';
import styles from "./UserAccountPlaylists.module.css";
import Tracklist from "./Tracklist";

function UserAccountPlaylists({
                                  changeActivationStatusOfRenameModal,
                                  playlistObjectToBeRenamed,
                                  passPlaylistToBeRenamedDetailsToModal,
                                  newPlaylistName
                              }) {
    // Place for API call to get list of playlists from user profile
    const [listOfUserPlaylists, setListOfUserPlaylists] = useState(null);
    useEffect(() => {
        if (!listOfUserPlaylists) {
            const mockedResponse = require("./apiMockedResponses/listOfPlaylistsResponse.json").items
            setListOfUserPlaylists(mockedResponse.toSpliced(2, mockedResponse.length))
        }
    }, [])

    useEffect(() => {
        // RENAME THE PLAYLIST FUNCTIONALITY
        if (playlistObjectToBeRenamed && newPlaylistName) {
            let listOfUserPlaylistsAfterRenaming = []
            for (const playlist of listOfUserPlaylists) {
                let currentElement = playlist
                if ((playlist.id === playlistObjectToBeRenamed.id) && (playlist.uri === playlistObjectToBeRenamed.uri)) {
                    currentElement.name = newPlaylistName
                }
                listOfUserPlaylistsAfterRenaming.push(currentElement)
            }
            setListOfUserPlaylists(listOfUserPlaylistsAfterRenaming)
        }
    }, [playlistObjectToBeRenamed]);


    return (<Tracklist listOfPlaylistsFromResponse={listOfUserPlaylists}
                       typeOfTracklist={"listOfPlaylists"}
                       changeActivationStatusOfRenameModal={changeActivationStatusOfRenameModal}
                       passPlaylistToBeRenamedDetailsToModal={passPlaylistToBeRenamedDetailsToModal}
    />)
}

export default UserAccountPlaylists