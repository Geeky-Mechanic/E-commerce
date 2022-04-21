const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
/* ---->  Register  <---- */

router.post("/register", async (req,res) => {

    function Encrypt(pass, key){
        const encJson = CryptoJS.AES.encrypt(JSON.stringify(pass), key).toString();
        let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson))
        return encData;
    }

    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : Encrypt(req.body.password, process.env.PASS_SECRET)
    });
    try {
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    }
    catch(err){
        return res.status(500).json(err);
    }
    
});

/* ---->  Login  <---- */

router.post("/login", async (req,res) => {

    function Decrypt (pass, key){
        const decData = CryptoJS.enc.Base64.parse(pass).toString(CryptoJS.enc.Utf8);
        const bytes = CryptoJS.AES.decrypt(decData, key).toString(CryptoJS.enc.Utf8);
        return JSON.parse(bytes);
    
    }

    try {
        /* ---->  DB query for user  <---- */
        const user = await User.findOne({username: req.body.username});
        /* ---->  Error if no user  <---- */
        if(!user){
            return res.status(401).json("Wrong username" + req.body.username);
        }
        /* ---->  Decrypt stored password to compare with entered password  <---- */
        const decryptedPassword = Decrypt(user.password, process.env.PASS_SECRET);
        if(decryptedPassword !== req.body.password){
             return res.status(401).json("Wrong password");
        }

        /* ---->  Create a token (cookie?) <---- */
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, 
        process.env.JWT_SECRET,
        {expiresIn: "3d"}
        );

        /* ---->  Descructure user to send back only info without password  <---- */
        const { password, ...others } = user._doc;
        return res.status(200).json({...others, accessToken});

    }
    catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});



module.exports = router;