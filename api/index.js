const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

/* ---->  Routes  <---- */
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe')

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB connected succesfully"))
    .catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute)

const port = process.env.PORT || 5000 ;

app.listen(port, () => {
    console.log(`server started on port : ${port}`);
});