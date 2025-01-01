import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Favicon from "react-favicon"
import "./index.css"
import logo from "../src/images/logo.png"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Favicon url={logo} />
    <App />
  </React.StrictMode>,
)
