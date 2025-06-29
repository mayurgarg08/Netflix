import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./SearchResults.css";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [results, setResults] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

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

  const handleCardClick = async (movie) => {
    setSelectedMovie(movie);
    setTrailerKey(null);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
          },
        }
      );
      const data = await res.json();
      const trailer = data.results?.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        setTrailerKey(null);
      }
    } catch (err) {
      setTrailerKey(null);
    }
  };

  const handleCloseTrailer = () => {
    setTrailerKey(null);
    setSelectedMovie(null);
  };

  return (
    <>
      <Navbar />
      <div className="search-page">
        <div className="search-header">
          <h2>Results for "{query}"</h2>
        </div>

        {/* Fullscreen Trailer Modal */}
        {trailerKey && (
          <div className="trailer-modal">
            <div className="trailer-content">
              <button className="close-btn" onClick={handleCloseTrailer}>
                &#8592;
              </button>
              <iframe
                className="trailer-video"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&playlist=${trailerKey}&vq=hd1080`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Trailer"
              ></iframe>
            </div>
          </div>
        )}

        <div className="search-grid">
          {results.map((movie) => (
            <div
              key={movie.id}
              className="search-card"
              onClick={() => handleCardClick(movie)}
              style={{ cursor: "pointer" }}
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
