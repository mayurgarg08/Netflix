import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
      },
    };

    fetch(
      "https://api.themoviedb.org/3/tv/79026/videos?language=en-US",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        const trailer = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <div className="banner-video-wrapper">
          {trailerKey && (
            <iframe
              className="banner-video"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&playlist=${trailerKey}&vq=hd1080`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          )}
        </div>

        <div className="hero-caption">
          <img src={hero_title} alt="Hero Title" className="caption-img" />
          <p>
            Discovering his ties to a secret ancient order, a man on a quest to
            save the city from an immortal enemy.
          </p>
          <div className="hero-btns">
            <button className="btn">
              <img src={play_icon} alt="Play" />
              Play
            </button>
            <button className="btn dark-btn">
              <img src={info_icon} alt="Info" />
              More Info
            </button>
          </div>
          <TitleCards />
        </div>
      </div>

      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
        <TitleCards title={"Arriving Today"} category={"now_playing"} />
        <TitleCards title={"Only on Netflix"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top picks for You"} category={"now_playing"} />
        <TitleCards title={"On The Air"} category={"top_rated"} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
