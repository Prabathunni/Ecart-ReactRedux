import { createSlice } from "@reduxjs/toolkit";



const wishlistSlice = createSlice({

    name: "wishlist",
    initialState:{
        wishlist:[]
    },
    reducers:{
        addToWishLists:(state,action)=>{
            state.wishlist.push(action.payload)
        },
        removeWishlist:(state,action)=>{
            state.wishlist = state.wishlist.filter(item=>item.id !== action.payload)
        }
    }
})

export const{addToWishLists ,removeWishlist} = wishlistSlice.actions
export default wishlistSlice.reducer