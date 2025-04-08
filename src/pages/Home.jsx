import React, { useEffect, useState } from 'react'
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {add, addToFav, removeFav}  from '../../store/CartSlice';
import { FaStar } from "react-icons/fa";
// import Skeleton from 'react-loading-skeleton';
import SkeletonLoader from '../components/SkeletonLoader';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css"; 
import { CgChevronDoubleLeft, CgChevronDoubleRight } from 'react-icons/cg';
import { fetchArr, like } from '../../store/HomeSlice';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { toast,ToastContainer } from 'react-toastify';
 const RightArrow=({onClick})=>{
  return (
    <div className='absolute -right-8 z-20 top-1/2   rounded-sm -translate-y-1/2 border border-gray-200 bg-gray-50 flex items-center justify-center'>
      <button onClick={onClick} className='text-2xl  rounded-sm  cursor-pointer'><CgChevronDoubleRight/></button>
    </div>
  )
}
 const LeftArrow=({onClick})=>{
  return (
    <div className='absolute -left-8 z-20 top-1/2   rounded-sm -translate-y-1/2 border border-gray-200 bg-gray-50 flex items-center justify-center'>
      <button onClick={onClick} className='text-2xl rounded-sm  cursor-pointer'><CgChevronDoubleLeft/></button>
    </div>
  )
}
const Home = () => {
  const {filterArr,skeleton,search,categoryArr}= useSelector((slice)=>slice.home)
  const {wishListArr}=useSelector((slice)=>slice.cart)
// console.log(filterArr)
  // console.log(productArr) 
  const settings={
    speed:500,
    slidesToShow:4,
    infinite:false,
    slidesToScroll:4,
    prevArrow:<LeftArrow/>,
    nextArrow:<RightArrow/>,
  }
  

  const [current, setcurrent] = useState(0);
  const dispatch= useDispatch()
       useEffect(()=>{
        dispatch(fetchArr())
       },[dispatch])
   
       const productsPerPage=8
     const  noOfBtns=Math.ceil(categoryArr.length/productsPerPage)
     const start= current*productsPerPage
     const last= start + productsPerPage
      const sliceArr= categoryArr.slice(start,last)
      
      
 function handleCart(object){
  toast.dismiss()
  dispatch(add(object))
  toast('Item added to cart',{position:'top-center',autoClose:3000})
 }

  return (
    <div>
      <ToastContainer />
      <div className="container xl:max-w-7xl mx-auto mt-10">
      
      <div className="grid grid-cols-4  gap-4 max-xl:grid-cols-3 max-lg:grid-cols-2  max-sm:gap-1">
      
        {

       skeleton ?   Array(8).fill('').map((ele)=>{
                 return <SkeletonLoader/>
          })
          :

          
          categoryArr.length<1 ? <div  className='text-xl font-semibold'>No items found</div> :
          sliceArr.map((object,i)=>{
            return  <div key={object.id}><div  className="p-4 pb-8  bg-white shadow-sm relative max-sm:p-10 max-sm:pb-16 hover:shadow-lg transition min-h-[640px] max-sm:px-2 max-sm:pt-2 max-sm:min-h-[480px]">
              <Link to={'/details'} state={object}>
            <div className="flex items-center justify-center bg-gray-100   h-[300px] overflow-hidden max-sm:h-50">
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
            <span className='max-sm:text-sm'>{object.rating}</span>
            </div>
            
            <h1 className=' text-lg font-font-head font-semibold mt-5 mb-3 max-sm:text-sm max-sm:mt-3 max-sm:mb-1'>{object.title}</h1>
            <h1 className=' text-xl font-[inter] font-bold max-sm:text-base'>&#8377;{(object.price-(object.discountPercentage*object.price)/100).toFixed(2)} <sub className='font-normal text-red-500'><del className='text-gray-600'>MRP:&#8377;{object.price}</del>(-{object.discountPercentage}%)</sub></h1>
           </div>
           </Link>
            <div className="flex items-center gap-2 my-8 mb-10 max-sm:my-4 ">
            <button className='flex-grow cursor-pointer py-2 bg-gradient-to-tr from-blue-700 to-blue-400 rounded-sm text-white font-semibold max-sm:text-sm'>Buy Now</button>
            <div  className='flex-grow relative'> <button onClick={()=>handleCart(object)} className='border cursor-pointer border-blue-800 rounded-sm py-2 w-full text-blue-800 transition capitalize hover:bg-blue-700 hover:border-blue-700 flex items-center justify-center gap-2 font-bold hover:text-white font-font-head max-sm:text-sm'><span className=' text-xl'><MdAddShoppingCart /></span> <span className="max-sm:hidden">Cart</span></button></div>
            </div> 
            
            <span className={`font-semibold text-right block max-sm:text-sm  ${object.availabilityStatus.startsWith('I') ? 'text-green-500': 'text-red-500'}`}>{object.availabilityStatus}</span>
             {
              object.like ?  <span  className='absolute bottom-4 text-xl left-6 cursor-pointer text-red-500'><FaHeart/></span> 
                :
                <span onClick={()=>{
                  let flag;
                  wishListArr.forEach(element => {
                    if(object.id==element.id){
                      toast.error('Item already added in Wishlist',{position:'top-center'})
                      flag=true
                      return
                    }
                  });
                 toast.dismiss()
                 if(flag){
                  toast.error('Item already added to wishlist',{position:'top-center'})
                  return
                 }
                
                dispatch(addToFav(object))
                  dispatch(like(i))
                  toast.success('Item added to wishlist',{position:'top-center'})
                }} className='absolute bottom-4 text-xl left-6 cursor-pointer text-gray-300'><FaRegHeart/></span>
               
             }
            

       </div>
       </div>
          
            
         })
        }
         
         </div>
         
         <div  className=' sticky max-w-44   bottom-5  text-center left-1/2 -translate-x-1/2'>
         <Slider {...settings}>
          {
            Array(noOfBtns).fill('').map((btn,i)=>{
              return <div onClick={()=> setcurrent(i)}><button style={{backgroundColor:current==i ? 'lightblue' :'white' ,color:current==i ? 'white' : 'black',border:' 1px solid lightgray'}}  className='px-4 py-1 cursor-pointer rounded-md  text-sm font-semibold transition duration-300'>{i+1}</button></div>
            })
          }
          </Slider>
          </div>
      </div>
    </div>
  )
}

export default Home
