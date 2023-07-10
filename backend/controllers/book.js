const Book = require("../models/booksModel");
const ApiFeatures = require("./apiFeatures");

exports.createBook = async(req,res,next)=> {
    try{
        const book = await Book.create(req.body);
    
        res.status(201).json({
            success:true,
            book
        })
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
};

//get All Books
exports.getAllBooks = async (req,res,next)=>{

    try{
        const bookCount = await Book.countDocuments();
        const resultPerPage = 5;
        const apiFeatures = new ApiFeatures(Book.find(),req.query).search().pagination(resultPerPage);

    const books = await apiFeatures.query;

    res.status(200).json({
        success:true,
        books,
        bookCount    
    })
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
}

// get Book details
exports.getBookDetails = async (req,res,next)=>{
    try{
        const book = await Book.findById(req.params.id);
        if(!book){
            res.status(404).json({success:false,message:"Book not found"});
        }
        res.status(200).json({
            success:true,
            book
        })
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
}



//create or update review 
exports.createOrUpdateReview = async (req,res,next)=>{
   try{
    const {rating ,comment,bookId} = req.body;   
    let rate = rating || 0;
    const book = await Book.findById(bookId);
    if(!book){
        res.status(404).json({success:false,message:"Book not found"});
    }
    if(!book.read)res.status(400).json({success:false,message:"Please read this book to Review or Rate"});
    book.review = comment;
    book.ratings = rate;
    await book.save({validateBeforeSave:false});
    
    res.status(201).json({
        success:true,
    })
   }catch(err){
    res.status(500).json({success:false,message:err.message});
   }
};