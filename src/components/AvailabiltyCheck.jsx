import { Margin } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Navbar from "./Home";
import { Switch, Card, Button } from "antd";
import { Link } from "react-router-dom";

function AvailabiltyCheck() {
  const userID = localStorage.getItem("id");
  const [ischecked, setChecked] = useState(false);
  const [disable, setDisable] = useState(false)


  const checkForevents  = () =>{
    const event = "hello"
    if(event === "hello"){
      setDisable(true)
    }else{
      setDisable(false)
    }
  }

  const getAvailability = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/get-user-availability/${userID}`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      if (result.data[0].availability === "Available") {
        setChecked(true);
        // checkForevents()

      } else {
        setChecked(false);
        // checkForevents()
      }
    } catch (e) {
      console.log("error", e);
    }
  };



  const onChange = async (checked) => {
    if (checked) {
      try {
        setChecked(true);
        const res = await fetch(
          `http://127.0.0.1:5000/api/update-availability/${userID}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: userID,
              availability: "Available",
            }),
          }
        );
        const result = await res.json();
        console.log(result);
      } catch (e) {
        console.log("error", e);
      }
    } else {
      try {
        setChecked(false);
        const res = await fetch(
          `http://127.0.0.1:5000/api/update-availability/${userID}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              availability: "not_available",
            }),
          }
        );
        const result = await res.json();
        console.log(result);
      } catch (e) {
        console.log("error", e);
      }
    }
  };

  const divStyle = {
    margin: "auto",
    width: "50%",
    padding: "10px",
    marginTop: "100px",
    justifyContent: "space-between",
  };
  const divStyleforSwitch = {
    margin: "auto",
    width: "50%",
    padding: "10px",
    marginTop: "100px",
    justifyContent: "space-between",
    backgroundColor: "lightgray",
    width: "80%",
    borderRadius: "10px",
  };

  const buttonStyle = {
    display: "flex",
    justifyContent: "end",
    width: "auto",
  };
  useEffect(() => {
    getAvailability();
  }, [ischecked]);

  return (
    <>
      <div className="container" style={divStyle}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ marginTop: "20px" }}>Set Your Availability</h1>
        </div>
        <div style={buttonStyle}>
          <Button style={{ color: "white", background: "#1677ff" }}>
            <Link to="/">Back</Link>
          </Button>
        </div>
        <div style={divStyleforSwitch} className="d-flex">
          <p style={{ fontWeight: "bold" }}>Set Availability</p>
{
  !disable ? 
  <Switch checked={ischecked}  onChange={onChange} /> : <Switch checked={false} disabled={true} onChange={onChange} />
}
        </div>
      </div>
    </>
  );
}

export default AvailabiltyCheck;
