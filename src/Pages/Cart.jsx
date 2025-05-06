import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Header from '../Components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { decrementCart, emptyCart, incrementCart, removeCart } from '../Redux/Slice/cartSlice'




function Cart() {

  // for displaying the cart from home component
  const cart = useSelector(state => state.cartReducer)

  const dispatch = useDispatch()

  // to get the total number of product


  // to get the total price of products in the cart
  const [total,setTotal] = useState(0)
  useEffect(() => {
    if (cart?.length > 0) {
      const totalValue = cart
        .map(product => product?.totalPrice || 0)
        .reduce((p1, p2) => p1 + p2, 0);
  
      setTotal(parseFloat(totalValue.toFixed(2))); // ensures two decimal points as number
    } else {
      setTotal(0);
    }
  }, [cart]);
  

  return (

    <>

      <Header />


      <div style={{ marginTop: "100px" }}>

        {
          cart?.length > 0 ? (

            <div className="container row">
              <div className="col-lg-8">
                <div className="card rounded mt-3 p-3">
                  <table className='table table-bordered text-center align-middle'>
                    <thead>
                      <th>#</th>
                      <th>Title</th>
                      <th>Image</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Action</th>
                    </thead>

                    <tbody>
                
                   { cart.map((product, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{product.title}</td>
                        <td><img className='img-fluid rounded' style={{ maxWidth: "80px" }} src={product.thumbnail} alt="" /></td>
                        <td className='w-50'><button className='btn btn-light btn-sm' onClick={() => dispatch(decrementCart(product.id))}>-</button><input readOnly type="text" value={product.quantity} className='w-25' /><button className='btn btn-light btn-sm' onClick={() => dispatch(incrementCart(product.id))}>+</button></td>
                        <td className='text-danger text-bolder'>${product.totalPrice}</td>
                        <td><button className='btn btn-light' onClick={() => dispatch(removeCart(product.id))}><i className='fa-solid fa-trash text-danger'></i></button></td>
                      </tr>


                      ))
                    }


                    </tbody>
                  </table>

                  <div className="d-flex justify-content-between mt-4">
                    <Button className='btn btn-danger btn-sm' onClick={() => dispatch(emptyCart())}>Empty Cart</Button>
                    <Link to={'/'} className='btn btn-info'>Shop More</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-1"></div>

              <div className="col-lg-3 shadow p-2">
                <div className="card  p-5">
                  <h1>Cart Summary</h1>
                  <hr />
                  <h4>Total Products: <span>{cart.length}</span></h4>
                  <h4>Total Price: <span className='text-success'>{total}</span></h4>
                </div>
                <div className="d-grid">
                  <button className='btn btn-warning' onClick={()=>alert("We are working on it..")}>Checkout</button>
                </div>
              </div>


            </div>
          ) : <div className="text-center">
            <img src="https://www.gospeedy.co.in/images/empty.gif" alt="" />
            <h1 className="text-danger mt-5">Your Cart Is Empty</h1>

          </div>




        }


      </div>


    </>
  )
}

export default Cart
