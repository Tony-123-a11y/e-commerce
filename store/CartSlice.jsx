import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartArr: JSON.parse( localStorage.getItem('Cart')) || [],
  wishListArr:JSON.parse(localStorage.getItem('WishList')) || []
}
// const arr=[]
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
   add:(state,action)=>{
    
    let obj={...action.payload}
    let cartObj={}
    console.log(obj)
    let flag;
     state.cartArr.forEach(element => {
         if(obj.id==element.id){
          cartObj=element
          flag=true
          return
           
         }
        });
         if(flag){
          cartObj.quantity=cartObj.quantity + 1
         }
         else{
          state.cartArr.push(obj)
         }
         


     
    // arr.push(action.payload)
    localStorage.setItem('Cart',JSON.stringify(state.cartArr))
     
   },
   remove:(state,action)=>{
      state.cartArr.splice(action.payload,1)
      localStorage.setItem('Cart',JSON.stringify(state.cartArr))
   },
  addToFav:(state,action)=>{
    state.wishListArr.push(action.payload)
    localStorage.setItem('WishList',JSON.stringify(state.wishListArr))

  },
  removeFav:(state,action)=>{
    state.wishListArr.splice(action.payload,1)
    localStorage.setItem('WishList',JSON.stringify(state.wishListArr))

  },
  plusQuantity:(state,action)=>{
    let obj=state.cartArr[action.payload]
    obj.quantity++
    localStorage.setItem('Cart',JSON.stringify(state.cartArr))
    
  },
  minusQuantity:(state,action)=>{
    let obj=state.cartArr[action.payload]
    if(obj.quantity==1){
      state.cartArr.splice(action.payload,1)
    }
    obj.quantity--
    localStorage.setItem('Cart',JSON.stringify(state.cartArr))
  }
  },
})

// Action creators are generated for each case reducer function
export const {add,remove,addToFav,removeFav,plusQuantity,minusQuantity} = cartSlice.actions

export default cartSlice.reducer