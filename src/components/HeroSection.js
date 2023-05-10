import React from "react";
import "../App.css";
import { Button } from "antd";
import "./HeroSection.css";
import { Link } from "react-router-dom";


function HeroSection() {
  const userId = localStorage.getItem("id");
  return (
    <div className="hero-container">
        
        <>
          <p>
            "Your single blood donation can be the difference between life
            <p />
            and death for a thalassemia patient - donate today and be a hero!"
          </p> 
          {!userId ? 
          <div className="d-flex">
          <div className="hero-btns">
            <Link to="/sign-up" className="btns">
              Register Yourself!
            </Link>
          </div>
          <div className="hero-btns">
            <Link to="/login" className="btns">
              Donate Now
            </Link> 
          </div>
          </div> :<div className="d-flex">
          <div className="hero-btns">
            <Link to="/availability" className="btns">
              Set Your Availaibility
            </Link>
          </div>
          <div className="hero-btns">
            <Link to="/check-event" className="btns">
              Check Events
            </Link> 
          </div>
          </div>
          
          }
        </>
    </div>
  );
}

export default HeroSection;
