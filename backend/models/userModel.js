const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//config
dotenv.config({path:"Backend/config/config.env"})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false
    },
    books:[{
        id:{type: String, require: true},
        title:{
            type:String,
            required:[true,"Please Enter Book's Name"],
            trim:true
        },
        author:{
            type:String,
            required:[true,"Please Enter Book's Author"]
        },
        cover:{
            type:String,
            default:"https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
        },
        publicationYear:Number,
        description:{
            type:String,
        },
        review: String,
        read:{
            type: Boolean,
            default: false
        },
        rating: {
            type: Number,
            default: 0
        },
        review:{
            type:String,
            default:"",
        }
      }]
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//JSON WEB TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });

}

//PASSWORD VERIFICATION
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


module.exports = mongoose.model('User', userSchema);
