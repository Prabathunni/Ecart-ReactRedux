import React, { useEffect, useState } from 'react'
import { Badge, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { searchProducts } from '../Redux/Slice/prodSlice'
import { useDispatch, useSelector } from 'react-redux'


function Header({insideHome}) {
  const dispatch = useDispatch()

  // for Cart...
  const [cartcount,setCartcount] = useState(0)
  const cart = useSelector(state=>state.cartReducer)



  // for wishlist...
  const [wishlistcount,setWishlistCount] = useState(0)
  const { wishlist } = useSelector(state => state.wishlistReducer)

  useEffect(()=>{
    setWishlistCount(wishlist?.length)
    setCartcount(cart?.length)

  },[wishlist,cart])

  return (

    <>

      <div>
        <Navbar expand="lg" className="bg-body-tertiary" fixed='top'>
          <Container>
            <Link to={'/'} style={{ textDecoration: 'none' }}><Navbar.Brand >E-Cart</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            {insideHome&& <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2 w-25"
              onChange={e=>dispatch(searchProducts(e.target.value.toLowerCase()))}
            />
            }          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Link to={'/wishlist'} style={{ textDecoration: "none", fontWeight: "bold" }}><i className="fa-solid fa-heart text-danger px-1" ></i>Wishlist<Badge bg="dark rounded ms-1">{wishlistcount}</Badge></Link>
                <Link to={'/cart'} style={{ textDecoration: "none", fontWeight: "bold" }}><i class="fa-solid fa-cart-shopping text-warning ms-5 px-1"></i>Cart<Badge bg="dark rounded ms-1">{cartcount}</Badge></Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      </div>


    </>
  )
}

export default Header
