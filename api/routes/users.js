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
//GET
//GET ALL
//GET USER STATS (No. users / month)


module.exports = router;