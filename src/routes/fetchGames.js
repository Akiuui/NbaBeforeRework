import axios from "axios"
import PageSizeForFetchGames from "../utils/pageSizeForFetchGames.js"

export default async function fetchGames(date, firstFetch/*, setFirstFetch*/, cursor, setCursor) {

    let per_page = PageSizeForFetchGames()
    let res
    try {
        if(firstFetch){ // First fetch is seperated because we dont have a cursor value yet, cursor as null throws errors

            res = await axios.get(`https://api.balldontlie.io/v1/games?dates[]=${date}&per_page=${per_page}`,{
                headers: {"Authorization":import.meta.env.VITE_ballDontLie_API_KEY}
            })
            console.log(res.data)
            // setFirstFetch(false);

        }else{
    
            console.log("Drugi fetch")
            res = await axios.get(`https://api.balldontlie.io/v1/games?dates[]=${date}&per_page=${per_page}&cursor=${cursor}`,{
                headers: {"Authorization":import.meta.env.VITE_ballDontLie_API_KEY}
            })

            console.log(res)
        }

        if(res.data.meta.next_cursor != undefined)
            setCursor(res.data.meta.next_cursor)
        else
            setCursor("end")


    }catch(err){console.log(err)}

    // console.log(res.data.data)
    return res.data.data


}
