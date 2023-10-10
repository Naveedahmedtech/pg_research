require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const upload = require("./middlewares/uploadImage");
const ejs = require("ejs");
const apiRoutes = require("./routes/api");

const app = express();

app.use(cors());

app.set("view engine", "ejs");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));

app.use('/api', apiRoutes)

app.listen(PORT, () => console.log(`App listening on ${PORT}`));
