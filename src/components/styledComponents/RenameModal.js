import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import styles from "../SearchBar.module.css";

const RenameModal = ({
                         changeActivationStatusOfRenameModal,
                         renamePlaylistFromUserPlaylists,
                         playlistToBeRenamedDetailsToModal
                     }) => {

    const [playlistObjectToBeRenamed, setPlaylistObjectToBeRenamed] = useState({
        id: playlistToBeRenamedDetailsToModal.id,
        uri: playlistToBeRenamedDetailsToModal.uri,
        playlistImgUrl: playlistToBeRenamedDetailsToModal.playlistImgUrl,
        name: playlistToBeRenamedDetailsToModal.name
    })

    function handleClick(e) {
        if (e.target.className === "reject cookie-button") {
            changeActivationStatusOfRenameModal(false)
        } else if (e.target.className === "rename cookie-button") {
            const newPlaylistName = document.getElementById("playlistRenameInput").value
            renamePlaylistFromUserPlaylists(playlistObjectToBeRenamed, newPlaylistName)
            changeActivationStatusOfRenameModal(false)
        }
    }

    return (
        <StyledWrapper>
            <div className="cookies-card">
                <p className="cookie-heading">You Are about to rename a playlist</p>
                <div className="playlistDetailsWrapper">
                    <img className="playlistImg" src={playlistObjectToBeRenamed.playlistImgUrl} alt="Playlist img"/>
                    <p className="cookie-para">
                        {playlistObjectToBeRenamed ? playlistObjectToBeRenamed.name : ""}
                    </p>
                </div>
                <div className="inputWrapper">
                    <input placeholder={playlistObjectToBeRenamed.name} className="newPlaylistNameInput"
                           id="playlistRenameInput"/>
                </div>
                <div className="button-wrapper">
                    <button className="reject cookie-button">Cancel</button>
                    <button className="rename cookie-button" onClick={handleClick}>Rename</button>
                </div>
                <button className="exit-button" onClick={() => {
                    changeActivationStatusOfRenameModal(false)
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 162 162" className="svgIconCross">
                        <path strokeLinecap="round" strokeWidth={17} stroke="black" d="M9.01074 8.98926L153.021 153"/>
                        <path strokeLinecap="round" strokeWidth={17} stroke="black" d="M9.01074 153L153.021 8.98926"/>
                    </svg>
                </button>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    > * {
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        font-style: normal;
        border: 0;
        font-size: 1.5em;
    }

    .cookies-card {
        max-width: 800px;
        background-color: rgb(255, 250, 250);
        border-radius: 10px;
        border: 1px solid rgb(206, 206, 206);
        display: flex;
        flex-direction: column;
        padding: 20px;
        //margin: 20px;
        gap: 15px;
        position: relative;
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.066);
        z-index: 3;
        margin: 10% auto 40% auto;
        width: 90%;
    }

    .inputWrapper {
        display: flex;
    }

    .newPlaylistNameInput {
        width: 100%;
        padding: 10px;
    }


    .cookie-heading {
        color: rgb(34, 34, 34);
        font-weight: 800;
    }

    .cookie-para {
        font-size: 1.8em;
        font-weight: 800;
    }

    .playlistDetailsWrapper {
        display: flex;
        align-items: center;
        gap: 5%;
        border: 2px solid #000000;
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.066);
        border-radius: 10px;
        padding: 5px;
    }

    .playlistImg {
        max-width: 20%;
        max-height: 20%;
    }

    .button-wrapper {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: flex-end;
        gap: 20px;
    }

    .cookie-button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .rename {
        background-color: rgb(34, 34, 34);
        color: white;
    }

    .rename:hover {
        background-color: rgb(0, 0, 0);
    }

    .exit-button {
        position: absolute;
        top: 17px;
        right: 17px;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .exit-button:hover {
        background-color: #ddd;
        color: white;
    }

    .svgIconCross {
        height: 10px;
    }`;

export default RenameModal;
