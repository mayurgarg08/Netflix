import React, { useEffect, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjllNTQyZjljYmU0ZjE2NWMxNjZhOGJkOTkxODkzNiIsIm5iZiI6MTc0NjEzMTczNy4yMDYsInN1YiI6IjY4MTNkYjE5NWM1ODI4YjEyZmUwMjgyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1PgGVRKDO4RBXDVVz-mqVr-k3PINADytTbCupjk63hw",
    },
  };

  useEffect(() => {
    const randomPage = Math.floor(Math.random() * 5) + 1; // Pages 1 to 5
    const categoryType = category ? category : "now_playing";

    fetch(
      `https://api.themoviedb.org/3/movie/${categoryType}?language=en-US&page=${randomPage}`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        const shuffled = res.results.sort(() => 0.5 - Math.random());
        setApiData(shuffled);
      })
      .catch((err) => console.error(err));
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list">
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500${card.poster_path}`}
              alt={card.original_title}
            />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
