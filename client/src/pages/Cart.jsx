import Header from '../components/Header'
import React, { useContext } from 'react'

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import {  CartContext } from '../components/ContextReducer';
import Button from 'react-bootstrap/Button';

const Cart = () => {
    const info=useContext(CartContext);
    const cartData=info.state;
    const cartDispatch=info.dispatch;
    console.log(cartData);
    const total = cartData.reduce((total, item) => {
        return total + item.price * item.qty;
      }, 0);
    return (
    <div>
        <Header/>
        {cartData.length===0?<h3 style={{marginTop:"20px"}}>
        Cart is Empty
        <br />
        Bhikari Kuch lele😊
        </h3>:
        <div>

        {cartData.map((item)=>(
        <Card style={{width:"80%",margin:"10px auto"}} key={item.id}>
            <div style={{display:"flex",justifyContent:"space-evenly",padding:"10px 10px"}}>
                <Image src={item.image} style={{width:"15%",height:"auto"}}/>
                <div>
                    <h5>
                    {item.title}
                    </h5>
                    <p>
                    Category:- {item.category}<br/>
                    Quantity:- {item.qty}<br/>
                    Single Piece:- {item.price}<br/>
                    Total Price:- {item.qty*item.price}
                    </p>
                </div>
                <div>
                    {
                        item.qty<=1?
                        <Button variant="primary" onClick={()=>{cartDispatch({type:"REMOVE",id:item.id})}}>Remove</Button>
                        :
                        <Button variant="primary" onClick={()=>{cartDispatch({type:"DECREASE",id:item.id})}}>-</Button>
                    }
                    {item.qty}
                    <Button variant="primary" onClick={()=>{cartDispatch({type:"INCREASE",id:item.id})}}>+</Button>

                </div>
            </div>
        </Card>
        ))}
        <hr />
        <h4>

        Total Price:- ${total}
        </h4>
        </div>
        }
    </div>
  )
}

export default Cart