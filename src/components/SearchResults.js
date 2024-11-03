import React, {useEffect, useState} from 'react';
import Tracklist from './Tracklist'
import styles from "./SearchResults.module.css";
import {spotifyService} from "../services/spotifyService";
import Loader from "./styledComponents/Loader";

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
// const apiResponseRandomized = apiResponse.slice(Math.random() * (apiResponse.length - 1) + 1)

// =====================================================
function SearchResults({
                           queryText,
                           getAddedTrackToPlaylistFromTrackChild,
                           removeTrackFromTheSearchResultsList,
                           clearSearchResultsStatus
                       }) {
    const [listOfTrackObjectsFromResponse, setListOfTrackObjectsFromResponse] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        if (clearSearchResultsStatus) {
            setListOfTrackObjectsFromResponse([])
        }

    }, [clearSearchResultsStatus]);


// =====================================================
// PLACE FOR SPOTIFY API CALL
// =====================================================
    useEffect(() => {
        const searchTracks = async () => {
            if (!queryText || queryText.length === 0) {
                setListOfTrackObjectsFromResponse([]);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);
                // Call for list of tracks
                const response = await spotifyService.searchTracks(queryText);
                setListOfTrackObjectsFromResponse(response.tracks.items);
            } catch (err) {
                setError('Failed to fetch tracks. Please try again.');
                console.error('Search tracks error:', err);
            } finally {
                setIsLoading(false);
            }
        };
        const timeoutId = setTimeout(() => {
            searchTracks();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [queryText])


    if (error) {
        return <div className="error-message">{error}</div>;
    }
    if (isLoading) {
        return <Loader/>
    }
    return (
        <Tracklist listOfTrackObjectsFromResponse={listOfTrackObjectsFromResponse}
                   typeOfTracklist="SearchResultsList"
                   getAddedTrackToPlaylistFromTrackChild={getAddedTrackToPlaylistFromTrackChild}
                   trackRemovedFromSearchList={removeTrackFromTheSearchResultsList}
        />
    )
}

export default SearchResults