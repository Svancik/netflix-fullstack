import { Navbar } from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import "./home.scss";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  const API = process.env.REACT_APP_DEV_BASE_URL;

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `/lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmY3NDQwNWU2N2YxNGJjZDQ1ZDBlYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Njk1OTcwMSwiZXhwIjoxNjU3MzkxNzAxfQ.5Z451LZ2F1t8BIHgl546F-owiEqJOartZFq-tDFzL7c",
            },
          }
        );
        setLists(res.data);
      } catch (error) {
        console.log("nastala chyba");
        console.log(error);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {lists.map((list) => (
        <List list={list} />
      ))}
    </div>
  );
};

export default Home;
