import { useState, useEffect } from 'react'
import Results from './pages/Results'
import NavBar from './components/NavBar';
import PageFooter from "./components/PageFooter.jsx"
import LoadingProtector from './components/loading/loadingProtector.jsx';
import LoadingCircle from './components/loading/loadingCircle.jsx';
import { ToastContainer } from 'react-toastify';

function  App() {

  const [date, setDate] = useState()
  const [isPlayoff, setIsPlayoff] = useState(false)
  const [isOffseason, setisOffseason] = useState(false)
  
  // const [dataFetched, setDataFetched] = useState(false)
  const [cursor, setCursor] = useState(null)


  useEffect(() => {
    
    // const date = FormatDate();
    // setDate(date);
    
    // setDate("2013-03-30");
    setDate("2023-02-02");

  }, [])

  return(
    <>
      <ToastContainer/>
      {cursor == null ? <LoadingProtector/> : null}

      <NavBar
        date={date}
        setDate={setDate}
        isOffseason={isOffseason}
        isPlayoff={isPlayoff}
      />  

      <Results
        date={date}
        cursor={cursor}
        setCursor={setCursor}
      />

      {cursor == "end" ? <PageFooter/> : <LoadingCircle/>}
      
    </>
  )
}

export default App
