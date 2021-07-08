require('dotenv').config()
const app = require('express')()

const mongoose = require('mongoose')

const Category = require('./models/Category')
const Product = require('./models/Product')


mongoose.connect(process.env.DATABASE_URL, () => console.log('DB Connected'))


app.get('/product', async (req, res) => {


    const products = await Product.find().select('-__v').populate('categories')

    return res.json(products)

})


app.get('/category', async (req, res) => {
    
    const result = await Category.aggregate([
        {
            $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: 'categories',
                as: 'products'
            }
        },
        {
            $project: {
                'products.categories': 0,
                'products.__v': 0,
                '__v': 0
            }
        }
    ])


    return res.json(result)

})


app.listen(3000, () => console.log('Started'))