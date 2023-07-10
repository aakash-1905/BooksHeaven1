const express = require('express');
const { registerUser, loginUser,logoutUser ,addToRead,getUser,createOrUpdateReview} = require('../controllers/user');
const router = express.Router();

router.route('/user/register').post(registerUser);
router.route('/user/login').post(loginUser);
router.route("/user/logout").get(logoutUser);
router.route("/user/addToRead").put(addToRead);
router.route("/user/getUser").get(getUser);
router.route("/user/addReview").put(createOrUpdateReview);

module.exports = router;