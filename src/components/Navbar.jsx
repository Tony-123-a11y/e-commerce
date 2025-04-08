import React, { useState } from 'react'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import { CgChevronDown } from 'react-icons/cg';
import { BiBasket, BiCart } from 'react-icons/bi';
import { IoStorefrontSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import CartModal from './CartModal';
import { category, search } from '../../store/HomeSlice';
import { CiHeart } from "react-icons/ci";
function Navbar() {
  let searchTag=useRef()
  let data= useSelector((slice)=>slice.cart)
  const navigate=useNavigate()
  const [showModal, setshowModal] = useState(false);
  const dispatch=useDispatch()
  return (
    <div className='sticky left-0 top-0 z-20 bg-white'>
      <nav className='px-10  shadow-md py-4 font-primary  max-lg:px-5'>
        <div className="flex items-center justify-between   gap-4  max-md:pb-2 max-md:border-b-1 max-md:border-b-gray-300">
          <div className="flex items-center  justify-start  w-full max-w-180 gap-4 max-lg:gap-2 ">
            <Link to={'/'} className="row justify-start gap-2   min-w-33">
            <span className='text-2xl'><IoStorefrontSharp/></span>
            <h1 className='text-xl font-bold '><span className='text-blue-600'>E-</span>Bazzar</h1>
            </Link>
            {/* input */}
            
            <div className="flex items-center justify-center border border-gray-400 flex-grow relative rounded-lg max-md:hidden">
               <div  className='  w-40  border-r border-gray-400  rounded-l-lg outline-none cursor-pointer relative '>
                <div className='absolute right-3 top-1/2 -translate-y-1/2  text-lg '> <CgChevronDown/></div>
               <select onChange={(e)=>dispatch(category(e.target.value))} className='w-full appearance-none   h-full  px-4 cursor-pointer focus:outline-none'>
                  <option value="all">All categories</option>
                  <option value="beauty">Beauty</option>
                  <option value="smartphones">Smartphone</option>
                  <option value="fragrances">Fragrances</option>
                  <option value="furniture">Furniture</option>
                  <option value="groceries">Groceries</option>
                  {/* <option value="home">Home-decoration</option> */}
                  {/* <option value="kitchen">Kitchen-accessories</option>   */}
                </select>
               </div>
                <input ref={searchTag}  type="text" placeholder='What can we help you find today?' className=' flex-grow px-4 py-2 outline-none placeholder:text-sm' />
                <Link to={'/search'} onClick={()=>dispatch(search(searchTag.current.value))}  className=" bg-blue-400 absolute right-0 z-10 h-full row  text-white px-3 rounded-r-md cursor-pointer text-xl hover:bg-orange-400 transition duration-300"><IoSearch /></Link>
            </div>
          </div>
          <ul>
          <li className=''>
            

            
            <div className="flex items-center gap-4 ">
            <Link to={'/wishlist'}>
            <button className='px-4 max-sm:px-3 cursor-pointer relative hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2  py-2 bg-blue-600 text-white rounded-md'>
                <span className='flex items-center justify-center w-5 h-5 rounded-full bg-red-500 absolute -top-2 -right-2 text-[12px] font-semibold'>{data.wishListArr.length}</span>
            <span className='text-2xl font-bold'><CiHeart/></span>
            {/* <span>Cart</span> */}
            </button>
            </Link>
            <Link to={'/cart'}>
            <button onMouseEnter={()=>setshowModal(true)} onMouseLeave={()=>setshowModal(false)} className='px-4 max-sm:px-3 cursor-pointer relative hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2  py-2 bg-blue-600 text-white rounded-md'>
                <span className='flex items-center justify-center w-5 h-5 rounded-full bg-red-500 absolute -top-2 -right-2 text-[12px] font-semibold'>{data.cartArr.length}</span>
            <span className='text-2xl'><BiCart/></span>
            {
              (showModal && <CartModal/>)
            }
            {/* <span>Cart</span> */}
            </button>
            
            </Link>
           
            </div>
            
            </li>
        </ul>
        </div>
        <div className="flex items-center justify-center border border-gray-400 flex-grow relative rounded-lg md:hidden mt-2">
               <div  className='   border-r border-gray-400  rounded-l-lg outline-none cursor-pointer relative '>
                <div className='absolute right-3 top-1/2 -translate-y-1/2  text-lg '> <CgChevronDown/></div>
               <select onChange={(e)=>dispatch(category(e.target.value))} className='w-full appearance-none   h-full  px-4 cursor-pointer focus:outline-none'>
                  <option value="all">All Catg.</option>
                  <option value="beauty">Beauty</option>
                  <option value="smartphones">Smartphone</option>
                  <option value="fragrances">Fragrances</option>
                  <option value="furniture">Furniture</option>
                  <option value="groceries">Groceries</option>
                  {/* <option value="home">Home-decoration</option> */}
                  {/* <option value="kitchen">Kitchen-accessories</option>   */}
                </select>
               </div>
                <input ref={searchTag}  type="text" placeholder='e.g.Smartphones' className='  p-2 outline-none placeholder:text-sm' />
                <Link to={'/search'} onClick={()=>dispatch(search(searchTag.current.value))}  className=" bg-blue-400 absolute right-0 z-10 h-full row  text-white px-3 rounded-r-md cursor-pointer text-xl hover:bg-orange-400 transition duration-300"><IoSearch /></Link>
            </div>
      </nav>
    </div>
  )
}

export default Navbar
