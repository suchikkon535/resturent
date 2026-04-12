const express = require("express")
const cors = require("cors");
// const path = require("path");

const errorHandler = require("./utils/errorHandler");

const userRouter = require("./routers/user.router");
const itemRouter = require("./routers/item.router");
const categoryRouter = require("./routers/category.router");
const addressRouter = require("./routers/address.router");
const orderRouter = require("./routers/order.router");  
const cartRouter = require("./routers/cart.router");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {res.json({ message: "Welcome to the restaurant API" })})
app.use("/api/auth", userRouter);
app.use("/api/items", itemRouter);
app.use("/api/categorys", categoryRouter);
app.use("/api/address", addressRouter);
app.use("/api/orders", orderRouter);
app.use("/api/cart", cartRouter);

app.use(errorHandler);

module.exports = app