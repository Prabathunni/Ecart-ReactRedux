import React, { useEffect } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../Redux/Slice/prodSlice";
import Header from "../Components/Header";
import { addToWishLists } from "../Redux/Slice/wishlistSlice";
import { addToCart  } from "../Redux/Slice/cartSlice";

function Home() {
  const dispatch = useDispatch();
  const { allProducts, loading, error } = useSelector(
    (state) => state.productReducer
  );

  // addto CART .....
  const cart = useSelector(state=>state.cartReducer)
  const handleCart = (product)=>{
    const existingProduct = cart.find(item=>item.id == product.id)
    if(existingProduct){
      dispatch(addToCart(product))
      alert("item added ")
    }else{
      dispatch(addToCart(product))
      alert("item added")
    }
  }  





  // wishlist ....
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

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>

    <Header insideHome />
    <div style={{ marginTop: "110px",backgroundColor:"grey" }} className="p-3">
        {

          loading ? <div className="text-center mt-5 vh-100">

            <Spinner animation="border" />;
          </div> :



            <Row className="d-flex flex-wrap align-items-stretch">

              {
                allProducts.length > 0 ? allProducts.map(product => (

                  <Col className="px-4 m-3" key={product?.id}>
                    <Card style={{ width: "18rem" }} className="p-4 shadow-sm">
                      <Link to={`/view/${product?.id}`}>
                        <Card.Img 
                          variant="top"
                          src={product?.thumbnail}
                        />
                      </Link>

                      <Card.Body>
                        <Card.Title>{product?.title}</Card.Title>
                        <Card.Text>
                        {product?.description.slice(0,60)}
                        </Card.Text>
                        <div className="d-flex justify-content-between">
                          <Button className="btn btn-light" onClick={()=>handleWishlist(product)}>
                            <i class="fa-solid fa-heart text-danger"></i>
                          </Button>
                          <Button className="btn btn-light"  onClick={()=>handleCart(product)}>
                            <i class="fa-solid fa-cart-shopping text-warning"></i>
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>


                )) : error
              } 
         </Row>

        }

      </div>

    </>
  );
}

export default Home;
