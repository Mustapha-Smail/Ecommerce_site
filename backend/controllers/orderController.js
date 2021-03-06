import asyncHandler from 'express-async-handler'
import Order from '../models/Order.js'

// @desc    Create new order 
// @route   POST /api/orders
// @access  Private 
const addOrderItems = asyncHandler(async (req, res) => {

    const { 
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        taxPrice, 
        ShippingPrice, 
        totalPrice 
    } = req.body

    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = new Order({
            orderItems, 
            user: req.user._id,
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            ShippingPrice, 
            totalPrice,
        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }

})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private 
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order){
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc    Update Order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private 
const updateOrderToPiad = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid = true; 
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id, 
            status: req.body.status, 
            updat_time : req.body.updat_time, 
            email_address : req.body.payer.email_address, 
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

export {
    addOrderItems,
    getOrderById,
    updateOrderToPiad
}