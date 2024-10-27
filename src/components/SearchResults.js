import React, {useEffect, useState} from 'react';
import Tracklist from './Tracklist'
import styles from "./SearchResults.module.css";
// Mockup values to avoid using API for testing purposes
const apiResponse2 = [
  {
    name: "Namerson",
    artist: "Hey Bobby",
    album: "itsa me",
    id: (window.crypto.randomUUID())
  },
  {
    name: "TestyZesty",
    artist: "Tom Tomson",
    album: "Just Me",
    id: (window.crypto.randomUUID())
  }
]
const apiResponse = [
  {
    name: "Namerson",
    artist: "Hey Bobby",
    album: "itsa me",
    id: (window.crypto.randomUUID())
  },
  {
    name: "Namerson",
    artist: "Hey Bobby",
    album: "itsa me",
    id: (window.crypto.randomUUID())
  },
  {
    name: "Namerson",
    artist: "Hey Bobby",
    album: "itsa me",
    id: (window.crypto.randomUUID())
  },
  {
    name: "Namerson",
    artist: "Hey Bobby",
    album: "itsa me",
    id: (window.crypto.randomUUID())
  },
  {
    name: "Namerson",
    artist: "Hey Bobby",
    album: "itsa me",
    id: (window.crypto.randomUUID())
  },
  {
    name: "Namerson",
    artist: "Hey Bobby",
    album: "itsa me",
    id: (window.crypto.randomUUID())
  },
  {
    name: "Namerson",
    artist: "Hey Bobby",
    album: "itsa me",
    id: (window.crypto.randomUUID())
  },
  {
    name: "Namerson",
    artist: "Hey Bobby",
    album: "itsa me",
    id: (window.crypto.randomUUID())
  },
  {
    name: "Namerson",
    artist: "Hey Bobby",
    album: "itsa me",
    id: (window.crypto.randomUUID())
  },
  {
    name: "Namerson",
    artist: "Hey Bobby",
    album: "itsa me",
    id: (window.crypto.randomUUID())
  },
  {
    name: "Namerson",
    artist: "Hey Bobby",
    album: "itsa me",
    id: (window.crypto.randomUUID())
  },
  {
    name: "Namerson",
    artist: "Hey Bobby",
    album: "itsa me",
    id: (window.crypto.randomUUID())
  },
  {
    name: "Namerson",
    artist: "Hey Bobby",
    album: "itsa me",
    id: (window.crypto.randomUUID())
  },
  {
    name: "Namerson",
    artist: "Hey Bobby",
    album: "itsa me",
    id: (window.crypto.randomUUID())
  },
  {
    name: "Namerson",
    artist: "Hey Bobby",
    album: "itsa me",
    id: (window.crypto.randomUUID())
  },
  {
    name: "TestyZesty",
    artist: "Tom Tomson",
    album: "Just Me",
    id: (window.crypto.randomUUID())
  }
]

// =====================================================
function SearchResults({queryText, getAddedTrackToPlaylistFromTrackChild, removeTrackFromTheSearchResultsList}) {
  const [listOfTrackObjectsFromResponse, setlistOfTrackObjectsFromResponse] = useState([])
// =====================================================
// PLACE FOR SPOTIFY API CALL
// =====================================================
  useEffect(() => {
    if (queryText && queryText.length > 0) {
      setlistOfTrackObjectsFromResponse(apiResponse)
    }
  }, [queryText])
// =====================================================

  return (
    <Tracklist listOfTrackObjectsFromResponse={listOfTrackObjectsFromResponse} typeOfTracklist="SearchResultsList"
               getAddedTrackToPlaylistFromTrackChild={getAddedTrackToPlaylistFromTrackChild}
               trackRemovedFromSearchList={removeTrackFromTheSearchResultsList}/>
  )


}

export default SearchResults