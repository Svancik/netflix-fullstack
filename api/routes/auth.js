const router = require("express").Router();
//načtení referenčního modelu do které budeme doplňovat data uvnitř této route
const User = require("../models/User"); 
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


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


//LOGIN
router.post("/login", async (req, res) => {
    try{
        //najdeme usera pomocí integrované mongoose metody
        const user = await User.findOne({email: req.body.email});
        //pakliže usera nenajdeme => odesíláme error viz níže
        !user && res.status(401).json("Wrong password or username!")
        //nyní jsme nalezli usera na základě emailu - níže provedeme dekryptaci hesla z DB a porovnání hodnot s req.body.password
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        //pakliže se hesla neshodují => odesíláme error viz níže
        originalPassword !== req.body.password && res.status(401).json("Wrong password or username!");
        //nyní tedy máme shodu v emailu a passwordu (jinak ukončili vykonávání programu kódem výše pomocí res.status)
        // pomocí user._doc získáme veškerá data (vlastnosti) z objektu až na ty které jsme si "vyzobli" = password níže
        const {password, ...info} = user._doc;

        //po verifikaci hesla & username vložíme do JWT tokenu user._id & user.isAdmin => po 7 dnech nebude JWT validní => znovu login
        const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.SECRET_KEY,{expiresIn: "70d"});
        //tento token přidáme k res.status(200).json pomocí spread operátoru - viz níže.
        console.log(accessToken);
        res.status(200).json({...info, accessToken});

    } catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;