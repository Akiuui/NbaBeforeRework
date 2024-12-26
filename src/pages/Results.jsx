import React, { useState, useEffect, useCallback } from 'react'
//components
import BoxResult from "../components/BoxResult.jsx"
import ScrollListener from '../components/ScrollListener.jsx'
//controllers
import saveGames from "../controllers/saveGames.js"
//utils
import FindContrast from "../utils/findContrast.js"
import getDarkerColor from "../utils/getDarkerColor.js"

function Results({date, cursor, setCursor}) {

    //Essential states
    const [games, setGames] = useState([])

    useEffect(() => {

        if(!date) return

        setGames([])
        setCursor(null)

        saveGames(date, true, null, setCursor, setGames)

    }, [date])
    
    const setGamesCallback = useCallback((value) => setGames(value), []);
    const setCursorCallback = useCallback((value) => setCursor(value), []);

    return (
            <ul className='mx-2 mt-16 grid gap-y-20 grid-cols-1 md:grid-cols-2 sm:gap-x-10 sm:mx-6'>
                {games.map((game, index) => {

                    let bg_color = (game.getWinner()).color;

                    return (
                        <li key={index} id="parentElement" className="px-4 border-2 border-black relative rounded-lg" 
                            style={{ backgroundColor: `#${bg_color}` }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `#${getDarkerColor(bg_color, 20)}`}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `#${bg_color}`}
                            onClick={(e) => {
                                // setShowDetails(true)
                                // setIndexOfGame(index)
                            }}
                            >

                            <BoxResult
                                game={game}
                                date={date}
                            />
                        </li>
                    )

                })}
                {cursor != "end" ? 
                                <ScrollListener
                                        date={date}
                                        firstFetch={false}
                                        // setFirstFetch={setFirstFetchCallback}
                                        cursor={cursor}
                                        setCursor={setCursorCallback} 
                                        setGames={setGamesCallback}/> 
                                : null}
                
            </ul>
    )


}

export default Results