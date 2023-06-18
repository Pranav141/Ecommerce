import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { CartContext } from './ContextReducer';
const Header = () => {
    let linkStyle={textDecoration:"none",color:"white",padding:"0 7px"}
    const info=useContext(CartContext);
    const state=info.state;
  return (
    <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">E-Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" style={linkStyle}>Home</Link>
            <Link to="/cart" style={linkStyle}>Cart {state.length===0?"":state.length}</Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default Header