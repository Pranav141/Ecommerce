import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Cards from '../components/Cards';
import Header from '../components/Header';
import Form from 'react-bootstrap/Form';
import { useProductContext } from '../components/ProductContext';
const categories=["men's clothing","jewelery","electronics","women's clothing"];
const Home = () => {
  const [search, setSearch] = useState("")
  const info = useProductContext()
  const state = info?.state
  const productDispatch = info?.dispatch
  const loading = state?.isLoading;
  const products = state?.products;
  const isError = state?.isError

  return (
    <div>
      <Header />
      <Form.Control
        type="text"
        placeholder='Search'
        style={{ width: "85%", margin: "10px auto" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div style={{ display: "block" }}>
          <Form.Select style={{ height: "40px", width: "85%", margin: "0 5px" }} onChange={(e) => { productDispatch({ type: e.target.value });     
        }}>
            <option value="DEFAULT_SORT">Sort ⚡</option>
            <option value="SORT_LOW_TO_HIGH">Sort Price Low To High📈</option>
            <option value="SORT_HIGH_TO_LOW">Sort Price High To Low📉</option>
            <option value="SORT_A_TO_Z">Sort A To Z</option>
            <option value="SORT_Z_TO_A">Sort Z To A</option>

          </Form.Select>

          <div style={{ marginTop: "10px" ,display:"block",alignItems:"flex-start" }}> 
            Categories
            <hr />
            {categories.map((val,idx)=>(
            <div>
            <input type="checkbox" value={val} id={idx}  onChange={e=>{
              productDispatch({type:"CHECK_CATEGORY",category:e.target.value})
              productDispatch({type:"APPLY_FILTER"})
              }}/>
            <label htmlFor={idx}>{val}</label>
            </div>

            ))}
            
          </div>
        </div>
        <Container style={{ borderLeft: "1px solid grey" }}>

          <Row xs={1} sm={1} md={3}>
            {isError ?
              <h3>Api Call Error</h3> :
              loading ?
                <h3>Data is Loading</h3> :
                state?.filter?.category.length===0?
                products?.map((product, idx) =>
                  product.title.toLowerCase().includes(search.toLowerCase()) &&
                  (
                    <Cards product={product} key={idx} />
                  )

                )
              :
              state?.filteredProducts?.map((product, idx) =>
              product.title.toLowerCase().includes(search.toLowerCase()) &&
              (
                <Cards product={product} key={idx} />
              )
            )
              }
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Home