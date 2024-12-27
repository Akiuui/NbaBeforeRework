import { useEffect } from 'react'

export default function ScrollListener({action, setCursor, nextCursor}) {
    console.log("mount")

    useEffect(() => {

        // if (!date) return

        const handleScroll = () => {
            const scrollPosition = window.innerHeight + window.scrollY; // Visible height + scrolled distance
            const pageHeight = document.documentElement.offsetHeight; // Total height of the page

            if (scrollPosition >= pageHeight - 30) {
                console.log("function ran")
                action(setCursor, nextCursor)
                
            }

        }

        window.addEventListener('scroll', handleScroll)
        return () => 
        {
            window.removeEventListener('scroll', handleScroll)
            console.log("unmount")

        }


    }, [nextCursor])

    return null

}
