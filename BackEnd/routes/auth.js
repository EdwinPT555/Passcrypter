const express = require("express")
const router = express();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const requireLogin = require("../middleware/requireLogin");

// router.get("/home", requireLogin, (req, res) => {
//     res.send("welcome new User!")
// })

router.post("/signup", (req, res) => {
    const { username, email, phone, password } = req.body;
    if (!username || !email || !phone || !password) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User already exists with that Email Id!" })
            }
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        username,
                        email,
                        phone,
                        password: hashedPassword
                    })

                    user.save()
                        .then(user => {
                            res.json({ message: "Successfully Signup " })
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
        })
        .catch(err => {
            console.log(err);
        })
})

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Email and password required!" })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid Email or Password" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        // res.json({ message: "Login Successful" })
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                        const { _id, email, username } = savedUser;
                        res.json({ token, user: { _id, email, username } });
                    }
                    else {
                        return res.status(422).json({ error: "Invalid Email or Password" })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        })

})

module.exports = router