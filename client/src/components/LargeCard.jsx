import React, { useContext} from 'react'
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { CartContext } from './ContextReducer';

const LargeCard = ({ item }) => {
    const info = useContext(CartContext);
    const cartData = info.state;
    const cartDispatch = info.dispatch;
    let exist = cartData?.findIndex(val => val.id === item.id)
    console.log(cartData[exist]?.qty);
    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div>
                <Image src={item?.image} alt='Product image' style={{ width: "300px" }} />
            </div>
            <div>
                <h3>
                    {item?.title}
                </h3>
                <p>
                    {item.description}
                    <br />
                    Rating:- {item?.rating.rate}/5
                </p>
                <h5>
                    ${item?.price}
                </h5>
                {
                    exist === -1 ?
                        <Button variant="primary" onClick={() => { cartDispatch({ type: "ADD", id: item.id, title: item.title, price: item.price, category: item.category, image: item.image, rating: item.rating.rate }) }}>Add to Cart</Button>
                        :
                        <>
                            {cartData[exist].qty === 1 ?
                                <Button variant="primary" onClick={() => { cartDispatch({ type: "REMOVE", id: item.id ,index:exist}) }}>Remove</Button>
                                :
                                <Button variant="primary" onClick={() => { cartDispatch({ type: "DECREASE", id: item.id, index:exist }) }}>-</Button>
                            }
                            {cartData[exist].qty}
                            <Button variant="primary" onClick={() => { cartDispatch({ type: "INCREASE", id: item.id, index:exist }) }}>+</Button>
                        </>
                }

            </div>
        </div>
    )    
}

export default LargeCard