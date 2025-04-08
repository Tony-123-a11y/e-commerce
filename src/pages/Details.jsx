import React from 'react'
import { FaStar } from 'react-icons/fa'
import { MdAddShoppingCart } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { add } from '../../store/CartSlice'
import { toast,ToastContainer } from 'react-toastify'

const Details = () => {
  
  const dispatch=useDispatch()

    let location=useLocation()
    let  object=location.state
    let dim=object.dimensions
    let reviewArray=object.reviews
  return (
    <div className='min-h-screen  mt-4'>
      <ToastContainer/>
      <div className="container bg-white xl:max-w-[1380px] py-10 m-auto  flex items-start justify-center h-full border-black max-md:block max-md:py-3">
        {/* imgcontent */}
        <div className="flex items-center justify-center w-[40%] bg-gray-50  h-[400px] sticky  left-0 top-20 p-4 max-lg:w-full max-md:static max-md:mb-10">
          <img src={object.thumbnail} alt="" className='h-full w-full object-contain rounded-md '/>
        </div>
       {/* textContent */}
        <div className=" px-10 h-full w-[60%] max-lg:w-full pb-4 max-sm:px-4">
          <h4 className='text-lg uppercase text-orange-500 font-bold font-font-head max-sm:text-sm'>{object.category}</h4>
          <h1 className='text-3xl font-font-head font-bold tracking-wide mt-2 max-sm:text-xl'>{object.title}</h1>
          <h5 className='text-md italic font-semibold text-gray-600 max-sm:text-base'>{object.brand}</h5>
          <div className="flex items-center justify-between  my-5 max-lg:block max-md:flex max-sm:block">
     
          <h1 className=' text-4xl font-semibold max-sm:text-2xl'>&#8377;{object.price} <sub className='font-normal text-red-500 max-sm:text-lg'>-{object.discountPercentage}%</sub></h1>
           <div className="flex items-center justify-center  gap-1 max-lg:justify-start max-md:justify-center max-sm:justify-start max-lg:mt-6 max-md:mt-0 max-sm:mt-4">
           {
            Array(5).fill('').map((star,i)=>{
                     return Math.round(object.rating) >= i+1 ? <span className=' text-yellow-400 text-2xl max-md:text-xl max-sm:text-lg '><FaStar /></span>:
                      <span className=' text-gray-400  text-2xl max-md:text-xl max-sm:text-lg'><FaStar /></span>
            })
            
           
           }
          
            <span className='px-2 py-1 ml-2 bg-yellow-400 rounded-sm max-sm:text-sm'>{object.rating}</span>
           </div>
        
          </div>
          <h1 className='text-md mt-4 mb-0.5 text-blue-800 font-bold font-font-head  uppercase'>Description</h1>
          <p className='max-sm:text-sm leading-5 tracking-wide'>{object.description}</p>
          <h1 className='text-md mt-4 mb-0.5 text-blue-800 font-bold font-font-head  uppercase'>Details</h1>
          <ul>
            <li className='font-semibold flex items-center justify-start gap-3'>Dimensions: <span className='font-normal text-gray-700'>{dim.width}W x {dim.height}H x {dim.depth}D</span></li>
            <li className='font-semibold flex items-center justify-start gap-3'>Stock:  <span className='font-normal text-gray-700'>{object.stock}</span></li>
            <li className='font-semibold flex items-center justify-start gap-3'>Warranty: <span className='font-normal text-gray-700'>{object.warrantyInformation}</span></li>
            <li className='font-semibold flex items-center justify-start gap-3'>Weight: <span className='font-normal text-gray-700'>{object.weight}</span></li>
            <li className='font-semibold flex items-center justify-start gap-3'>Shipping: <span className='font-normal text-gray-700'>{object.shippingInformation}</span></li>
            <li className='font-semibold flex items-center justify-start gap-3'>Tags: <span className='font-normal text-gray-700'>{object.tags}</span></li>
          </ul>
          <span className={`font-semibold mt-6 block text-lg max-sm:text-base  ${object.availabilityStatus.startsWith('I') ? 'text-green-500': 'text-red-500'}`}>{object.availabilityStatus}</span>
          <div className="flex items-center gap-2 my-3">
           <button className='flex-grow py-2 bg-gradient-to-tr from-blue-700 to-blue-400 rounded-sm text-white font-semibold cursor-pointer'>Buy Now</button>
           <button onClick={()=>{
            toast.dismiss()
            toast.success("Item added to cart",{position:'top-center'})
            dispatch(add(object))}} className='border border-blue-800 rounded-sm flex-grow py-1.5  text-blue-800 transition capitalize hover:bg-blue-700 hover:border-blue-700 flex items-center justify-center gap-2 font-bold hover:text-white font-font-head cursor-pointer'><span className=' text-xl '><MdAddShoppingCart /></span> cart</button>
           </div>
          
           <h1 className='text-md mt-4 mb-0.5 text-blue-800 font-bold font-font-head  uppercase'>Rating & Reviews</h1>
           {reviewArray.map((review,i)=>{
                  return <div className='row relative justify-between items-start gap-16 mt-6 after:content-[""] after:absolute after:bottom-[-13px] after:left-0 after:w-full after:h-0.5 after:bg-gray-200'>
                    
                   <div className="row justify-between gap-4">
                    <img src="review.jpg" alt="" className='w-10 h-10 object-cover rounded-full' />
                   <div className="">
                   <div className='flex items-center justify-start gap-1'>
                   { Array(5).fill('').map((star,i)=>{
                     return Math.round(review.rating) >= i+1 ? <span className=' text-yellow-400 text-lg max-md:text-base max-sm:text-sm '><FaStar /></span>:
                     <span className=' text-gray-400 text-lg max-md:text-base max-sm:text-sm '><FaStar /></span>
            })}
            </div>
            <h2 className='mt-2 font-semibold max-sm:text-sm'>{review.comment}</h2>
                   </div>
                   </div>
                   <h1 className='font-semibold text-gray-600'>{new Date(review.date).toLocaleDateString()}</h1>
                   </div>
              
           })}
        </div>
      </div>
    </div>
  )
}

export default Details
