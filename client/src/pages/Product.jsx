import React from 'react'
import LargeCard from '../components/LargeCard'
import { useParams } from "react-router-dom";
import Header from '../components/Header';
const Product = ({products}) => {
  let params=useParams()
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