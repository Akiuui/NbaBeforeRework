import { useState, useEffect, useCallback } from 'react'
import Results from './pages/Results'
import NavBar from './components/NavBar';
import { ToastContainer } from 'react-toastify';
import FetchGames from './components/FetchGames.jsx';

function  App() {

  const [date, setDate] = useState(() => {return "2023-02-06"})
  const [isPlayoff, setIsPlayoff] = useState(false)
  const [isOffseason, setisOffseason] = useState(false)
  
  // const [dataFetched, setDataFetched] = useState(false)
  // const [loading, setLoading] = useState(true)
  // const [stateOfFetch, setStateOfFetch] = useState("first")

  const [games, setGames] = useState([])

  useEffect(() => {
  
   // const date = FormatDate(); 
    // setDate(date); 
    // setDate("2013-03-30"); 
    // setDate("2023-02-02"); 
  
  }, [])

  return(
    <>
      <ToastContainer/>

      <NavBar
        date={date}
        setDate={setDate}
        isOffseason={isOffseason}
        isPlayoff={isPlayoff}
      />
      
      <Results
        date={date}
        games={games}
      />

      <FetchGames setGames={setGames} date={date}/>

    </>
  )
}

export default App
