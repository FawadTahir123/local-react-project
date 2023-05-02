import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import HeroSection from "./HeroSection";
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
      <nav className="navbar bg-dark">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Thallasemic Foundation
            <i class="fab fa-typo3" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {/* <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link
                to="/services"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Contact Us
              </Link>
            </li> */}
            {!currentUserLoginId ? (
              <>
                <Link to="/sign-up" className="btn-mobile pt-2">
                  <Button type="primary">SIGN UP</Button>
                </Link>

                <Link to="/login" className="btn-mobile pt-2">
                  <Button style={{ marginLeft: "20px" }} type="primary">
                    LOG IN
                  </Button>
                </Link>
              </>
            ) : currneetUserLoginRole === "2" ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/volunteer"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Request for blood
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/volunteer"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Check your Event
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-links"
                    onClick={logOut}
                  >
                    LOG OUT
                  </Link>
                </li>
              </>
            ) : currneetUserLoginRole === "3" ? (
              <>
                {" "}
                <li className="nav-item">
                  <Link
                    to="/volunteer"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Check your Event
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-links"
                    onClick={logOut}
                  >
                    LOG OUT
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/volunteer"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Request for blood
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/volunteer"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Check your Event
                  </Link>
                </li>
              </>
            )}
            {/* <li className='nav-item'>
              <Link
                to='/volunteer'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Request for blood
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/volunteer'
                className='nav-links'
                onClick={closeMobileMenu}
              >
               Check your Event
              </Link>
            </li> */}

            {/* <li>
              <Link
                to='/sign-up'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li> */}
          </ul>
        </div>
      </nav>
      <HeroSection />
      <Cards />
      <Footer />
    </>
  );
}

export default Navbar;
