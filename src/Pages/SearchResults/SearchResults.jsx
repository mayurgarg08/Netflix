import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./SearchResults.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
            },
          }
        );
        const data = await res.json();
        setResults(data.results || []);
      };

      fetchResults();
    }
  }, [query]);

  return (
    <>
      <Navbar />
      <div className="search-page">
        <img
          src={back_arrow_icon}
          className="back-arrow"
          alt=""
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className="search-header">
          <h2>Results for "{query}"</h2>
        </div>

        <div className="search-grid">
          {results.map((movie) => (
            <Link
              to={`/search/player/${movie.id}`}
              key={movie.id}
              className="search-card"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={movie.title}
              />
              <h4>{movie.title}</h4>
              <p>{movie.release_date?.slice(0, 4) || "N/A"}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
