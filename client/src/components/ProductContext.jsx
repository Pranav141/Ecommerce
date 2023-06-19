import axios from 'axios';
import React, { createContext, useEffect ,useReducer, useContext} from 'react'
export const ProductContext=createContext();

const initialState={
    isLoading:true,
    isError: false,
    products: [],
}
const reducer=(state,action)=>{
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                isLoading:true,
                isError:false,
            };

        case "SET_API_DATA":
            return {
                ...state,
                products:action.payload,
                isLoading:false,
                isError:false,
            }
        case "API_ERROR":
            return {
                ...state,
                isError:true
            }
        case "SORT_LOW_TO_HIGH":
            const newArr=state.products;
            let newSortArr=newArr.sort((a,b)=>{
                return a.price-b.price;
            })
            return {
                ...state,products:newSortArr,isLoading:false,isError:false
            }
        case "SORT_HIGH_TO_LOW":
            const newArr1=state.products;
            let newSortArr1=newArr1.sort((a,b)=>{
                return b.price-a.price;
            })
            return {
                ...state,products:newSortArr1,isLoading:false,isError:false
            }

        default:
            return state;
            break;
    }
}
const apiUrl="https://fakestoreapi.com/products"




export const ProductContextProvider = ({children}) => {

const getProductsData=async (url)=>{
    dispatch({tpye:"SET_LOADING"});
    // console.log(state);
    try {
        const res=await axios.get(url);
        const products=await res.data;
        // console.log(products);
        dispatch({type:"SET_API_DATA",payload:products})
    } catch (error) {
        dispatch({type:"API_ERROR"})
    }
}

    const [state,dispatch]=useReducer(reducer,initialState); ///////////////
    // const info={state,dispatch} 
    
    useEffect(()=>{
        console.log("yes i am running");
        getProductsData(apiUrl);
        // console.log(state);    
    },[])
    console.log(state);  
    return ( 
    <ProductContext.Provider value={{state,dispatch}}>    
        {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => {
    return useContext(ProductContext);
  };
























// import { createContext, useContext, useEffect, useReducer } from "react";
// import axios from "axios";
// import reducer from "../reducer/productReducer";

// const AppContext = createContext();

// const API = "https://api.pujakaitem.com/api/products";

// const initialState = {
//   isLoading: false,
//   isError: false,
//   products: [],
//   featureProducts: [],
//   isSingleLoading: false,
//   singleProduct: {},
// };

// const AppProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const getProducts = async (url) => {
//     dispatch({ type: "SET_LOADING" });
//     try {
//       const res = await axios.get(url);
//       const products = await res.data;
//       dispatch({ type: "SET_API_DATA", payload: products });
//     } catch (error) {
//       dispatch({ type: "API_ERROR" });
//     }
//   };

//   // my 2nd api call for single product

//   const getSingleProduct = async (url) => {
//     dispatch({ type: "SET_SINGLE_LOADING" });
//     try {
//       const res = await axios.get(url);
//       const singleProduct = await res.data;
//       dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
//     } catch (error) {
//       dispatch({ type: "SET_SINGLE_ERROR" });
//     }
//   };

//   useEffect(() => {
//     getProducts(API);
//   }, []);

//   return (
//     <AppContext.Provider value={{ ...state, getSingleProduct }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// // custom hooks
// const useProductContext = () => {
//   return useContext(AppContext);
// };

