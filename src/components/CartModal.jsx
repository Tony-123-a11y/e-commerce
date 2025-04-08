import React from 'react'
import { useSelector } from 'react-redux'

const CartModal = () => {
    let data=useSelector((slice)=>slice.cart)
  
    let sum=0
    for (const product of data.cartArr) {
        sum= Math.round(sum + product.price)
      }
  return (
    <div className='absolute right-0 z-20 top-full text-black max-h-100 cartModal overflow-y-scroll max-lg:hidden'>
        {
            data.cartArr.length<1 ? <div className='p-4 rounded-md font-semibold text-sm bg-white w-50 border border-gray-400'>Your cart is empty</div>  :
        
      <div className="py-2 bg-white border border-gray-300 max-h-200 overflow-y-scroll cartModal rounded-md">
        <ul className='space-y-2'>
        {
        data.cartArr.map((product,i)=>{
          return <li className='px-2 flex items-center justify-start  gap-4  w-100 bg-gray-50'>
             <img src={product.thumbnail} alt="" className='bg-gray-100 h-15 object-contain'/>
             <h6 className='tex-sm font-medium'>{product.title}</h6>
             <h4>&#8377;{product.price}</h4>
          </li>  
        })
      
    }
    <li> 
        <h2 className='px-2 flex justify-between items-center'><span className='text-sm font-semibold'>Subtotal:</span>&#8377;{sum}</h2>
    </li>
      </ul>
      </div>
}
    </div>
  )
}

export default CartModal
