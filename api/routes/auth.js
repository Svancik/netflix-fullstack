const router = require("express").Router();
//načtení referenčního modelu do které budeme doplňovat data uvnitř této route
const User = require("../models/User"); 
const CryptoJS = require("crypto-js");


//REGISTER
//nastavení POST methody na URL api/register
router.post("/register", async (req,res) => {
    //vyplnění referenčního modelu User daty z těla POST požadavku na URL api/register
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
    });
    console.log(newUser);
    try{
    const user = await newUser.save();
    res.status(201).json(user);
    } catch(err){
        res.status(500).json(err);
    }
    
});

module.exports = router;