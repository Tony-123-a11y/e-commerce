import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaStar } from 'react-icons/fa'
import { MdDelete } from "react-icons/md";
import { removeFav } from '../../store/CartSlice';
const WishList = () => {
  const dispatch=useDispatch()
  const {wishListArr}=useSelector((slice)=>slice.cart)
  console.log(wishListArr)
  return (
    
    <div>
      <div className="container xl:max-w-7xl m-auto  mt-4">
      {
        wishListArr.length<1 ? <div className='border border-gray-400 rounded-lg w-[80%] p-10 mt-10 text-2xl font-semibold capitalize'>your wishlist is empty</div> : 
       
        // <div className="flex justify-between  items-start  w-full  gap-4">
        <div className="products w-full  space-y-1">
        { 
           wishListArr.map((object,i)=>{
           return  <div  className=" p-4  bg-white shadow-sm relative max-sm:p-10  hover:shadow-lg transition w-full flex  max-sm:px-2 max-sm:pb-0 max-sm:pt-0 ">
            <span onClick={()=>dispatch(removeFav(i))} className=" absolute text-xl text-red-400 right-4 top-4 cursor-pointer hover:text-red-500"><MdDelete/></span>
            <Link to={'/details'} state={object}>
           <div className="flex items-center justify-center ">
              <img src={object.thumbnail} alt=""className='bg-blue-50 h-[250px] object-contain  max-sm:h-[150px]'/>  
           </div>
           </Link>
           <div className=" px-8 max-sm:px-4 w-full max-sm:py-4">
          <div className="flex items-center justify-start gap-8">
          <div className="flex items-center justify-stat  gap-1">
           {
            Array(5).fill('').map((star,i)=>{
                return Math.round(object.rating)>=i+1 ? <span className=' text-yellow-400 '><FaStar /></span>:
                <span className=' text-gray-400 '><FaStar /></span>
            })
           }
           </div>
           <span className='max-sm:text-sm'>{object.rating}</span>
          </div>
          <h1 className='  font-font-head font-semibold mt-3 mb-1 text-lg max-sm:text-base max-sm:mt-1'>{object.title}</h1>
           <h1 className=' text-lg font-[inter] font-semibold max-sm:mt-1 max-sm:text-sm'>&#8377;{object.price} <sub className='font-normal text-red-500'>-{object.discountPercentage}%</sub></h1>
           <span className={`  block max-sm:text-sm ${object.availabilityStatus[0]=='I' ? 'text-green-500': 'text-red-500'}`}>{object.availabilityStatus}</span>
           </div>
          
      </div>
      
           
        })
        } 
    </div>
    
}
</div>
    </div>
  )
}

export default WishList
