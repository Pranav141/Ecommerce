import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Product from './pages/Product';
import { ContextProvider } from './components/ContextReducer';
import Cart from './pages/Cart';
import { ProductContextProvider } from './components/ProductContext';


function App() { 
  return (
    <div className="App">
  <ProductContextProvider>
      <ContextProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/product/:id' element={<Product/>}/>
          <Route exact path='/cart' element={<Cart />}/>
          
        </Routes>      
      </Router>  
      </ContextProvider>
</ProductContextProvider>
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