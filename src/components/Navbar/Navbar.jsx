import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import arrow_icon from "../../assets/arrow_icon.svg";
import { logout } from "../../firebase";
import { useNavigate } from "react-router-dom"; // ✅ Import this

const Navbar = () => {
  const navRef = useRef();
  const navigate = useNavigate(); // ✅ Create navigate function

  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY >= 80) {
          navRef.current.classList.add("nav-dark");
        } else {
          navRef.current.classList.remove("nav-dark");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchToggle = () => {
    setShowSearch((prev) => !prev);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img
          src={logo}
          alt="Netflix"
          onClick={() => {
            navigate("/");
          }}
        />
        <ul>
          <li
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & popular</li>
          <li>My List</li>
          <li>Browse by Language</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img
          src={search_icon}
          alt="Search"
          className="icons"
          onClick={handleSearchToggle}
        />

        {showSearch && (
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="search-input"
              autoFocus
            />
          </form>
        )}

        <img src={bell_icon} alt="" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="" className="profile" />
          <img src={arrow_icon} alt="" />
          <div className="dropdown">
            <p onClick={handleLogout}>Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
