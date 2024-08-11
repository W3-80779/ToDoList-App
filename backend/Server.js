const express = require("express");
const router = require("./src/router/router")
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();


const PORT = process.env.PORT ;

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDB is connected..."))
    .catch(err => console.log(err.message))

app.use("/post", (req, res) =>{
    console.log("Working");
    res.send({message:"working"})
})
app.use('/', router);

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});