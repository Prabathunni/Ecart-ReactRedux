import { createSlice } from "@reduxjs/toolkit";



const cartSlice = createSlice({

    name:"cart",
    initialState:[],
    reducers:{
        addToCart:(state,action) => {
            const existingProducts = state.find(item=>item.id == action.payload.id)
            if(existingProducts){
                const remainingProduct = state.filter(item=>item.id!=existingProducts.id);
                existingProducts.quantity++;
                existingProducts.totalPrice = existingProducts.price*existingProducts.quantity;
                state = [...remainingProduct,existingProducts] ;
            }else{
                state.push({...action.payload,quantity:1,totalPrice:action.payload.price})
            }
        },
        incrementCart:(state,action) => {
            const existingProducts = state.find(item=>item.id == action.payload)
            if(existingProducts){
                existingProducts.quantity++;
                existingProducts.totalPrice = existingProducts.price*existingProducts.quantity;

            }

        },
        decrementCart:(state,action) => {
            const existingProducts = state.find(item=>item.id == action.payload)
            if(existingProducts && existingProducts.quantity>1){
                existingProducts.quantity-- ; 
                existingProducts.totalPrice = existingProducts.price*existingProducts.quantity
            }
        },
        emptyCart:(state) => {
            return state = []
        },
        removeCart:(state,action) => {
            return state = state.filter(item=>item.id !== action.payload)
        }

    }
})


 
export const{addToCart , incrementCart ,decrementCart, emptyCart , removeCart} = cartSlice.actions
export default cartSlice.reducer