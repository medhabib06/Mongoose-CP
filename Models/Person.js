const mongoose=require('mongoose')
const Schema= mongoose.Schema


//post schema

let personSchema= new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFoods: Array
})

module.exports = mongoose.model("Person",personSchema)