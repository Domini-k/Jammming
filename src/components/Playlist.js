import React, { useEffect, useState } from 'react';
import Tracklist from './Tracklist'
import styles from "./Playlist.module.css";
// Mockup values
const mockedListOfTracks2 = [
    {
      name:"Namerson",
      artist:"Hey Bobby",
      album:"itsa me",
      id:(window.crypto.randomUUID())
    },
    {
      name:"Namerson",
      artist:"Hey Bobby",
      album:"itsa me",
      id:(window.crypto.randomUUID())
    },
    {
      name:"Namerson",
      artist:"Hey Bobby",
      album:"itsa me",
      id:(window.crypto.randomUUID())
    },
    {
      name:"Namerson",
      artist:"Hey Bobby",
      album:"itsa me",
      id:(window.crypto.randomUUID())
    },
    {
      name:"Namerson",
      artist:"Hey Bobby",
      album:"itsa me",
      id:(window.crypto.randomUUID())
    },
    {
      name:"Namerson",
      artist:"Hey Bobby",
      album:"itsa me",
      id:(window.crypto.randomUUID())
    },
    {
      name:"Namerson",
      artist:"Hey Bobby",
      album:"itsa me",
      id:(window.crypto.randomUUID())
    },
    {
      name:"Namerson",
      artist:"Hey Bobby",
      album:"itsa me",
      id:(window.crypto.randomUUID())
    },
    {
      name:"Namerson",
      artist:"Hey Bobby",
      album:"itsa me",
      id:(window.crypto.randomUUID())
    },
    {
      name:"Namerson",
      artist:"Hey Bobby",
      album:"itsa me",
      id:(window.crypto.randomUUID())
    },
    {
      name:"Namerson",
      artist:"Hey Bobby",
      album:"itsa me",
      id:(window.crypto.randomUUID())
    },
    {
      name:"Namerson",
      artist:"Hey Bobby",
      album:"itsa me",
      id:(window.crypto.randomUUID())
    },
    {
      name:"Namerson",
      artist:"Hey Bobby",
      album:"itsa me",
      id:(window.crypto.randomUUID())
    },
    {
      name:"Namerson",
      artist:"Hey Bobby",
      album:"itsa me",
      id:(window.crypto.randomUUID())
    },
    {
      name:"Namerson",
      artist:"Hey Bobby",
      album:"itsa me",
      id:(window.crypto.randomUUID())
    },
    {
      name:"TestyZesty",
      artist:"Tom Tomson",
      album:"Just Me",
      id:(window.crypto.randomUUID())
    }
  ];
const mockedListOfTracks = [
    {
      name:"Namerson",
      artist:"Hey Bobby",
      album:"itsa me",
      id:(window.crypto.randomUUID())
    },
    {
      name:"TestyZesty",
      artist:"Tom Tomson",
      album:"Just Me",
      id:(window.crypto.randomUUID())
    }
  ]

// =====================================================

function Playlist(newlyAddedTrackToPlaylist) {

  const [tracksInPlaylist,setTracksInPlaylist] = useState([])
  const [playlistName,setPlaylistName] = useState([])

  useEffect(()=>{

    // Mock list of tracks on the playlist to adjust CSS design
    setTracksInPlaylist(mockedListOfTracks)


  },[newlyAddedTrackToPlaylist])






  return(
    <Tracklist listOfTrackObjectsFromResponse={tracksInPlaylist} typeOfTracklist="Playlist"/>
  )
}

export default Playlist