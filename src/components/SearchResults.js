import React, {useEffect, useState} from 'react';
import Tracklist from './Tracklist'
import styles from "./SearchResults.module.css";
// Mockup values to avoid using API for testing purposes
const apiResponse = [
    {
        name: "16 Namerson",
        artist: "Hey Bobby",
        album: "itsa me",
        id: (window.crypto.randomUUID()),
        uri: "spotify:track:16"
    },
    {
        name: "15 Namerson",
        artist: "Hey Bobby",
        album: "itsa me",
        id: (window.crypto.randomUUID()),
        uri: "spotify:track:15"
    },
    {
        name: "14 Namerson",
        artist: "Hey Bobby",
        album: "itsa me",
        id: (window.crypto.randomUUID()),
        uri: "spotify:track:14"
    },
    {
        name: "13 Namerson",
        artist: "Hey Bobby",
        album: "itsa me",
        id: (window.crypto.randomUUID()),
        uri: "spotify:track:13"
    },
    {
        name: "12 Namerson",
        artist: "Hey Bobby",
        album: "itsa me",
        id: (window.crypto.randomUUID()),
        uri: "spotify:track:12"
    },
    {
        name: "11 Namerson",
        artist: "Hey Bobby",
        album: "itsa me",
        id: (window.crypto.randomUUID()),
        uri: "spotify:track:11"
    },
    {
        name: "10 Namerson",
        artist: "Hey Bobby",
        album: "itsa me",
        id: (window.crypto.randomUUID()),
        uri: "spotify:track:10"
    },
    {
        name: "9 Namerson",
        artist: "Hey Bobby",
        album: "itsa me",
        id: (window.crypto.randomUUID()),
        uri: "spotify:track:9"
    },
    {
        name: "8 Namerson",
        artist: "Hey Bobby",
        album: "itsa me",
        id: (window.crypto.randomUUID()),
        uri: "spotify:track:8"
    },
    {
        name: "7 Namerson",
        artist: "Hey Bobby",
        album: "itsa me",
        id: (window.crypto.randomUUID()),
        uri: "spotify:track:7"
    },
    {
        name: "6 Namerson",
        artist: "Hey Bobby",
        album: "itsa me",
        id: (window.crypto.randomUUID()),
        uri: "spotify:track:6"
    },
    {
        name: "5 Namerson",
        artist: "Hey Bobby",
        album: "itsa me",
        id: (window.crypto.randomUUID()),
        uri: "spotify:track:5"
    },
    {
        name: "4 Namerson",
        artist: "Hey Bobby",
        album: "itsa me",
        id: (window.crypto.randomUUID()),
        uri: "spotify:track:4"
    },
    {
        name: "2 Namerson",
        artist: "Hey Bobby",
        album: "itsa me",
        id: (window.crypto.randomUUID()),
        uri: "spotify:track:2"
    },
    {
        name: "2 Namerson",
        artist: "Hey Bobby",
        album: "itsa me",
        id: (window.crypto.randomUUID()),
        uri: "spotify:track:2"
    },
    {
        name: "1 TestyZesty",
        artist: "Tom Tomson",
        album: "Just Me",
        id: (window.crypto.randomUUID()),
        uri: "spotify:track:1"
    }
]
const apiResponseRandomized = apiResponse.slice(Math.random() * (apiResponse.length - 1) + 1)

// =====================================================
function SearchResults({queryText, getAddedTrackToPlaylistFromTrackChild, removeTrackFromTheSearchResultsList}) {
    const [listOfTrackObjectsFromResponse, setlistOfTrackObjectsFromResponse] = useState([])
// =====================================================
// PLACE FOR SPOTIFY API CALL
// =====================================================
    useEffect(() => {
        if (queryText && queryText.length > 0) {
            setlistOfTrackObjectsFromResponse(apiResponseRandomized)
        }
//        let temp = 1
//        console.log("regenerated")
//        console.log(apiResponseRandomized.length)
//        console.log(temp)
//        temp++
    }, [queryText])
// =====================================================

//    console.log("listOfTrackObjectsFromResponse SearchResults Component")
//    console.log(listOfTrackObjectsFromResponse)

//    Here The value of listOfTrackObjectsFromResponse is constantly updated and is always equal to Api Response
//    Behavior looks ok, the list is not re-rendered on button click somewhere else

    return (
        <Tracklist listOfTrackObjectsFromResponse={listOfTrackObjectsFromResponse} typeOfTracklist="SearchResultsList"
                   getAddedTrackToPlaylistFromTrackChild={getAddedTrackToPlaylistFromTrackChild}
                   trackRemovedFromSearchList={removeTrackFromTheSearchResultsList}/>
    )


}

export default SearchResults