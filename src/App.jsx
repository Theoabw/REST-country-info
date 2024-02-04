import './App.css'
import React from 'react'
import MainComponent from "./components/MainComponent.jsx";

function App() {

  return (
      <div className="App">
          <header className="App-header">
              <h1>Country info</h1>
          </header>
          <main>
              <MainComponent/>
          </main>
      </div>
)
}

export default App
