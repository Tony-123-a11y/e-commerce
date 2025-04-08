import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const fetchArr = createAsyncThunk('home/fetchArr',
    async () => {
      console.log('hello')
      const response = await fetch('https://dummyjson.com/products?limit=0')
      const data=await response.json()
      data.products.map((product)=> product.like=false)
      data.products.map((product)=> product.quantity=1)
      return data.products
    },
  )
const initialState = {
  productArr:[],
  filterArr:[],
  categoryArr:[],
  skeleton:true,
}
// const arr=[]
export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
   category:(state,action)=>{
    if(action.payload=='all'){
        state.categoryArr=[...state.productArr]
        return
    }

    
    state.categoryArr= state.productArr.filter((product)=>product.category==action.payload)
    
   },
   search:(state,action)=>{
    if(!action.payload){
      window.location.href='https://e-commerce-plum-ten-99.vercel.app/'
    }
     state.filterArr=state.productArr.filter((product)=>product.category.toLowerCase().includes(action.payload.toLowerCase()) || product.title.toLowerCase().includes(action.payload.toLowerCase()))
     
   },
   like:(state,action)=>{
    state.categoryArr[action.payload].like=!state.categoryArr[action.payload].like
   }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchArr.fulfilled, (state, action) => {
      // Add user to the state array
      state.productArr=action.payload
      state.categoryArr=action.payload
      state.skeleton=false
    })
  },
})


// Action creators are generated for each case reducer function
export const {category,search,like} = homeSlice.actions
export {fetchArr}

export default homeSlice.reducer
