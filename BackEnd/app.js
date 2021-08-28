const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");

//MONGO DB CONNECTION
mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
})
mongoose.connection.on("connected", () => {
    console.log("<------ Connected to MongoDB ------>");
})
mongoose.connection.on("error", (err) => {
    console.log("!!!!!  ERROR !!!!!");
    console.log(err);
})

require("./models/user");
require("./models/card");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/card"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`<----- Server Running at ${PORT} ----->`);
})
