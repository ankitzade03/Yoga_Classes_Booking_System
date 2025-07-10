import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'  //tailwind css


import { BrowserRouter } from 'react-router-dom'
import { YogaContextProvider } from './Context/ContextApi';
import { App } from './App';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <YogaContextProvider>
        <App />
      </YogaContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
