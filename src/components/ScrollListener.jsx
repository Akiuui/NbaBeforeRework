import { useEffect } from 'react'
import saveGames from '../controllers/saveGames'

export default function ScrollListener({date, firstFetch,/* setFirstFetch,*/ cursor, setCursor, setGames}) {
    useEffect(() => {
        if (!date) return

        let lastCursor
        const handleScroll = () => {

            const scrollPosition = window.innerHeight + window.scrollY; // Visible height + scrolled distance
            const pageHeight = document.documentElement.offsetHeight; // Total height of the page

            if (scrollPosition >= pageHeight - 10) {

                if(cursor != lastCursor){ //We dont allow multiple firings of the function, we allow it only when the cursor is changed
                    saveGames(date, false, cursor, setCursor, setGames)
                    lastCursor = cursor
                }
                
            }

        }

        window.addEventListener('scroll', handleScroll)

        return () => {window.removeEventListener('scroll', handleScroll)
        }


    }, [date, firstFetch, cursor, setCursor, setGames])

    return null

}
