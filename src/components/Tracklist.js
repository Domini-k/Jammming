import React, { useEffect, useState } from 'react';
import Track from './Track';
import styles from './Tracklist.module.css'

function Tracklist({listOfTrackObjectsFromResponse,typeOfTracklist}) {

    const [listOfTrackTagsFromResponse,setlistOfTrackTagsFromResponse] = useState([])

    useEffect(()=>{
        
//-? Why there is a check for length????

        if(listOfTrackObjectsFromResponse.length>0){
            setlistOfTrackTagsFromResponse(
                listOfTrackObjectsFromResponse.map( ({name,artist,album,id},key) => {
                    return (
                        <Track key={key} name={name} artist={artist} album={album} id={id} typeOfTracklist={typeOfTracklist}/>
                    )
                })
            )
        }
    },[listOfTrackObjectsFromResponse])

    return(
        <div className={styles.searchResultsWrapper}>
            {listOfTrackTagsFromResponse.length>0?listOfTrackTagsFromResponse:"..."}
        </div>
    )





}

export default Tracklist