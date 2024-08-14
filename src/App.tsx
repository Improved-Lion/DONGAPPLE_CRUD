import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ThreeDList from './components/ThreeDList'
import ThreeScene from './components/ThreeScene'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ThreeScene></ThreeScene>
    </div>
  )
}

export default App
