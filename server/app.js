const express = require("express");
const path = require("path");
const http = require("http");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT || "8080";
const indexRouter = require("./routes/index");

const app = express();
const server = http.createServer(app);
// view engine setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

server.listen(PORT, () => console.log("Listening on port: ", PORT));
