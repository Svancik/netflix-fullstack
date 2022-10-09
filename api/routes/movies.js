const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

//CREATE
router.post("/", verify, async (req,res) => {
if(req.user.isAdmin){
    const newMovie = new Movie(req.body);
    try {
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (error) {
        res.status(500).json(error);
    }
} else{
    res.status(403).json("You are not allowed to create!");
}
});

//UPDATE
router.put("/:id", verify, async (req,res) => {
    if(req.user.isAdmin){
        try {
            res.json("YOU ARE IN");
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true});
            res.status(200).json(updatedMovie);
        } catch (error) {
            res.status(500).json(error);
        }
    } else{
        res.status(403).json("You are not allowed to update!");
    }
    });

//DELETE
router.delete("/:id", verify, async (req,res) => {
    if(req.user.isAdmin){
        try {
            await Movie.findByIdAndDelete(req.params.id)
            res.status(200).json("The movie has been deleted.");
        } catch (error) {
            
            res.status(500).json(error).json(req.user.isAdmin);
        }
    } else{
        res.status(403).json("You are not allowed to update!");
    }
    });

//GET
router.get("/find/:id", verify, async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//GET RANDOM
router.get("/random", verify, async (req,res) => {
    const type = req.query.type;
    let movie;
    try {
        
        if(type === "series"){
            //pomocí mongoDB agregační fce najdeme filmy u kterých je shoda že mají isSeries: true => náhodně vygenerujeme seriál
            movie = await Movie.aggregate([
                {$match: {
                    $and:[
                        {isSeries: true},
                        {genre: "Anime"}
                    ]
                }},                        
                {$sample: {size: 1}}
            ]); 
        } else if (type === "series"){
            //pokud není isSeries true tak náhodně vygenerujeme film pomocí agregační fce => tento film bývá na úvodní stránce
            movie = await Movie.aggregate([
                {$match: {
                    $and:[
                        {isSeries: false},
                        {genre: "Anime"}
                    ]
                }},              
                {$sample: {size: 1}},
            ]);
        }
        else{
            movie = await Movie.aggregate([
                {$match: {              
                        genre: "Anime"                   
                }},              
                {$sample: {size: 1}}
            ]);
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(403).json(error);
    }    
});

//GET ALL MOVIES
router.get("/", verify, async (req,res) => {
    if(req.user.isAdmin){
        try {
            const movies = await Movie.find();
            //pomocí reverse seřadíme opačně pole abychom nejnovější filmy měli na 1 místě.
            res.status(200).json(movies.reverse());
        } catch (error) {
            res.status(500).json(error);
        }
    } else{
        res.status(403).json("You are not allowed to update!");
    }
    });

module.exports = router;