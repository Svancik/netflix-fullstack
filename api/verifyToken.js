const jwt = require("jsonwebtoken");


//V routes provádíme middleware akce, verify je další middleware akce kdy do fce vstupuje req, res a next (následující middleware fce)
function verify(req, res, next){
    const authHeader = req.headers.token;
    //zkontrolujeme zda authHeader (JWT token) se skutečně nachází v hlavičce požadavku 
    if (authHeader) {
        //v hlavičce se nachází "Bearer 16546454a" - potřebujeme separovat text Bearer od JWT - proto split níže a volíme 2. slovo
        const token = authHeader.split(" ")[1];
        //pokud bude verify úspěšně tak dešifrujeme data které jsme vložili do JWT = user._id & user.isAdmin => to uložíme do user níže
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) res.status(403).json("Token is not valid!");
            req.user = user;
            //(req, res) předáváme díky next() další middleware fci což je 1 z CRUD operací v users.js kde byl tento soubor volán.
            next();
        });
    } else{
        return res.status(401).json("You are not authenticated to preform this operation!");
    }
}

module.exports = verify;