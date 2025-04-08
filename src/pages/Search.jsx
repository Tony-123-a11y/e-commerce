import React from 'react'
import { FaRegHeart, FaStar } from 'react-icons/fa'
import { MdAddShoppingCart } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Search = () => {
    const {filterArr}=useSelector((slice)=>slice.home)
  return (
    <div>
        <div className="container xl:max-w-7xl mx-auto mt-10">
       <div className="grid grid-cols-4  gap-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
      
      {
 
        filterArr.length<1 ? <div  className='text-xl font-semibold'>No items found</div> :
        filterArr.map((object,i)=>{
          return  <div key={object.id}><div  className="p-4 pb-8  bg-white shadow-sm rounded-md relative max-sm:p-10 max-sm:pb-16 hover:shadow-lg transition min-h-[640px]">
            <Link to={'/details'} state={object}>
          <div className="flex items-center justify-center  h-[300px] bg-gray-100 overflow-hidden">
             <img src={object.thumbnail} alt="" className='h-full object-contain hover:scale-105 transition duration-300 ease-in-out'/>
          </div>
         <div className="  mt-6">
          <div className="flex items-center justify-between">
         <div className="flex items-center justify-stat  gap-1">
          {
           Array(5).fill('').map((star,i)=>{
               return Math.round(object.rating)>=i+1 ? <span key={i} className='text-yellow-400'><FaStar /></span>:
               <span key={i} className=' text-gray-400 '><FaStar /></span>
           })
          }
          </div>
          <span>{object.rating}</span>
          </div>
          
          <h1 className=' text-lg font-font-head font-semibold mt-5 mb-3'>{object.title}</h1>
          <h1 className=' text-xl font-[inter] font-bold'>&#8377;{(object.price-(object.discountPercentage*object.price)/100).toFixed(2)} <sub className='font-normal text-red-500'><del className='text-gray-600'>MRP:&#8377;{object.price}</del>(-{object.discountPercentage}%)</sub></h1>
         </div>
         </Link>
          <div className="flex items-center gap-2 my-8 mb-10">
          <button className='flex-grow cursor-pointer py-2 bg-gradient-to-tr from-blue-700 to-blue-400 rounded-sm text-white font-semibold'>Buy Now</button>
          <div  className='flex-grow relative'> <button onClick={()=>dispatch(add(object))} className='border cursor-pointer border-blue-800 rounded-sm py-2 w-full text-blue-800 transition capitalize hover:bg-blue-700 hover:border-blue-700 flex items-center justify-center gap-2 font-bold hover:text-white font-font-head'><span className=' text-xl'><MdAddShoppingCart /></span> cart</button></div>
          </div> 
          <span className={`font-semibold text-right block ${object.availabilityStatus.startsWith('I') ? 'text-green-500': 'text-red-500'}`}>{object.availabilityStatus}</span>
           {
            object.like ?  <span onClick={()=>{
              dispatch(removeFav(object))
              dispatch(like(i))
              }} className='absolute bottom-4 text-xl left-6 cursor-pointer text-red-500'><FaHeart/></span> 
              :
              <span onClick={()=>{
              dispatch(addToFav(object))
                dispatch(like(i))}} className='absolute bottom-4 text-xl left-6 cursor-pointer text-gray-300'><FaRegHeart/></span>
           }
          

     </div>
     </div>
        
          
       })
      }
       
       </div>
    </div>
    </div>
  )
}

export default Search
