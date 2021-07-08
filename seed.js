require('dotenv').config()

const mongoose = require('mongoose')

const Category = require('./models/Category')
const Product = require('./models/Product')

const categories = [
    { categoryName: "Food"},
    { categoryName: 'Books'},
    { categoryName: "Fruits" }
]

const products = [
    {
        productName: 'Oranges',
        price: 45.1,
        categories: [{ categoryName: 'Food'}, { categoryName: 'Fruits' }]
    },
    {
        productName: 'Apples',
        price: 100,
        categories: [{ categoryName: 'Fruits' }]
    },
    {
        productName: 'Bread',
        price: 25,
        categories: [{ categoryName: 'Food' }]
    },
    {
        productName: 'The Bible',
        price: 200,
        categories: [{ categoryName: 'Books'} ]
    }
]


mongoose.connect(process.env.DATABASE_URL, async () => {
    console.log('Connected')

    const result = await Category.deleteMany()
    console.log(`Deleted Category: ${result.deletedCount}`)

    const insertedCategories = await Category.insertMany(categories)
    console.log(`Inserted Category: `, insertedCategories)


    products.forEach(product => {

        product.categories.forEach(cat => {
            cat._id = insertedCategories.find(c => c.categoryName === cat.categoryName)._id
        })

    })

    // console.log('Modified Products', JSON.stringify(products, null, 3))

    const deleteProducts = await Product.deleteMany()
    console.log(`Deleted Products: ${deleteProducts.deletedCount}`)

    const insertedProduct = await Product.insertMany(products)
    console.log(`Inserted Products: `, insertedProduct)

})