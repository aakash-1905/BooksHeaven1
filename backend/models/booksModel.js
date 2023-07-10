const mongoose = require ("mongoose");

const booksSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please Enter Book's Name"],
        trim:true
    },
    author:{
        type:String,
        required:[true,"Please Enter Book's Author"]
    },
    
    read:{
        type:Boolean,
        default:false
    },
    publicationYear:Number,
    description:{
        type:String,
    },
    ratings:{
        type:Number,
        default:0
    },
    cover:{
        type:String,
        default:"https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
    },
    review:{
        type:String,
        default:""
    },
})

module.exports = new mongoose.model("Books",booksSchema);