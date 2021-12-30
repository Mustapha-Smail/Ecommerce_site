import { config } from 'dotenv'
config()
import express from 'express'
import cors from 'cors'
import colors from 'colors'
import connectDB from './config/db.js'
import products from '../backend/data/products.js'

const app = express()

connectDB()

app.use(cors())

app.get('/', (req, res)=>{
    res.send('API is running...')
})

app.get('/api/products', (req, res)=>{
    res.json(products)
})

app.get('/api/product/:id', (req, res)=>{
    const product = products.find(p => p._id === req.params.id)
    res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))
