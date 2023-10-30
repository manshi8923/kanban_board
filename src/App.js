import React from 'react'
import Homepage from './pages/HomePage/Homepage'
import DataProvder from './components/Datacontext/DataProvder'

const App = () => {
  return (
    <DataProvder>
    <Homepage/>
    </DataProvder>
  )
}

export default App
