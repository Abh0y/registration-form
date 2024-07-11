var express = require('express');
var router = express.Router();
var User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/registered", (req, res) => {
    res.render("registered");
});

router.get("/profile",async (req, res) => {
    res.render("profile");
});

router.post("/", async (req, res) => {
    
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        else 
        {
            res.redirect("/profile");
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post("/register",async (req, res) => {

    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            username,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.redirect("/registered"); 

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get("/logout", (req, res) => {
    res.redirect("/");
});

module.exports = router;
