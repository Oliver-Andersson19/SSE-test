import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    // koppla på routen
    const eventSource = new EventSource('http://localhost:3050/events')
    
    // Ta emot data från server här
    eventSource.onmessage = event => {
      setMessage(event.data) // Spara ny data i state
    }

    return () => eventSource.close();
  }, [])
  

  return (
    <div className="App">
      {message}
    </div>
  )
}

export default App
