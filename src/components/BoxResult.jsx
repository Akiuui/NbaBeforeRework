import React, { useEffect, useState, useRef } from "react";
import FindContrast from "../utils/findContrast.js"

function BoxResult({ game, date }) {

    let homeTeam = game.teams.home
    let visitorTeam = game.teams.visitor
    let year = (date.split("-"))[0]

    const [homeLogo, setHomeLogo] = useState(homeTeam.logo)
    const [visitorLogo, setvisitorLogo] = useState(visitorTeam.logo)

    // const textToWhite = useRef([])

    // let font_color = "black"
    // if (FindContrast(`#${(game.getWinner()).color}`, "#000000") < 2)
    //     font_color = "white"

    // if(font_color=="white" && textToWhite!=undefined){ // We check and change if we need to change
    //     console.log("Entered: ", game.teams.home.name) 

    //     textToWhite.current.style.color = "white"

    //     // textToWhite.forEach(e => {
    //     //     e.classList.add("whiteText")
    //     // })
    // }

    useEffect(() => {
        
        if(homeTeam.logoState == "notFetched"){
            homeTeam.FetchLogo(year)
                .then(() => setHomeLogo(homeTeam.logo))
        }

    }, [homeTeam])
    useEffect(() => {

        if(visitorTeam.logoState == "notFetched"){
            visitorTeam.FetchLogo(year)
                .then(() => setvisitorLogo(visitorTeam.logo))
        }

    }, [visitorTeam])

    return <>
            <div className='w-5 h-5 bg-gray-300/50 rounded-full absolute right-2 top-2 flex justify-center items-center cursor-pointer hover:bg-gray-300/75'>
                <p className='bold text-bg italic'>i</p>
            </div>
            <div className='flex justify-center px-2'>
                <div className='pt-[24px] flex flex-col items-center '>
                    <div className='bg-white border-2 border-black rounded-full cursor-wait flex items-center justify-center w-[95px] h-[95px] md:w-[100px] md:h-[100px] lg:w-[110px] lg:h-[110px]'>
                        <img loading="eager"
                            className='dropshadowpng w-[80px] md:w-[90px] '
                            src={`data:image/png;base64,${homeLogo}`}
                            alt={`${homeTeam.name} logo`}
                        />
                    </div>
                    <p className="text-xl pt-1.5 text-center"
                        style={{ fontWeight: game.isHomeWinner() ? 'bold' : 'normal' }}
                    >{homeTeam.name}</p>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div className='flex items-center'>
                        <p className="pl-4 text-2xl lg:text-3xl" style={{ fontWeight: game.isHomeWinner() ? 'bold' : 'normal' }}>{game.homeScore}</p>
                        <p className='mx-2 text-3xl'>-</p>
                        <p className='pr-4 text-2xl lg:text-3xl' style={{ fontWeight: game.isHomeWinner() ? 'normal' : 'bold' }}>{game.visitorScore}</p>
                    </div>
                    <p className='text-lg'>Final score</p>
                </div>
                <div className='pt-[24px] pb-[15px] flex flex-col items-center'>

                    <div className='bg-white border-2 border-black w-[95px] h-[95px] rounded-full flex justify-center items-center md:w-[100px] md:h-[100px] lg:w-[110px] lg:h-[110px]'>
                        <img loading="eager"
                            className='dropshadowpng w-[80px] md:w-[90px]'
                            src={`data:image/png;base64,${visitorLogo}`}
                            alt={`${visitorTeam.name} logo`} />
                    </div>

                    <p className='text-xl pt-1.5 text-center' style={{ fontWeight: game.isHomeWinner() ? 'normal' : 'bold' }}>{visitorTeam.name}</p>
                </div>
            </div>
          </>
}

export default BoxResult;
