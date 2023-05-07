import React from "react";
import "../App.css";
import { Button } from "antd";
import "./HeroSection.css";
import { Link } from "react-router-dom";
import BlurOnTwoToneIcon from '@mui/icons-material/BlurOnTwoTone';


function HeroSection() {
  const userId = localStorage.getItem("id");
  return (
    <div className="hero-container">
      {!userId ? (
        <>
          <p>
            "Your single blood donation can be the difference between life
            <p />
            and death for a thalassemia patient - donate today and be a hero!"
          </p>
          <div className="hero-btns">
            <Link to="/sign-up" className="btns">
              Register Yourself!
            </Link>
          </div>
        </>
      ) : (
        <>
          {userId === "2" ? (
            <p>
              "Register now to ensure a steady supply of blood and give yourself
              the best chance to fight thalassemia - you deserve it!"
            </p>
          ) : userId === "3" ? (
            <p>
              <p>
                Your single blood donation can be the difference between lifeand
                death for "
              </p>
            </p>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}

export default HeroSection;
