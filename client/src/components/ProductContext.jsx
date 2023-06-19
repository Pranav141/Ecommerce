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
        case "SORT_A_TO_Z":
            const newArr2=state.products;
            let newSortArr2=newArr2.sort((a,b)=>{
                return a.title.localeCompare(b.title);
            })
            return {
                ...state,products:newSortArr2,isLoading:false,isError:false
            }
        case "SORT_Z_TO_A":
            const newArr3=state.products;
            let newSortArr3=newArr3.sort((a,b)=>{
                return b.title.localeCompare(a.title);

            })
            return {
                ...state,products:newSortArr3,isLoading:false,isError:false
            }
        default:
            return state;
            
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



