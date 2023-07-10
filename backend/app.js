const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Route imports

const user = require('./routes/userRoutes');
app.use("/api/v1",user)

const book = require('./routes/bookRoutes');
app.use("/api/v1",book);

module.exports = app;