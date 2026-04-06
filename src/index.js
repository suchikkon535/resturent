const express = require("express")
const cors = require("cors");
// const path = require("path");

const errorHandler = require("./utils/errorHandler");

const userRouter = require("./routers/user.router");
const itemRouter = require("./routers/item.router");
const categoryRouter = require("./routers/category.router");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {res.json({ message: "Welcome to the restaurant API" })})
app.use("/api/auth", userRouter);
app.use("/api/items", itemRouter);
app.use("/api/categorys", categoryRouter);


app.use(errorHandler);

module.exports = app