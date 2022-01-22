import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { FormContainer, CheckoutSteps } from '../components'

import { savePaymentMethod } from '../actions/cartActions'


const PaymentScreen = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    
    if(!shippingAddress){
        navigate('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('Paypal')
    

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod({ paymentMethod }))

        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check 
                            type='radio' 
                            label='Paypal or Credit Card'
                            id='Paypal'
                            name='paymentMethod'
                            value='Paypal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button 
                    type='submit'
                    variant='primary'
                    className='mt-3'
                >
                    Continue
                </Button>


            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
