const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')


//midleware
app.use(bodyParser.json())
app.use(morgan('tiny'))

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: Number
})

const Product = mongoose.model('product', productSchema)

require('dotenv/config')


const api = process.env.API_URL

app.listen(3000, ()=>{
    console.log(api)
    console.log('o servidor está rodando em http://localhost:3000')
})



app.get(`${api}/products`, (req, res) =>{
    const product = {
        id: 1,
        name: 'hair dresser',
        image: 'some_url'
    }
    res.send(product)
})

app.post(`${api}/products`, (req, res) =>{
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })

    product.save().then((createdProduct =>{
        res.status(201).json(createdProduct)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

mongoose.set('strictQuery', false)
mongoose.connect(process.env.CONNECTION_STRING,)
.then(()=>{
    console.log('Database connection is ready...')
})

.catch((err)=>{
    console.log(console.log("deu ruim-+"))
})
