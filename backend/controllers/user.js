const User = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({
      name,
      email,
      password,
    });
    res.status(201).json({ success: true, newUser });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.addToRead = async (req, res) => {
  try {
    const { userId, title, id, author, publicationYear, description, cover } =
      req.body;
    const user = await User.findById(userId);
    if (!user) {
      res.status(401).json({ success: false, message: "Something went wrong" });
    }
    const book = {
      title: title,
      author,
      publicationYear,
      description,
      cover,
      id,
    };
    user.books.push(book);
    await user.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.getUser = async (req, res) => {
  try{
    const userId=req.query.id;
    const user = await User.findById(userId);
    res.status(200).json({success: true, userGot : user});
  }catch(err){
    res.status(500).json({ success:false, error:err.message });
}
}
// login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1. Check if email and password exist
    if (!email || !password) {
      res
        .status(403)
        .json({ success: false, message: "Please provide email and password" });
    }
    // 1. check if user exists
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(401).json({ success: false, message: "Invalid Credentials" });
    }
    // 2. check if password is correct
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid Credentials" });
    }
    // 3. send token to client
    const token = user.getJWTToken();

    sendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// logout user
exports.logoutUser = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    Message: "Logged out",
  });
};

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  //options for the cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};



//create or update review 
exports.createOrUpdateReview = async (req,res)=>{
  try{
   const {rating ,review,userId, bookId} = req.body; 
   
   let rate = rating || 0;
   const user = await User.findById(userId);
   const book = user.books.find((re)=>re.id ==bookId);
   console.log(book)
   book.review = review;
   book.rating = rating;
   await user.save({validateBeforeSave:false});
   
   res.status(201).json({
       success:true,
   })
  }catch(err){
   res.status(500).json({success:false,message:err.message});
  }
};