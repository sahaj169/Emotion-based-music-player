
const util = require("util");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const { spawn } = require("child_process");
const fs = require("fs");
const readline = require("readline");

const mongoose = require("mongoose");

const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "Emotion based music player.",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(
  "mongodb+srv://Sahaj-Ghatiya:Sahajjugal@169@cluster0.mjhml.mongodb.net/emomusicDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  fullname: String,
  username: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/forget", (req, res) => {
  res.render("forget");
});


app.get("/home", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("home");
  } else {
    res.redirect("/login");
  }
});

var detectedMood="default"

app.get("/loading",(req, res)=>{
  res.render("loading");
  const childPython = spawn("python", ["detect.py", count]);
  childPython.stdout.on("data", (data) => {
    detectedMood = data.toString();
  });
  count++;
})



app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/home");
      });
    }
  });
});

app.post("/", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/home");
      });
    }
  });
});



app.post("/signup", (req, res) => {
  User.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/signup");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/home");
        });
      }
    }
  );
});

var count = 0;

app.post("/home", (req, res) => {
  const dataURI = req.body.datauri;
  const dataURIcut = dataURI.substring(23);
  fs.writeFile(`datauri${count}.txt`, dataURIcut, (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/loading")
});

app.post("/loading",(req, res)=>{
  setTimeout(()=>{
  res.render("mood", { mood: detectedMood.trim() });
  },25000)
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server running on port 3000");
});

