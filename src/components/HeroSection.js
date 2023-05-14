import React from "react";
import "../App.css";
import { Alert } from "antd";
import "./HeroSection.css";
import { Link } from "react-router-dom";


function HeroSection() {
  const userId = localStorage.getItem("id");
  const account_status = localStorage.getItem("account_status")

  const ClickHandler = (event) => {
		event.preventDefault();
	};
  return (
    <div className="hero-container">
      <div className="alert">
       
        {
      account_status === "HOLD" ? 
      <Alert
      style={{marginTop:'-295px', width:'100%' , marginRight:'1400px'}}
      message="Your Account is on Hold. Kindly go to our screening center to complete your verification to become eligible for blood donation. You can't set your availability when your account is on Hold."
      banner
      type="error"
      closable
    />: ""
    }
    </div>
        
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
              Login
            </Link> 
          </div>
          </div> : account_status !== "HOLD" ?
          <>
          
          <div className="d-flex">
            <div className="hero-btns">
              <Link to="/availability" className="btns">
                Set Your Availability
              </Link>
            </div>
            <div className="hero-btns">
              <Link to="/check-event" className="btns">
                Check Events
              </Link> 
            </div>
            </div>
          
          </> : 
          <>
          <div className="d-flex">
            <div className="hero-btns">
              <Link onClick={ClickHandler} to="/availability" className="btns">
                Set Your Availability
              </Link>
            </div>
        <div className="hero-btns">
              <Link to="/check-event" className="btns">
                Check Events
              </Link> 
            </div>
            </div>
          </>
        
        
        
          
          }
        </>
    </div>
  );
}

export default HeroSection;
