import axios from 'axios';
import React, { createContext, useEffect ,useReducer, useContext} from 'react'
export const ProductContext=createContext();

const initialState={
    isLoading:true,
    isError: false,
    products: [],
    filteredProducts:[],
    filter:{category:[]}
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
            // console.log(state.filter.category);
            return {
                ...state,
                products:action.payload,
                isLoading:false,
                isError:false,
                filter:{category:[]}
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
            const newFilteredArr=state?.filteredProducts;
            let newSortFilteredArr=newFilteredArr.sort((a,b)=>{
                return a.price-b.price;
            })
            return {
                ...state,products:newSortArr,isLoading:false,isError:false,filteredProducts:newSortFilteredArr
            }
        case "SORT_HIGH_TO_LOW":
            const newArr1=state.products;
            let newSortArr1=newArr1.sort((a,b)=>{
                return b.price-a.price;
            })
            const newFilteredArr1=state?.filteredProducts;
            let newSortFilteredArr1=newFilteredArr1.sort((a,b)=>{
                return b.price-a.price;
            })
            return {
                ...state,products:newSortArr1,isLoading:false,isError:false,filteredProducts:newSortFilteredArr1
            }
        case "SORT_A_TO_Z":
            const newArr2=state.products;
            let newSortArr2=newArr2.sort((a,b)=>{
                return a.title.localeCompare(b.title);
            })
            const newFilteredArr2=state?.filteredProducts;
            let newSortFilteredArr2=newFilteredArr2.sort((a,b)=>{
                return a.title.localeCompare(b.title);
            })
            return {
                ...state,products:newSortArr2,isLoading:false,isError:false,filteredProducts:newSortFilteredArr2
            }
        case "SORT_Z_TO_A":
            const newArr3=state.products;
            let newSortArr3=newArr3.sort((a,b)=>{
                return b.title.localeCompare(a.title);
            })
            const newFilteredArr3=state?.filteredProducts;
            let newSortFilteredArr3=newFilteredArr3.sort((a,b)=>{
                return b.title.localeCompare(a.title);

            })
            return {
                ...state,products:newSortArr3,isLoading:false,isError:false,filteredProducts:newSortFilteredArr3
            }
        case "DEFAULT_SORT":
            const newArr4=state.products;
            let newSortArr4=newArr4.sort((a,b)=>{
                return a.id-b.id;
            })
            const newFilteredArr4=state?.filteredProducts;
            let newSortFilteredArr4=newFilteredArr4.sort((a,b)=>{
                return a.id-b.id;
            })
            return {
                ...state,products:newSortArr4,isLoading:false,filteredProducts:newSortFilteredArr4
            }
        case "CHECK_CATEGORY":
            const category=state?.filter?.category;
            // console.log(category);
            const exist=category?.find((val)=>val===action.category)    
            if(exist){
                for (let i = 0; i < category?.length; i++) {
                    if (category[i] === action.category) {
                        category?.splice(i, 1);
                    }
                }
            }
            else{
                category.push(action.category);
            }
            return {
                ...state,filter:{category:category}
            }
        case "APPLY_FILTER":
            const newArr5=state?.products;
            const category1=state?.filter?.category;
            const result=[];
            for (let i = 0; i < newArr5.length; i++) {
                for(let j=0;j<category1.length;j++){
                    if(category1[j]===newArr5[i].category){
                        result.push(newArr5[i])
                    }
                }
            }
            return {...state,filteredProducts:result};
            
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

    const [state,dispatch]=useReducer(reducer,initialState); /////////////
    // const info={state,dispatch} 
    
    useEffect(()=>{
        getProductsData(apiUrl);
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



