import React, { useEffect, useState } from 'react'
import PageSizeForFetchGames from '../utils/pageSizeForFetchGames'
import axios from "axios"
import LoadingProtector from '../components/loading/loadingProtector';

export default async function fetchGames2({date, setGames}) {

    [cursor, setCursor] = useState(null);
    [nextCursor, setNextCursor] = useState(null);
    [perPage, setPerPage] = useState(PageSizeForFetchGames())

    [result, setResult] = useState([])
    [Loading, setLoading] = useState(false)
    [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            try{
                
                if(!cursor){
                    res = await axios.get(`https://api.balldontlie.io/v1/games?dates[]=${date}&per_page=${perPage}`,{
                        headers: {"Authorization":import.meta.env.VITE_ballDontLie_API_KEY}
                    })

                }else{
                    res = await axios.get(`https://api.balldontlie.io/v1/games?dates[]=${date}&per_page=${perPage}&&cursor=${cursor}`,{
                        headers: {"Authorization":import.meta.env.VITE_ballDontLie_API_KEY}
                    })
                }


                // setCursor(res.data.meta.next_cursor)
                setNextCursor(res.data.meta.next_cursor/*res.data.meta.next_cursor != undefined*/)
                setGames(res.data.data)

            }catch(err){
                setError(err.message || "Failed to fetch data")
            }finally{
                setLoading(false)
            }
    
        }


        fetchData()

    }, [date,cursor])

    const fetchNextPage = () => {
        setCursor(nextCursor)

    }

    return(
        <>
            {loading && <LoadingProtector/> }
            {error && <p>{error}</p>}
        </>
    )

    // [isFirstFetch, setIsFirstFetch] = useState(true)
    // [pageSize, setPageSize] = useState(PageSizeForFetchGames())
    // let res
    // try {
    //     if(firstFetch){ // First fetch is seperated because we dont have a cursor value yet, cursor as null throws errors

    //         console.log("Prvi fetch")
    //         res = await axios.get(`https://api.balldontlie.io/v1/games?dates[]=${date}&per_page=${pageSize}`,{
    //             headers: {"Authorization":import.meta.env.VITE_ballDontLie_API_KEY}
    //         })

    //         setIsFirstFetch(false);

    //     }else{

    //         console.log("Drugi fetch")
    //         res = await axios.get(`https://api.balldontlie.io/v1/games?dates[]=${date}&per_page=${pageSize}&cursor=${cursor}`,{
    //             headers: {"Authorization":import.meta.env.VITE_ballDontLie_API_KEY}
    //         })

    //     }

    // }catch(err){console.log(err)}
    
    // return res.data.data

}