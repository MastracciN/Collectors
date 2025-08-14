import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  fetch('api/users')
  .then(res => res.json())
  .then(data => console.log(data));


  return (
    <div>
      hello world
    </div>
  )
}

export default App
