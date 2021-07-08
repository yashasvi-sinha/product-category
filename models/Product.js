const {Schema, model} = require('mongoose')


const ProductSchema = new Schema({
    productName: String,
    price: Number,

    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }
    ]
})


module.exports = model('Product', ProductSchema)
