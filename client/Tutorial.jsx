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


E1) REACT LOGIN PAGE DESIGN