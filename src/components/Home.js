import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import HeroSection from "./HeroSection";
import NavbarJS from "./Navbar";
import Cards from "./Cards";
import Footer from "./Footer";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const currentUserLoginId = localStorage.getItem("id");
  const currneetUserLoginRole = localStorage.getItem("user_role");
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const navigate = useNavigate()




  const logOut = () => {
    localStorage.clear()
    navigate('/')
  }

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
    <NavbarJS/>
      <HeroSection />
      {/* <Cards /> */}
    </>
  );
}

export default Navbar;
