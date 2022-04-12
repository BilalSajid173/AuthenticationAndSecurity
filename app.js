
require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")
const md5 = require("md5")

const app = express()
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect("mongodb://localhost:27017/userDB")

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})


const User = mongoose.model("User",userSchema)

app.get("/", function (req, res) {
    res.render("home");
})

app.get("/register", function (req, res) {
    res.render("register");
})

app.get("/login", function (req, res) {
    res.render("login");
})

app.post("/register",function(req,res){
    const email = req.body.username
    const password = md5(req.body.password)

    const newUSer = new User({
        email: email,
        password: password
    })

    newUSer.save(function(err){
        if(err){
            console.log(err)
        } else{
            res.render("secrets")
        }
    })
})


app.post("/login",function(req,res){
    const email = req.body.username
    const password = md5(req.body.password)

    User.findOne({email:email},function(err,foundUser){
        if(foundUser){
            if(foundUser.password === password)
            res.render("secrets")
        } else{
            console.log(err)
        }
    })
})





app.listen(3000, function (err) {
    console.log("Server started")
})