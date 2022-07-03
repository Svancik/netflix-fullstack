const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");

//CREATE
router.post("/", verify, async (req,res) => {
if(req.user.isAdmin){
    const newList = new List(req.body);
    try {
        const savedList = await newList.save();
        res.status(201).json(savedList);
    } catch (error) {
        res.status(500).json(error);
    }
} else{
    res.status(403).json("You are not allowed to create!");
}
});

//DELETE
router.delete("/:id", verify, async (req,res) => {
    if(req.user.isAdmin){
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(201).json("The list has been deleted...");
        } catch (error) {
            res.status(500).json(error);
        }
    } else{
        res.status(403).json("You are not allowed to create!");
    }
    });
    

/*GET LISTS
jsou 3 situace:
    - fetch movies lists
    - fetch series lists
    - fetch title screen lists
*/

router.get("/", verify, async (req,res)=>{
    const typeQuery = req.query.type;   // zkontrolujeme zda v URL je query pro typ (movie / series)=> když není tak úvodní stránka
    const genreQuery = req.query.genre;
    let list = [];

    try {
        if(typeQuery){  //pokud jsme si zvolili movies/series
            if(genreQuery){ //pokud jsme si zvolili žánr u movies/series
                list = await List.aggregate([{$sample:{size:10}}, {$match:{type:typeQuery, genre:genreQuery}}])
            }
            else{
                list = await List.aggregate([{$sample:{size:10}}, {$match:{type:typeQuery}}])
            }
        } 
        else{ //pokud jsme si nezvolili nic => úvodní obrazovka
            list = await List.aggregate([{$sample:{size:10}}])
        }
    res.status(200).json(list);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;