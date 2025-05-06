import { configureStore } from "@reduxjs/toolkit";
import prodSlice from "./Slice/prodSlice";
import wishlistSlice from './Slice/wishlistSlice';
import cartSlice from './Slice/cartSlice';

const cartStore = configureStore({
    reducer:{
        productReducer:prodSlice ,
        wishlistReducer: wishlistSlice ,
        cartReducer:cartSlice,

    }
})

export default cartStore