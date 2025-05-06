import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Header from "../Components/Header";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishLists } from "../Redux/Slice/wishlistSlice";
import { addToCart } from "../Redux/Slice/cartSlice";

function View() {

  const [product,setProduct] = useState({})
  const {id} = useParams()  
  const dispatch = useDispatch()

  // for add to cart..
  const cart = useSelector(state=>state.cartReducer)
  const handleCart = (product) => {
    const existingProduct = cart.find(item=>item.id == product.id)
    if(existingProduct){
      dispatch(addToCart(product))
      alert("item added")
    }else{
      dispatch(addToCart(product))
      alert("item added..")
    }
  }


  // for adding wishlist..
  const {wishlist} = useSelector(state=>state.wishlistReducer)
  const handleWishlist = (product)=>{
    const existingProduct = wishlist.find(item=>item.id == product.id)
    if(existingProduct){
      alert("item already exists...")
    }else{
      dispatch(addToWishLists(product))
      alert("item added")
    }
  }  

  

  useEffect(() =>{
    const allProducts = JSON.parse(localStorage.getItem("allProducts"))
    
    const findProduct = allProducts.find(item=>item.id === Number(id))


    
    setProduct(findProduct)

  },[id]);

  
  return (
    <>

  <Header/>

  <div>
      <div style={{ marginTop: "100px" }}>
        <div className="container row m-5">
          <div className="col-lg-4">
            <img
              className="img-fluid rounded shadow"
              style={{ maxWidth: "400px" }}
              src={product?.thumbnail}
              alt=""
            />
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-7 d-flex justify-content-center align-items-center">
            <div>
              <p>pid:{product.id}</p>
              <h1>{product.title}</h1>
              <p>
                {product.description}
              </p>
              <h3>
                Price : <span className="text-danger">${product.price}</span>
              </h3>
              <div className="d-flex justify-content-between m-3">
              <Button className="btn btn-dark" onClick={()=>handleWishlist(product)}>Add to Wishlist 
                <i class="fa-solid fa-heart text-danger ms-2 fa-lg"></i>
              </Button>
              <Button className="btn btn-dark" onClick={()=>handleCart(product)}>Add to Cart
                <i class="fa-solid fa-cart-shopping text-warning ms-2 fa-lg"></i>
              </Button>
            </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    
    </>
  );
}

export default View;
