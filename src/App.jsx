import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import Wishlist from './Pages/Wishlist'
import View from './Pages/View'

function App() {

  return (
    <>


      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/wishlist' element={<Wishlist/>} />
        <Route path='/View/:id' element={<View/>} />
        {/* requesting an invalid route,redirect to home */}
        <Route path='/*' element={<Navigate to={'/'}/>} />

      </Routes>

      <Footer />



    </>
  )
}

export default App
