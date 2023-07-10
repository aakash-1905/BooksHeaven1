const express = require("express");
const { createBook,getAllBooks,getBookDetails,createOrUpdateReview } = require("../controllers/book");
const router = express.Router();

router.route('/books').get(getAllBooks);
router.route('/book/:id').get(getBookDetails);
router.route('/review').put(createOrUpdateReview);
router.route('/book/new').post( createBook);


module.exports = router