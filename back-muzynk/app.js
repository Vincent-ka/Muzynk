require("dotenv").config();
require("./config/mongo");

const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const morgan = require("morgan"); // morgan est un logger
const app = express();

// POST SETUP
app.use(express.json());

// CORS SETUP
// app.use(cors("*"));
app.use(cors(["http://localhost:3000", "http://localhost:8080"])); 
// obligatoire pour accepter les appels ajax entrant

// API CALL LOGGIN
app.use(morgan("dev"));

// SESSION SETUP
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 }, // in millisec
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60, // 1 day
    }),
    saveUninitialized: true,
    resave: true,
  })
);

//Socket.io

const server = app.listen(3001);

const io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log(socket.id)
    socket.on('SEND_MESSAGE', function(data) {
        io.emit('MESSAGE', data)
    });
}); 



app.get("/", (req, res) => res.send("hello :) my api is working"));
app.use("/users", require("./routes/users"));
app.use("/chats", require("./routes/chats"));
app.use("/forums", require("./routes/forums"));
app.use("/subjects", require("./routes/subjects"));
app.use("/postsForum", require("./routes/postsForum"));
app.use("/feeds", require("./routes/feeds"));
app.use("/postsFeed", require("./routes/postsFeed"));
app.use("/tags", require("./routes/tags"));
app.use("/auth", require("./routes/auth"));


module.exports = app;
