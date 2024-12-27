import axios from "axios"
import PageSizeForFetchGames from "../utils/pageSizeForFetchGames"

export default async function fetchGames({cursor, date}) {

    let endpoint = "https://api.balldontlie.io/v1/games"
    let pageSize = PageSizeForFetchGames()
    let res
    if(!cursor){
        res = await axios.get(`${endpoint}?dates[]=${date}&per_page=${pageSize}`,{
            headers: {"Authorization":import.meta.env.VITE_ballDontLie_API_KEY}
        })
    }else{
        res = await axios.get(`${endpoint}?dates[]=${date}&per_page=${pageSize}&cursor=${cursor}`,{
            headers: {"Authorization":import.meta.env.VITE_ballDontLie_API_KEY}
        })
    }

    return res
}