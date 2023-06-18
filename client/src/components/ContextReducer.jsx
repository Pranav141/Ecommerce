import React, {createContext, useReducer } from 'react'

export const CartContext=createContext();


const reducer=(state,action)=>{
switch (action.type) {
    case "ADD":
        console.log("added");
        const newState=[...state,{id:action.id,title:action.title,price:action.price,category:action.category,qty:1,image:action.image}];
        return newState;

    case "INCREASE":
        console.log("+");
        const tempstate1 = state.map((item) => {
            if (item.id === action.id) {
              return { ...item, qty: item.qty + 1 };
            } else {
              return item;
            }
        });
        return tempstate1;
    case "DECREASE":
        console.log("-");
        const tempstate2 = state.map((item) => {
            if (item.id === action.id) {
              return { ...item, qty: item.qty - 1 };
            } else {
              return item;
            }
        });
        return tempstate2;
    case "REMOVE": 
        console.log("removed");
        let newArr=[...state];
        let index=state.findIndex(val=>val.id===action.id)
        newArr.splice(index,1)
        console.log(newArr);
        return newArr;
    default:
        break; 
}
}



export const ContextProvider = ({children}) => {
    const [state,dispatch]=useReducer(reducer,[]);
    const info={state,dispatch};
  return (
    <CartContext.Provider value={info}>
            {children}
    </CartContext.Provider>
  )
}

// export const useCart=()=>useContext(CartContext)
// export const useDispatchCart=()=>useContext(CartDispatchContext)

