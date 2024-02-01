import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dropdown from "./components/Dropdown.jsx";

function App() {

  return (
      <div className="App">
          <header className="App-header">
              <h1>Country info</h1>
          </header>
          <main>
              <Dropdown/>
          </main>
      </div>
)
}

export default App
