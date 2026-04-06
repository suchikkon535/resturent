require("dotenv").config();
const app = require("./src/index")
const connectDb = require("./src/config/db")

const PORT = process.env.PORT

connectDb();

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is on in port:${PORT}`)
})