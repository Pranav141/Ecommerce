import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Product from './pages/Product';
import { ContextProvider } from './components/ContextReducer';
import Cart from './pages/Cart';

function App() {
  const [products,setProducts]=useState({});
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res=>{setProducts(res.data)})
      .then(res=>setLoading(false))
  }, [])
  console.log(products);
  return (
    <div className="App">
      <ContextProvider>
          
      <Router>
        <Routes>
          <Route exact path='/' element={<Home products={products} loading={loading}/>}/>
          <Route exact path='/product/:id' element={<Product products={products}/>}/>
          <Route exact path='/cart' element={<Cart />}/>
          
        </Routes>      
      </Router>
          
      </ContextProvider>
    </div>
  );
}

export default App;
/*
men's clothing
jewelery
electronics
women's clothing
*/ 