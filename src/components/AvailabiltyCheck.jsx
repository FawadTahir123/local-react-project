import React, { useEffect, useState } from "react";
import Navbar from "./Home";
import { Switch, Card, Button, Drawer, Space } from "antd";
import { Link } from "react-router-dom";
import Header from "../components/Navbar";

function AvailabiltyCheck() {
  const userID = localStorage.getItem("id");
  const [bloodGroup, setBloodGroup] = useState("");
  const [ischecked, setChecked] = useState(false);
  const [disable, setDisable] = useState(false);
  const [open, setOpen] = useState(false);
  const [patient, setPatient] = useState([]);
  const [isBoxChecked, setisChecked] = useState(null);


  // const getAvailability = async () => {
  //   try {
  //     const res = await fetch(
  //       `http://127.0.0.1:5000/api/get-user-availability/${userID}`,
  //       {
  //         method: "GET",
  //       }
  //     );
  //     const result = await res.json();
  //     if (result.data[0].availability === "Available") {
  //       setChecked(true);
  //       setOpen(true)
  //       // checkForevents()

  //     } else {
  //       setChecked(false);
  //       // checkForevents()
  //     }
  //   } catch (e) {
  //     console.log("error", e);
  //   }
  // };

  const getBloodGroup = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/get-donor-bloodgroup/${userID}`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      setBloodGroup(result.data[0].blood_group);
    } catch (e) {
      console.log("error", e);
    }
  };
  const onChange = async (checked) => {
    if (checked) {
      try {
        setChecked('')
        setChecked(true);
        const res = await fetch(
          `http://127.0.0.1:5000/api/patient-request-for-donor`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              blood_group: bloodGroup,
            }),
          }
        );
        const result = await res.json();
        setPatient(result.data);
        console.log(result.data);
        setOpen(true);
      } catch (e) {
        console.log("error", e);
      }
    } else {
      setOpen(false);
      setChecked(false);
    }
  };
  const onClose = () => {
    setOpen(false);
    setChecked(false)
  };

  const handelCheckbox = async(e) => {
    const { value, checked } = e.target;
    console.log(value,'value', checked,"checked") 
    if(checked){
      setisChecked(value);
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/api/get-single-request-data/${value}`,
          {
            method: "GET",
          }
        );
        const result = await res.json();
          console.log(result.data);
      } catch (e) {
        console.log("error", e);
      }
    } else {
      setisChecked()
    }
    
  };

console.log(isBoxChecked, "ischecked");
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
    backgroundColor: "#ff5348",
    width: "80%",
    borderRadius: "10px",
  };

  const buttonStyle = {
    display: "flex",
    justifyContent: "end",
    width: "auto",
  };
  useEffect(() => {
    getBloodGroup();
  }, []);

  return (
    <body className="check-event">
      <Header />
      <div className="container" style={divStyle}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ marginTop: "20px", color: "#fff", fontWeight: "bold" }}>
            let us know when you are available
          </h1>
        </div>
        <div style={buttonStyle}>
          <Button style={{ color: "white", background: "#ff5348" }}>
            <Link to="/">Back</Link>
          </Button>
        </div>
        <div style={divStyleforSwitch} className="d-flex">
          <p style={{ fontWeight: "bold", color: "#fff" }}>Set Availability</p>
          {!disable ? (
            <Switch checked={ischecked} onChange={onChange} />
          ) : (
            <Switch checked={false} disabled={true} onChange={onChange} />
          )}
        </div>
      </div>
      <Drawer
        title="Patient Available"
        placement="right"
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        
        }
        footer={
          <Button style={{width:'100%', justifyContent:'center'}}>Submit</Button>
        }
      >
        {patient.map((patientData) => {
          return (
            <div className="d-flex" style={{ justifyContent: "space-evenly" }}>
              <input
                type="checkbox"
                value={patientData.id}
                checked={isBoxChecked == patientData.id ? true : false}
                onChange={(e) => handelCheckbox(e)}
              />
              <Card
                title={patientData.first_name + " " + patientData.last_name}
                bordered={true}
                style={{
                  width: 300,
                }}
              >
                <p>{patientData.blood_group}</p>
                <p>{patientData.required_date}</p>
                <p>Card content</p>
              </Card>
            </div>
          );
        })}
      </Drawer>
    </body>
  );
}

export default AvailabiltyCheck;
