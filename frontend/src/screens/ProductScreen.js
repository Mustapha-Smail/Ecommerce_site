import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { Rating, Loader, Message } from '../components'
import { listProductDetails } from '../actions/productActions'

const ProductScreen = () => {
    const params = useParams()
    const navigate = useNavigate()

    const dispatch = useDispatch()
    
    const productDetails = useSelector(state => state.productDetails)

    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(params.id))
    }, [dispatch, params.id])
    
    return ( 
        <>
            <Button variant='light' className='my-3' onClick={()=>navigate(-1)}> Go back</Button>
            {loading 
                ? <Loader /> 
                : error 
                ? <Message variant='danger'>{error}</Message> 
                : <Row>
                    <Col md={6}>
                        {/* Fluid => wrap the image inside its container  */}
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {product.rating}
                                <Rating 
                                    value={product.rating} 
                                    text={`${product.numReviews} reviews`} 
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item> 
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Price: 
                                        </Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Status: 
                                        </Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button className='btn-block' type='button' disabled={product.countInStock === 0 }>
                                        Add To Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            }
        </>
    )
}

export default ProductScreen
