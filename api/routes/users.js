const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");

//UPDATE
router.put("/:id", verify, async (req,res) => {
if(req.user.id === req.params.id || req.user.isAdmin){
    //pokud updatujeme heslo (tzn. je v body requestu) tak musíme opět nové heslo zašifrovat
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
    }
    try {
        //pomocí kódu níže $đet req.body budou updatována všechna data kde bude shoda s tělem požadavku a nějaká změna. Díky new vrátí nového usera.
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true});
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
} else{
    res.status(403).json("You can update only your account!")
}
});
//DELETE
router.delete("/:id", verify, async (req,res) => {
    //req.user.id získáváme z verify metody výše a tam to získáváme z JWT tokenu
    if(req.user.id === req.params.id || req.user.isAdmin){
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User had been deleted...");
        } catch (error) {
            res.status(500).json(error);
        }
    } else{
        res.status(403).json("You can delete only your account!")
    }
    });    
//GET
//nepotřebujeme verifikovat - kdokoliv si může zobrazit usera na základě userId - nesmíme však sdílet heslo.
router.get("/find/:id", async (req,res) => {
        try {
            const user = await User.findById(req.params.id);
            const {password, ...info} = user._doc;
            res.status(200).json(info);
        } catch (error) {
            res.status(500).json(error);
        }    
    });
//GET ALL
//zde potřebujeme verifikovat - pouze administrátor má oprvánění získat všechny usery
router.get("/", verify, async (req,res) => {
    const query = req.query.new;
    if(req.user.isAdmin){
        try {
            //_id:-1 nám předá ty nejdřívější data;
            const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find()
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    } else{
        res.status(403).json("You are not allowed to see all users!")
    }
    }); 
//GET USER STATS (No. users / month)
router.get("/stats", async (req,res) =>{
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);

    try {
        // Pomocí kódu níže získáme počet uživatelů za daný měsíc díky agregační funkci MongoDB
        const data = await User.aggregate([
            {
                //project nám označuje jaké data (fields) budem chtít zobrazit - více zde 
                $project:{
                    month: {$month: "$createdAt"}   //pomocí $month získáme z timestampu měsíc ze sloupce "createdAt" (jde takto i $year)
                }
            },
            {
                $group: {
                    _id: "$month",  //zde nastavujeme že seskupujeme podle měsíců které jsme získali v kódu výše
                    total: {$sum:1}, //zobrazujeme totální součet všech uživatelů v daném měsíci který jsme seskupili na řádku výše
                },
            },
        ]);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;