import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Header from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import { removeWishlist } from "../Redux/Slice/wishlistSlice";
import { addToCart } from "../Redux/Slice/cartSlice";


function Wishlist() {

  const dispatch = useDispatch()

  const { wishlist } = useSelector(state => state.wishlistReducer)

  // add to cart..
  const handleCart = (product) => {
    dispatch(addToCart(product))
    dispatch(removeWishlist(product?.id))
  }

  return (
    <>
      <Header />

      <div>
        <div style={{ marginTop: "100px" }}>
          <Row className="p-2">
            {

              wishlist?.length > 0 ? wishlist.map(product => (
                <Col className="m-3 p-3">
                  <Card style={{ width: "18rem" }} className="p-4 shadow-sm">
                    <Card.Img
                      variant="top"
                      src={product?.thumbnail}
                    />
                    <Card.Body>
                      <Card.Title>{product?.title}</Card.Title>
                      <Card.Text>
                        {
                        product?.description}
                      </Card.Text>
                      <div className="d-flex justify-content-between">
                        <Button className="btn btn-light" onClick={()=>dispatch(removeWishlist(product?.id))}>
                          <i className="fa-solid fa-trash text-danger"></i>
                        </Button>
                        <Button className="btn btn-light" onClick={()=>handleCart(product)}>
                          <i class="fa-solid fa-cart-shopping text-warning"></i>
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>


              )) : <div className="text-center">
                <img src="https://www.gospeedy.co.in/images/empty.gif" alt="" />
                <h1 className="text-danger mt-5">Your Wishlist Is Empty</h1>

              </div>

            }        </Row>
        </div>
      </div>


    </>
  );
}

export default Wishlist;
