const mongoose= require('mongoose');

const bookSchema=mongoose.Schema({
    ISBN:String,
    title:String,
    authors:[Number],
    language:String,
    pubDate:String,
    numOfPage:Number,
    category:[String],
    publication:Number
})

const bookModel=mongoose.model("books",bookSchema);

module.exports=bookModel;