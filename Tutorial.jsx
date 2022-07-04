/*
0) Inicializace nového REACT v18 projektu:
Kód níže nainstaluje nejaktuálnější verzi reactu:
    npx create-react-app "my-netflix"
    
-----------------------------------------------------------------------------------------------------------------------------------
A1) Instalace a používání SASS - náhrada stylizace za CSS
a) npm add sass
b) Vytvoříme nový soubor app.scss (SASS soubor).
c) Nadefinujeme si hlavní barvy v "app.scss" jako proměnné - k těmto uloženým barvám budeme přistupovat ve všech komponentách.
    - Vytvoříme si proměnnou "main-color" uvnitř root (root je přístupný všude) - viz níže: */
        :root{
            --main-color: #0b0b0b
        }/*
d) K této proměnné "main-color" budeme přistupovat uvnitř "home.scss" souboru pro "Home.jsx"

-----------------------------------------------------------------------------------------------------------------------------------
B1) Instalace a použití Material-UI ikon (od v18)
a) npm install @mui/material @emotion/react @emotion/styled --legacy-peer-deps
b) npm install @mui/icons-material --legacy-peer-deps
c) Napíšeme vždy název ikony do TAGU a automaticky se nám naimportuje soubor.


-----------------------------------------------------------------------------------------------------------------------------------
C1) DROPDOWN Navbar menu
"PŘIŠPENDLENÍ DIVU"
a) Vytvoříme si Navbar ve kterém budou položky seznamu uvnitř <div className="options"/>  */
    //Navbar.jsx
    <div className="profile">
        <ArrowDropDown className="icon" />
        <div className="options">
            <span>Settings</span>
            <span>Logout</span>
        </div>
    </div> /*
b) Těmto položkám defaultně nastavíme že display:none a při :hover se zobrazí => POUŽIJEME PSEUDO PARENT SELECTOR = &:hover 
    - Pomocí &:hover označujeme PARENT CLASS neboli rodičovskou třídu, což je v našem případě <div className="profile">. */
    //navbar.scss
    .profile{
        .options{
            display: none;
        }
        &:hover{
            .options{
                display: flex;
            }
        }
    } /*
"ZMĚNA BARVY PŘI SCROLLOVÁNÍ (top = transparent, scroll = black)"
c) Budeme používat useState abychom určili zda jsme v pozici top / scroll.
    - window.pageYOffset nám určuje zda jsme v pozici top (= 0), nebo právě scrollujeme po ose Y (> 0)
    - window.onscroll() je window metoda která se zavolá PŘI KAŽDÉM SCROLLOVÁNÍ */ 
    //Navbar.jsx
    const [isScrolled, setIsScroled] = useState(false);
    window.onscroll = () => {
      setIsScroled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);    //tímto zabráníme nekonečnému cyklení protože nasavím onscroll na null.
    };
    console.log(isScrolled); /* nejdříve bude false a při scrollování true
d) Na základě state "isScrolled" z useState() se bude kondičně stylovat celý div. */
    //Navbar.jsx
    <div className={isScrolled ? "navbar scrolled" : "navbar"}></div> /*




---------------------------------------------------------------------------------------------------------------------------------------  
D1) PURE REACT NETFLIX SLIDER

a) POSOUVÁNÍ UKÁZEK FILEM V NĚKOLIKA SEZNAMECH - použijeme k tomu "transform: translateX(0px);"
    a1) pomocí slideNumber ve state dovolíme / zakážeme posouvat se v sidebaru (pokud jsme na začátku - nemůžeme do leva a pokud jsme na konci - nemůžeme do prava). */
    // List.jsx
    const listRef = useRef();
    const [slideNumber, setSlideNumber] = useState(0);
    const handleClick = (direction) => {
      let distance = listRef.current.getBoundingClientRect().x - 50;
      if (direction === "left" && slideNumber > 0) {
        /* pomocí useRef jsme si označili HTML element a měníme mu ve style "transform: translateX" pro posuv itemů v sidebaru */
        listRef.current.style.transform = `translateX(${230 + distance}px)`;
        /* při kliknutí na levou šipku ponížíme slideNumber ve state dokud se nedostaneme na 0 */
        setSlideNumber(slideNumber - 1);
      }/*
      a2) pomocí isMoved ve state si nastavíme zda se zobrazí šipka - nechceme aby se zobrazovala šipka doleva pokud jsme na kraji
  
------------------------------------------------------------------------------------------------------------------------------------------
E1) REACT NETFLIX HOVER EFFECT

a) Nastavíme si aby při hoveru se do state uložila informace že jsme najeli "HOVEROVALI" na daný film */
// ListItem.jsx
<div className="listItem" style={{ left: isHovered && index * 225 - 50 + index * 2.5 }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)/>/*
b) Pokud je splněna podmínka isHovered === true ve state, tak přehrajeme video a zobrazíme prvky (like, dislike, popis), jinak defaultně zobrazíme obrázek. */
// ListItem.jsx
<img
src="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
alt=""
/>
isHovered && (
<>
  <video src={trailer} autoPlay={true} loop />
  <div className="itemInfo">
    <div className="icons">
      <PlayArrow />
      <Add />
      <ThumbUpAltOutlined />
      <ThumbDownOutlined />
    </div>
    <div className="itemInfoTop">
      <span>1 hour 14 mins</span>
      <span className="limit">+ 16</span>
      <span>1999</span>
    </div>
    <div className="desc">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut
      soluta at repudiandae numquam perspiciatis. Inventore, molestias
      mollitia.
    </div>
    <div className="genre">Action</div>
  </div>
</>
)/*

TIP: ALT + kursor = označení vícero řádků

--------------------------------------------------------------------------------------------------------------------------------------------------------------------
F1) REACT REGISTER PAGE DESIGN
Pomocí linear gradient  si nastavíme u background obrázku přechod stínu. */
//regiser.scss
.register{
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 100%
    ),
    url("https://cdn.hipwallpaper.com/i/98/21/dUyCkp.jpg"); /*

----------------------------------------------------------------------------------------------------------------
G1) REACT LOGIN PAGE DESIGN
Kopie Register page s mírnou úpravou.

BACKEND
PROBLÉM S INTEGRACÍ FE & BE
Nyní řeším takto:
    - založení nového repozitáře GIT
    - stáhnutí client repozitáře jak .zip 
    - vytvoření nové složky / projektu
    - vložení clientu složek z .zip 
    - napojení na nový repozitář GIT

-------------------------------------------------------------------------------------------------------------------------
H1) Instalace knihoven k projektu
npm i express mongoose nodemon dotenv jsonwebtoken

Jak nastavit abychom nemuseli při každé změně dělat node index.js?
ZMĚNÍME SCRIPTS v package.json:
// api/package.json
Původní: */
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
}, /*
Nové:
  "scripts": {
    "test": "nodemon index.js"
  },


--------------------------------------------------------------------------------- 
I0) NODE.JS MONGODB CONNECTION */
//api/.env
MONGO_URL = mongodb+srv://radek:radek@mern.ba4yo.mongodb.net/?retryWrites=true&w=majority
//api/index.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DB Connection Successfull")).catch(err=>console.log(err));
}
app.listen(8800, ()=>{
    console.log("Backend server is running!");
}); /*


----------------------------------------------------------------------------------------------------------------------------
J0) REST API MODELS
Vytvoříme si referenční schéma pomocí mongoose knihovny - viz ukážka níže: */
//api/models/List.js
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username:{type:String, required: true, unique:true},
    email:{type:String, required: true, unique:true},
    password:{type:String, required: true},
    profilePic:{type:String, default:""},
    isAdmin:{type: Boolean, default: false},
},{timestamps: true}
);
module.exports = mongoose.model("User", UserSchema); /*

Obdobně to uděláme i u ostatních modelů v souborech Movie.js & List.js

------------------------------------------------------------------------------------------------------------------
K0) REST API ROUTES
JAK NASTAVIT SPECIFICKY DO KTERÉ DATABÁZE SE BUDOU DATA UKLÁDAT V MONGODB?

Je třeba specifikovat parametr dbName:*/ 
async function main() {
  await mongoose.connect(process.env.MONGO_URL, {dbName: "netflix"}).then(()=>console.log("DB Connection Successfull")).catch(err=>console.log(err));
}
/*

---------------------------------------------------------------------------------------------------------------------------
L0) LOGIN WITH JWT AUTHENTICATION
a) Naprogramování Loginu bez JWT */
//api/routes/auth.js
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
      res.status(200).json(info);

  } catch(err){
      res.status(500).json(err);
  }
});/*

b) Aplikace JWT (Json Web Token)
CO CHCEME ULOŽIT DO JWT?
- Do JWT chceme uložit: _id & isAdmin. */
//api/routes/auth.js
//LOGIN
  //po verifikaci hesla & username vložíme do JWT tokenu user._id & user.isAdmin => po 5 dnech nebude JWT validní => znovu login
  const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.SECRET_KEY,{expiresIn: "5d"});
  //tento token přidáme k res.status(200).json pomocí spread operátoru - viz níže.
  res.status(200).json({...info, accessToken}); /*

Hotovo: Nyní máme hotovou login route + JWT token vracíme v response v případě úspěšného přihlášení.

-----------------------------------------------------------------------------------------------------------
M0) REST API USER CRUD OPERATIONS (users.js)
Toto nebudu moc komentovat jelikož je to podobné s projektem RadekSocials.

a) Vytvoříme si nový soubor verifyToken.js kde budeme verifikovat JWT token
Jak získáme JWT token?
  - Budeme ho posílat v headeru požadavku CRUD operací (abychom legitimovali že daná osoba může dělat CRUD operace) 
  
b) Ověřování JWT provedeme pomocí kódu níže v souboru verifyToken.js*/
//V routes provádíme middleware akce, verify je další middleware akce kdy do fce vstupuje req, res a next (následující middleware fce)
//verifyToken.js
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
}/*

c) V CRUD operace UPDATE následné voláme verify soubor tzn. že následně z routeru předáváme data do async UPDATE fce.
Více informací jak next() funguje je zde - https://stackoverflow.com/questions/11103465/how-does-next-work-in-node-js */
//users.js
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
  }); /*

d) Další CRUDE operace spočívá v získání dat o userech - kolik se jich registrovalo v dané měsíce.
  - musíme agregovat všechny uživately napříč všemi měsíci - využijeme k tomu agregační fce
  - více o agregačních fcí lze dohledat zde https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/ */

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
}); /*
-------------------------------------------------------------------------------------------
N0) REST API MOVIE CRUD OPERATIONS (movie.js)
Budeme vytvářet CRUD REST API operace + získání náhodného filmu (ten co je na úvodní stránce)

-------------------------------------------------------------------------------------------
O0) REST API LIST CRUD OPERATIONS (list.js)
Budeme dělat operace se seznamy filmů.
Pomocí kódu níže dokážeme na základě odkazu (http://localhost:8800/api/lists?type=movie&genre=anime) získat seznam filmů dle parametrů. */

//api/routes/lists.js
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
});/*


-------------------------------------------------------------------------------------------------------------------------------
N0) REACT ROUTER DOM
Hotovo

Pokračovat v 1:53:36

---------------------------------------------------------------------------------------------------------------------------------
M0) REACT FETCH DATA FROM API 
K připojení na BE server použijeme axios a napíšeme proxy do package.json - na konec.
/*

Opět problém napojení FE a BE => DÍKY CORS!
JAK VYŘEŠIT NAVŽDY PROBLÉM S CORS:

1. Nainstalovat cors do serveru / api: 
    - npm install cors
2. Vložit kód níže na začátek kódu index.js */
    const cors = require('cors');
    app.use(cors());/*

HOTOVO! PROBLÉM VYŘEŠEN! 



