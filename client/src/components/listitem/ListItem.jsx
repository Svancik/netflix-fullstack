import {
  Add,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { useState, useEffect } from "react";
import "./listItem.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";

//Do komponenty nám vstupuje index (umístění v sidebaru) a item, item = id filmu který je uložen v seznamu (lists).
//Musíme tedy na základě id (=item) tohoto movie získat movie z mongoDb pomocí axios.get("/movies/find") a uložit výsledek do state.
export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmY3NDQwNWU2N2YxNGJjZDQ1ZDBlYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Njk1OTcwMSwiZXhwIjoxNjU3MzkxNzAxfQ.5Z451LZ2F1t8BIHgl546F-owiEqJOartZFq-tDFzL7c",
          },
        });
        setMovie(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, [item]);

  return (
    <div
      onClick={() => {
        navigate("/watch", { state: { movie } });
      }}
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {" "}
      <img src={movie.img} alt="" />
      {isHovered && (
        <>
          <video src={movie.trailer} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon" />
              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>{movie.duration}</span>
              <span className="limit">{movie.limit}</span>
              <span>{movie.year}</span>
            </div>
            <div className="desc">{movie.desc}</div>
            <div className="genre">{movie.genre}</div>
          </div>
        </>
      )}
    </div>
  );
}
