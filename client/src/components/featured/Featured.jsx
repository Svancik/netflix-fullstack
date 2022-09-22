import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import "./featured.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Featured({ type }) {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        //níže dáváme do query pro selekci náhodného filmu, že pokud máme zvolený typ film, tak chceme náhodně vybírat z filmů.
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token: process.env.REACT_APP_TOKEN,
          },
        });
        //Níže volíme první element, jelikož nám server vrátí pole - my chceme však objekt = 1 element z 1
        setContent(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomContent();
  }, [type]);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      {/* <img src="https://images7.alphacoders.com/969/969444.png" alt="" /> */}
      <img src={content.img} alt="" />
      <div className="info">
        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Berserk_anime_logo.png" alt=""> 
        In this world, is the destiny of mankind controlled by some
          transcendental entity or law? Is it like the hand of God hovering
          above? At least it is true that man has no control, even over his own
          will...*/}
        <img src={content.imgTitle} alt="" />
        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
