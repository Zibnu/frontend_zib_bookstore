import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from "react-hot-toast"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
      position='top-center'
      toastOptions={{
        duration : 1500,
        style : {
          background : 'rgba(255,255,255, 0.8)',
          backdropFilter : "blur(10px)",
          borderRadius : "12px",
          fontSize : "14px",
          color : "#333",
        }
      }}
      />
    </BrowserRouter>
  </StrictMode>,
)
