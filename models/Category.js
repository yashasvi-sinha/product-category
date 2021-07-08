const {Schema, model} = require('mongoose')


const CategorySchema = new Schema({
    categoryName: String
})


module.exports = model('Category', CategorySchema)
