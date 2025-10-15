import AppRouter from './routes/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {

  return (
    <BrowserRouter>
    <AppRouter/>
    </BrowserRouter>
  )
}

export default App
