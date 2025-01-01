import React, { useState, useEffect, useCallback } from 'react'
//components
import BoxResult from "../components/BoxResult.jsx"
//utils
import FindContrast from "../utils/findContrast.js"
import getDarkerColor from "../utils/getDarkerColor.js"

import DetailsWindow from '../components/DetailsWindow.jsx'

function Results({date, games}) {

    const [selectedGame, setSelectedGame] = useState()
    const [showDetails, setShowDetails] = useState(false)

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
                                setShowDetails(true)
                                setSelectedGame(game)
                            }}
                            >

                           <div className='w-5 h-5 bg-gray-300/50 rounded-full absolute right-2 top-2 flex justify-center items-center cursor-pointer hover:bg-gray-300/75'>
                                <p className='bold text-bg italic'>i</p>
                            </div>

                            <BoxResult
                                game={game}
                                date={date}
                            />
                        </li>
                    )

                })}


                {showDetails && <DetailsWindow selectedGame={selectedGame} onClose={() => setShowDetails(false)} date={date}/>}
            </ul>
    )


}

export default Results