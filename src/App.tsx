import React from 'react'
import TreeGreed from './components/Tree-greed/Tree-greed'
import { startMirage } from './server-mock'

if (process.env.NODE_ENV === 'development') {
  startMirage()
}

function App() {
  return <TreeGreed/>
}

export default App
