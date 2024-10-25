import React, { useEffect, useState } from 'react';
import Tracklist from './Tracklist'
import styles from "./SearchResults.module.css";
// Mockup values to avoid using API for testing purposes
const apiResponse = [
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
const apiResponse2 = [
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
  ]
// =====================================================


function SearchResults({queryText}) {
const [listOfTrackObjectsFromResponse,setlistOfTrackObjectsFromResponse] = useState([])
// =====================================================
// PLACE FOR SPOTIFY API CALL
// =====================================================
useEffect(()=>{
    if(queryText && queryText.length>0){
        setlistOfTrackObjectsFromResponse(apiResponse)
    }
},[queryText])
// =====================================================



/*     const listFromRequestedResponses = queryResponse.map( ({name,artist,album,id},key) => {
        return (
            <div className={styles.searchResultContent} key={key} album={album} id={id}>
                <h3>{name}</h3>
                <p>{artist}</p>
            </div>
        )
    })
    return(
        <div className={styles.searchResultsWrapper}>
            {listFromRequestedResponses.length>0?listFromRequestedResponses:"..."}
        </div>
    ) */

    return(
        <Tracklist listOfTrackObjectsFromResponse={listOfTrackObjectsFromResponse} typeOfTracklist="SearchResultsList"/>
    )



}

export default SearchResults