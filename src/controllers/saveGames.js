import fetchGames from "../routes/fetchGames"
import gamesToObjectFormatter from "./gamesToObjectFormatter"

export default async function saveGames(date, firstFetch, /*setFirstFetch,*/ cursor, setCursor, setGames){

        if(cursor == "end")
            return;

        let data = await fetchGames(date, firstFetch/*, setFirstFetch*/, cursor, setCursor)
        let gamesObjects = gamesToObjectFormatter(data, date)
        setGames(games => [...games,...gamesObjects])

}