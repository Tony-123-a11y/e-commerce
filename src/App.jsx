import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Details from './pages/Details'
import WishList from './pages/WishList'
import Search from './pages/Search'
import { useSelector } from 'react-redux'


function App() {
  const [count, setCount] = useState(0)
const {filterArr}=useSelector((slice)=>slice.home)
  return (
    <>
       <BrowserRouter>
       <Navbar/>
      
       <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/wishlist' element={<WishList/>}></Route>
        <Route path='/details' element={<Details/>}></Route>
        <Route path='/search'  element={<Search/>}></Route>
       </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
