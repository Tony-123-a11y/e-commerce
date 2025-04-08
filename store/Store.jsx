import { configureStore } from '@reduxjs/toolkit'
import  cartSlice  from './CartSlice'
import  homeSlice  from './HomeSlice'



export const store = configureStore({
  reducer: {
    cart:cartSlice,
    home:homeSlice,
  },
})