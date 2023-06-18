import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Cards from '../components/Cards';
import Header from '../components/Header';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';

const Home = ({ products, loading }) => {
  const [search, setSearch] = useState("")
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
        {/* <div >
          <h4>
            Filter
          </h4>
          <h6>
            Category
            <hr />
          </h6>

        </div> */}
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Sort
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={e=>{}}>Sort Price Low to High</Dropdown.Item>
            <Dropdown.Item onClick={e=>{}}>Sort Price High to Low</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Container>

          <Row xs={1} sm={1} md={3}>
            {!loading && products?.map((product) =>
              product.title.toLowerCase().includes(search.toLowerCase()) &&
              (
                <Cards product={product} />
              )

            )}
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Home