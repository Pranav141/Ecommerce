import React from 'react'
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";
const Cards = ({ product }) => {
    let description=product.description;
    if(description.length>100){
        description=description.slice(0,101);
        description+="..."
    }
    return (
        <Col style={{marginTop:"10px"}}>
            <Card >
                <Card.Img variant="top" src={product.image} style={{width:"100px",margin:"0 auto"}} rounded/>
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                      {description}  
                    </Card.Text>
                    <div style={{display:"flex", justifyContent:"space-evenly"}}>
                    <Card.Text style={{paddingTop:"10px"}}>
                        <h5>

                      ${product.price}
                        </h5>
                    </Card.Text>
                    <Button variant="primary">
                        <Link to={`/product/${product.id}`} style={{color:"white",textDecoration:"none"}}>
                        View Details
                        </Link>
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Cards