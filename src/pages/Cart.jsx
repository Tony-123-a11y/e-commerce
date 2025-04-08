import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaStar } from 'react-icons/fa'
import { MdDelete } from "react-icons/md";
import { minusQuantity, plusQuantity, remove } from '../../store/CartSlice'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { toast, ToastContainer } from 'react-toastify'


function Cart() {
  // const [arr, setarr] = useState([])
  const [count, setcount] = useState(1);
let data= useSelector((slice)=>slice.cart)
let dispatch=useDispatch()
let sum=0
for (const product of data.cartArr) {
  sum= Math.round(sum + product.price*product.quantity)
}

let tax= Math.round(sum/10)
let shipCharge= Math.round(sum/10)
  return (
    <div>
       <ToastContainer/>
      <div className="container xl:max-w-7xl m-auto  mt-4">
        {/* Product List */}
         {
        data.cartArr.length<1 ? <div className=' border-gray-400 rounded-lg w-[80%] p-10 mt-10 text-2xl font-semibold capitalize max-md:text-lg'>your cart is empty</div> : 
       
        <div className="flex justify-between  items-start  w-full  gap-4 max-md:block">
        <div className="products w-[80%] space-y-1 max-md:w-full">
        { 
        data.cartArr.map((object,i)=>{
           return  <div  className=" p-4  bg-white shadow-sm relative max-sm:p-10  hover:shadow-lg transition w-full flex max-sm:px-2 max-sm:pb-0 max-sm:pt-0 ">
            <span onClick={()=>{
              toast.dismiss()
             toast.info('Item deleted successfully',{position:'top-center'}) 
              dispatch(remove(i))
            }} className=" absolute text-xl text-red-400 right-4 top-4 cursor-pointer hover:text-red-500"><MdDelete/></span>
          
            <Link to={'/details'} state={object}>
           <div className="flex items-center justify-center ">
              <img src={object.thumbnail} alt=""className='bg-blue-50 h-[250px] object-contain  max-sm:h-[180px]'/>  
           </div>
           </Link>
           <div className=" px-8  max-sm:px-4 w-full max-sm:py-4">
          <div className="flex items-center justify-start gap-8">
          <div className="flex items-center justify-stat  gap-1">
           {
            Array(5).fill('').map((star,i)=>{
                return Math.round(object.rating)>=i+1 ? <span className=' text-yellow-400 '><FaStar /></span>:
                <span className=' text-gray-400 '><FaStar /></span>
            })
           }
           </div>
           <span>{object.rating}</span>
          </div>
          <h1 className='  font-font-head font-semibold mt-3 mb-1 text-lg max-sm:text-base max-sm:mt-1'>{object.title}</h1>
           <h1 className=' text-lg font-[inter] font-semibold max-sm:text-base'>&#8377;{object.price} <sub className='font-normal text-red-500'>-{object.discountPercentage}%</sub></h1>
           <span className={` mt-5 block max-sm:mt-1 max-sm:text-sm ${object.availabilityStatus.startsWith('I') ? 'text-green-500': 'text-red-500'}`}>{object.availabilityStatus}</span>
           <div className='flex items-center justify-start gap-4 mt-5 max-sm:mt-1'>
            <button onClick={()=>dispatch(minusQuantity(i))} className='w-5 max-sm:w-4 max-sm:h-4 h-5 rounded-full flex items-center justify-center border text-xl font-bold hover:text-red-500 transition duration-300 cursor-pointer max-sm:text-base'><BiMinus/></button>
            <h4 className='text-lg font-semibold max-sm:text-base'>{object.quantity}</h4>
            <button onClick={()=>dispatch(plusQuantity(i))} className='w-5 max-sm:w-4 max-sm:h-4 h-5 rounded-full flex items-center justify-center border text-xl font-bold hover:text-red-500 transition duration-300 cursor-pointer max-sm:text-base'><BiPlus/></button>
           </div>
           </div>
          
      </div>
      
           
        })
        } 
        </div>
        {/* Price Total */}
        <div className="w-1/3 px-8  bg-white py-8 sticky border border-gray-200 top-20 max-sm:w-full max-sm:mt-2 max-sm:px-2 max-sm:py-2">
          <ul className='space-y-2'>
            <li className='font-font-head'><span className='font-semibold mr-2'>Subtotal:</span>&#8377;{Math.round(sum)}</li>
            <li className='font-font-head'><span className='font-semibold mr-2'>Tax:</span>&#8377;{tax}</li>
            <li className='font-font-head'><span className='font-semibold mr-2'>Delivery Charge:</span>&#8377;{`${sum>=500 ? 0 : shipCharge} `} </li>
            <li className='font-font-head text-green-400 font-semibold text-lg'>{`${sum>=500 ? 'Free Delivery' : ''}`}</li>
            <li className='font-font-head'><span className='font-semibold mr-2'>Total:</span>&#8377;{sum+tax+shipCharge}</li>
          </ul>
          <button className='w-full py-2 bg-orange-400 font-bold text-xl rounded-md mt-4 hover:bg-orange-500 transition cursor-pointer hover:text-white max-sm:text-lg'>Place Order</button>
        </div>
      </div>
}
      </div>
    </div>
  )
}

export default Cart

