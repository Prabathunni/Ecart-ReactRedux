import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const result = await axios.get("https://dummyjson.com/products")

    localStorage.setItem("allProducts",JSON.stringify(result.data.products))

    return result.data.products
})

const productSlice = createSlice({
    name: "products",
    initialState: {
        allProducts: [],
        allProductsDummy:[],
        error: "",
        loading:false
    },
    reducers: {
        searchProducts:(state,action)=>{
            state.allProducts = state.allProductsDummy.filter(item=>item.title.toLowerCase().includes(action.payload))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.allProducts = action.payload
            state.allProductsDummy = action.payload
            state.loading = false
        })
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.allProducts = []
            state.allProductsDummy =[]
            state.loading = true
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.allProducts = []
            state.allProductsDummy = []
            state.error = "api failed"
            state.loading = false
        })

    }
})

export const {searchProducts} = productSlice.actions
export default productSlice.reducer