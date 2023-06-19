import React from 'react'
import LargeCard from '../components/LargeCard'
import { useParams } from "react-router-dom";
import Header from '../components/Header';
import { useProductContext} from '../components/ProductContext';

const Product = () => {
  let params=useParams()
  const info=useProductContext()
  const state=info?.state
  const products=state?.products;
  let id=params.id
  let item= products?.find(val=>val.id==id)
  
    return (
    <div>
        <Header/>
        <LargeCard item={item}/>
    </div>
  )
}

export default Product