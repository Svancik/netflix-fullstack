import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import "./featured.scss";

export default function Featured({ type }) {
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
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
      <img src="https://images7.alphacoders.com/969/969444.png" alt="" />
      <div className="info">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Berserk_anime_logo.png"
          alt=""
        />
        <span className="desc">
          In this world, is the destiny of mankind controlled by some
          transcendental entity or law? Is it like the hand of God hovering
          above? At least it is true that man has no control, even over his own
          will...
        </span>
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
