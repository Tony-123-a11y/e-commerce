import Skeleton,{SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import React from 'react'

const SkeletonLoader = () => {
  return (
    // <SkeletonTheme baseColor="#202020" highlightColor="#444">
    //   <p>
    //     <Skeleton count={3} />
    //   </p>
    // </SkeletonTheme>
    <div className='min-h-[600px] bg-white p-4  relative  '>
    <SkeletonTheme baseColor='' highlightColor='lightgray'>
     <Skeleton height={300}></Skeleton>
   
     <Skeleton height={20} className='mt-10 max-sm:mt-5' width={200}></Skeleton>
     <Skeleton height={20} className='mt-5 max-sm:mt-2' width={100}></Skeleton>
      <div className='flex  gap-4 justify-between absolute bottom-12 left-[50%] translate-x-[-50%]'>
       <Skeleton height={40} width={130} ></Skeleton>
       <Skeleton height={40} width={130} ></Skeleton>
       </div>
     
    
    </SkeletonTheme>
 </div>
    
  );
}

export default SkeletonLoader
