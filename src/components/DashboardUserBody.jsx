import React, { useState, createContext, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import add from "../images/add.png";
import DashboardOverViewContent from "./DashBoardOverViewContent";
import UserTable from "./UserTable";
import Modal from "react-bootstrap/Modal";
import pen from "../images/pen.png";
import { Alert } from "antd";
import { Label } from "reactstrap";


export const Globals = createContext();
export default function DashboardUserBody() {
  const [modalShow, setModalShow] = React.useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showStatus, setStatusAlert] = useState("");
  const [showMessage, setMessageAlert] = useState("");
  const [userRole, setUserRole] = useState("");
  const [loader, setLoader] = React.useState(false);
  const [totalPatients, setTotalPatients] = React.useState(0);
  const [totalDonors, setTotalDonors] = React.useState(0);
  const [totalRequests, setTotalRequests] = React.useState(0);
  const [totalEvents, setTotalEvents] = React.useState(0);
  const [allUsers, setAllUsers] = React.useState([]);
  const [initialpage, setInitialpage] = useState(0)
  const [showTableLoader , setTableloader] = useState(false)
  const [filterState, setFilterState] = useState(false)
  const [userInput, setUserInput] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    about: "",
    role: "",
  });

  useEffect(() => {
    CardsData();
    data();
    setInitialpage(0)
  }, []);
  const CardsData = async () => {
    setLoader(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/get-cards-data`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      setLoader(false);
      //setCategoriesList(result);
      setTotalPatients(result.total_patients);
      setTotalDonors(result.total_donors);
      setTotalRequests(result.total_requests);
      setTotalEvents(result.total_events);
      setLoader(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const AddUser = async (user) => {
    setModalShow(true);
    setShowAlert(false);
  };

  const handleInput = (e) => {
    e.persist();
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const data = async () => {
    setTableloader(true)
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/get-all-user?page=1&limit=10`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      setTableloader(false)
      setAllUsers(result);

    } catch (err) {
      console.log(err.message);
    }
  };

  const data1 = async (page, limit) => {
    setTableloader(true)
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/get-all-user?page=${page}&limit=${limit}`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      setTableloader(false)
      setAllUsers(result);
    } catch (err) {
      console.log(err.message);
    }
  };
  const CreateUser = async (e) => {
    e.preventDefault();
    console.log("user Input: ", userInput);
    var mailformat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    var passw = /^(?=.*[a-z]).{8,15}$/;
    if (userInput.first_name === "") {
      setMessageAlert("Please enter first name");
      setStatusAlert("error");
      setShowAlert(true);
    } else if (userInput.last_name === "") {
      setMessageAlert("Please enter last name");
      setStatusAlert("error");
      setShowAlert(true);
    } else if (userInput.email === "") {
      setMessageAlert("Please enter your email address");
      setStatusAlert("error");
      setShowAlert(true);
    } else if (userInput.password === "") {
      setMessageAlert("Please set your password");
      setStatusAlert("error");
      setShowAlert(true);
    } else if (userRole === "") {
      setMessageAlert("Please set User role");
      setStatusAlert("error");
      setShowAlert(true);
    } else {
      if (userInput.email.match(mailformat)) {
        if (userInput.password.match(passw)) {
          const response = await fetch(
            "https://test-wrangler.listing.workers.dev/api/add-user",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                first_name: userInput.first_name,
                last_name: userInput.last_name,
                email: userInput.email,
                password: userInput.password,
                about: userInput.about,
                user_role: userRole,
              }),
            }
          );
          data();
          CardsData();
          const respons = await response.json();
          if (respons.status === 0) {
            setMessageAlert(respons.msg);
            console.log(respons.msg, "Here")
            setStatusAlert("error");
            setShowAlert(true);
          } else if (respons.status === 1) {
            setMessageAlert(respons.msg);
            setStatusAlert("error");
            setShowAlert(true);
          } else {
            setMessageAlert(respons.msg);
            setStatusAlert("success");
            setShowAlert(true);
            setModalShow(false);
            setUserInput({
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              about: "",
              role: "",
            });
          }
        } else {
          setMessageAlert(
            "Wrong password Type! Please use characters between 8 and 15 and alteast one numeric digit and special character."
          );
          setStatusAlert("error");
          setShowAlert(true);
        }
      } else {
        setMessageAlert("You have entered an invalid email address!");
        setStatusAlert("error");
        setShowAlert(true);
      }
    }
  };

  return (
    <Globals.Provider
      value={{
        data: data,
        data1: data1,
        CardsData: CardsData,
        setAllUsers: setAllUsers,
        setInitialpage: setInitialpage,
        setTableloader: setTableloader,
        showTableLoader: showTableLoader,
        initialpage: initialpage,
        Cardsloader: loader,
        totalPatients: totalPatients,
        totalDonors: totalDonors,
        totalRequests: totalRequests,
        totalEvents: totalEvents,
        allUsers: allUsers,
        setFilterState:setFilterState, 
        filterState:filterState
      }}
    >
      <>
        <div class="dash-body">
          <DashboardHeader title={"Users"} />
          <div className="dash-user-content">
            <div className="d-flex align-items-center total-over-add">
              {/*  */}
              {/* <Link onClick={AddUser} className="ms-auto add-user-btn">
                <img src={add} alt="..." />
                Add User
              </Link> */}
            </div>
          </div>

          <div class="over-tbl-content">
            <DashboardOverViewContent />
            <UserTable />
          </div>
        </div>
        <Modal
          className="edit-modal"
          show={modalShow}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header className="d-flex justify-content-center color-orange font-family-poppins">
            <img style={{ cursor: "pointer" }} src={pen} alt="..." width="24" />
            <Modal.Title id="contained-modal-title-vcenter">
              &nbsp; Create User
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="login-form ">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">First Name*</Label>

                    <input
                      type="text"
                      name="first_name"
                      value={userInput.first_name}
                      onChange={handleInput}
                      className="edit-form-control"
                      placeholder="First Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Last Name*</Label>

                    <input
                      type="text"
                      name="last_name"
                      value={userInput.last_name}
                      onChange={handleInput}
                      className="edit-form-control"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Age*</Label>

                    <input
                      type="text"
                      name="first_name"
                      value={userInput.first_name}
                      onChange={handleInput}
                      className="edit-form-control"
                      placeholder="First Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Gender*</Label>

                    <input
                      type="text"
                      name="last_name"
                      value={userInput.last_name}
                      onChange={handleInput}
                      className="edit-form-control"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Blood Group*</Label>

                    <input
                      type="text"
                      name="first_name"
                      value={userInput.first_name}
                      onChange={handleInput}
                      className="edit-form-control"
                      placeholder="First Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">CNIC*</Label>

                    <input
                      type="text"
                      name="last_name"
                      value={userInput.last_name}
                      onChange={handleInput}
                      className="edit-form-control"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
              </div>


              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Phone No.*</Label>

                    <input
                      type="text"
                      name="first_name"
                      value={userInput.first_name}
                      onChange={handleInput}
                      className="edit-form-control"
                      placeholder="First Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Email*</Label>

                    <input
                      type="email"
                      name="last_name"
                      value={userInput.last_name}
                      onChange={handleInput}
                      className="edit-form-control"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
              </div>


              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Label className="edit-input-label">Password*</Label>
                    <input
                      type="password"
                      name="email"
                      onChange={handleInput}
                      value={userInput.email}
                      className="edit-form-control"
                      placeholder="password"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <Label className="edit-input-label">Role*</Label>
                <select
                  className="edit-form-control padding-rigth-15"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  <option>Select</option>
                  <option value={1}>Admin</option>
                  <option value={2}>User</option>
                  <option value={3}>Member</option>
                </select>
              </div>
              {/* <div className="mb-3">
                <Label className="edit-input-label">About</Label>
                <textarea
                  type="about"
                  name="about"
                  value={userInput.about}
                  onChange={handleInput}
                  className="about-input"
                  placeholder="About"
                  rows={8}
                  cols={40}
                />
              </div> */}
              {showAlert ? (
                <Alert message={showMessage} type={showStatus} />
              ) : (
                ""
              )}
              <div className="row">
                <div className="col-md-6">
                  <button
                    className="bg-white-cusd"
                    onClick={(e) => {e.preventDefault();setModalShow(false)}}
                  >
                    Close
                  </button>
                </div>
                <div className="col-md-6">
                  <button onClick={CreateUser}>Save</button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
    </Globals.Provider>
  );
}
