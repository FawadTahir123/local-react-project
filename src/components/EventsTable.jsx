import React, { useContext, useState, useRef, useEffect } from "react";
import pen from "../images/pen.png";
import trash from "../images/trash.png";
import Graypen from "../images/graypen.png";
import Graytrash from "../images/graytrash.png";
import Modal from "react-bootstrap/Modal";
import { Label } from "reactstrap";
import { Alert } from "antd";
// import { ListingGlobals } from "./DashboardListingBody";
// import Pagination from "./Paginaton";
import Button from "@mui/material/Button";
import Search from "./GuiFilter";
import UserSorting from "./UserSorting";
// import { CircularProgress } from "@mui/material";
// import Places from "../pages/places";
// import { MapGlobals } from "../App";
import { useNavigate } from "react-router-dom";
import { display } from "@mui/system";

function EventsTable() {
  
  const [showAlert, setShowAlert] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
//   const {
//     data,
//     alllisting,
//     CardsData,
//     data1,
//     initialpage,
//     setInitialpage,
//     setAllListing,
//     showTableLoader,
//     setTableloader,
//     filterState,
//     setFilterState,
//     services,
//   } = useContext(ListingGlobals);
//   const {location, setLocation, selectedLocation, setSelectedLocation, editListingId, setEditListingId, setServices} = useContext(MapGlobals);
//   const [deleteUserId, setDeleteUserId] = useState("");
//   const [items, setItems] = useState([]);
//   const [query, setQuery] = React.useState("");
//   const [isChecked, setisChecked] = useState([]);
//   const [showDeleteAlert, setShowDeleteAlert] = useState(false);
//   const [showDeleteStatus, setDeleteStatusAlert] = useState(false);
//   const [showDeleteMessage, setDeleteMessageAlert] = useState("");
//   const [showStatus, setStatusAlert] = useState("");
//   const [showMessage, setMessageAlert] = useState("");
//   const [sorting, setsorting] = useState(false)
//   const childCompRef = useRef();
//   const Navigate= useNavigate()

  
//   const ShowDeleteModal = (id) => {
//     setShowAlert(false);
//     setDeleteModalShow(true);
//     setDeleteUserId(id);
//   };
//   useEffect(()=>{
//     console.log(editListingId,'sjhdvjksdvhkjh');
//   },[editListingId])

//   const deleteListing = async () => {
//     try {
//       const res = await fetch(
//         `https://test-wrangler.listing.workers.dev/api/delete-listing/${deleteUserId}`,
//         {
//           method: "DELETE",
//         }
//       );
//       const result = await res.json();
//     } catch (e) {
//       console.log(e);
//     }
//     CardsData();
//     data();
//   };

//   const count = alllisting.count;
//   const limit = 10;
//   const filterdData = alllisting.results?.filter((val) =>
//     val?.first_name?.toLowerCase()?.includes(query?.toLowerCase())
//   );
//   const tableData = filterdData ?? alllisting;

//   const handlePageClick = (data) => {
//     if (!filterState) {
//       let currentPage = data.selected + 1;
//       const commentsFormServer = data1(currentPage, limit);
//       setInitialpage(data.selected);
//       setItems(commentsFormServer);
//       setisChecked([]);
//     } else {
//       let currentPage = data.selected + 1;
//       setInitialpage(data.selected);
//       const commentsFormServer = childCompRef.current.searchByPage(
//         `https://test-wrangler.listing.workers.dev/api/search-listing?page=${currentPage}&limit=10`
//       );
//       setItems(commentsFormServer);
//       setisChecked([]);
//     }
//   };

//   const handelCheckbox = (e) => {
//     const { value, checked } = e.target;
//     if (checked) {
//       setisChecked([...isChecked, value], value);
//     } else {
//       setisChecked(isChecked.filter((e) => e !== value));
//     }
//   };

//   const allDelete = async () => {
//     const response = await fetch(
//       `https://test-wrangler.listing.workers.dev/api/bulk-delete-listing`,
//       {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           deleteData: isChecked,
//         }),
//       }
//     );
//     const result = await response.json();
//     setShowDeleteAlert(true);
//     setDeleteMessageAlert(result.msg);
//     setDeleteStatusAlert(result.status);
//     data();
//     CardsData();
//     setisChecked([]);
//   };
//   setTimeout(() => {
//     setShowDeleteAlert(false);
//   }, 5000);

  // useEffect(() =>{
  //   console.log("services?.results", services)
  // },[services])
// console.log(services,'aserveices')
  return (
    <>
      <div className="d-flex del-search">
        {
          <Button
            className="deleteButton"
            // disabled={isChecked.length > 0 ? false : true}
            variant="contained"
            color="error"
            // onClick={allDelete}
          >
            Delete
          </Button>
        }
        {/* {showDeleteAlert ? (
          <Alert message={showDeleteMessage} type="error" />
        ) : (
          ""
        )} */}

        <Search
          placeholder={"Search listing by name"}
        //   url={`https://test-wrangler.listing.workers.dev/api/search-listing?page=1&limit=10`}
        //   state={setAllListing}
        //   setLoader={setTableloader}
        //   setInitialpage={setInitialpage}
        //   data={data}
        //   setFilterState={setFilterState}
        //   ref={childCompRef}
        />
      </div>
      <div className="user-table-wrapper">
        <table
          className="user-tbl"
          style={{ maxWidth: "100%", overflow: "scroll", width: "100%" }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>
                <UserSorting
                  name="Name"
                  col="name"
                //   url="https://test-wrangler.listing.workers.dev/api/order-by-listing?page=1&limit=10"
                //   setFunction={setAllListing}
                //   setsorting={setsorting}
                //   sorting={sorting}
                />
              </th>
              <th>
                <UserSorting
                  name="Category"
                //   col="sub_cat_id"
                //   url="https://test-wrangler.listing.workers.dev/api/order-by-listing?page=1&limit=10"
                //   setFunction={setAllListing}
                //   setsorting={setsorting}
                //   sorting={sorting}

                />
              </th>
              <th>
                <UserSorting
                  name="Menu"
                //   col="menu_type"
                //   url="https://test-wrangler.listing.workers.dev/api/order-by-listing?page=1&limit=10"
                //   setFunction={setAllListing}
                //   setsorting={setsorting}
                //   sorting={sorting}

                />
              </th>
              <th>
                <UserSorting
                  name="Services"
                //   col="services"
                //   url="https://test-wrangler.listing.workers.dev/api/order-by-listing?page=1&limit=10"
                //   setFunction={setAllListing}
                //   setsorting={setsorting}
                //   sorting={sorting}

                />
              </th>
              <th>
                <UserSorting
                  name="Rating"
                //   col="rating"
                //   url="https://test-wrangler.listing.workers.dev/api/order-by-listing?page=1&limit=10"
                //   setFunction={setAllListing}
                //   setsorting={setsorting}
                //   sorting={sorting}

                />
              </th>
              <th>
                <UserSorting
                  name="Location"
                //   col="location"
                //   url="https://test-wrangler.listing.workers.dev/api/order-by-listing?page=1&limit=10"
                //   setFunction={setAllListing}
                //   setsorting={setsorting}
                //   sorting={sorting}

                />
              </th>
              <th>
                <UserSorting
                  name="Image"
                //   col="image_path"
                //   url="https://test-wrangler.listing.workers.dev/api/order-by-listing?page=1&limit=10"
                //   setFunction={setAllListing}
                //   setsorting={setsorting}
                //   sorting={sorting}

                />
              </th>
              <th>
                <UserSorting
                  name="Timing"
                //   col="timing"
                //   url="https://test-wrangler.listing.workers.dev/api/order-by-listing?page=1&limit=10"
                //   setFunction={setAllListing}
                //   setsorting={setsorting}
                //   sorting={sorting}
                />
              </th>
              {/* <th>URL</th> */}
              <th>Action</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          {/* {showTableLoader === false ? (
            <tbody>
              {tableData?.map((listing) => {
                console.log(listing,"listing",listing?.isChecked,"isChecked");
                return (
                  <tr key={listing.listing_id}>
                    <td>
                      <input
                        type="checkbox"
                        value={listing.listing_id}
                        checked={listing.isChecked}
                        onChange={(e) => handelCheckbox(e)}
                      />
                    </td>
                    <td>
                      <div className="d-flex company-cell">
                        <input
                          type={"hidden"}
                          value={listing.listing_id}
                          classNameName="hidden-user-id"
                        />
                        <span>{listing.listing_name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="customer-cell">
                        {listing.sub_cat_name}
                      </span>
                    </td>
                    <td>{listing.menu_type}</td>
                    <td>
                      <span maxlength="30">{
                        services?.map(val => {
                          if(val.listing_id === listing.listing_id){
                            return <span style={{padding:"-2px", backgroundColor:"#dcffe0", borderRadius:'10px', color:'#23802e' , justifyContent:'space-between', marginTop:'10px'}}>{val.label}</span>
                          }
                        })
                      }</span>
                    </td>
                    <td>{listing.rating}</td>
                    <td>{listing.location}</td>
                    <td>{listing.image_path}</td>
                    <td>{listing.timing}</td>
                    <td>{listing.url}</td>
                    <td><textarea
                value={listing.description}
                className="about-input"
                placeholder="About"
                rows={8}
                cols={80}
                /></td>
                    <td>
                      {isChecked.length > 0 ? (
                        <span className="quick-act-ico d-flex">
                          <img
                            style={{ cursor: "pointer" }}
                            src={Graypen}
                            alt="..."
                            width="24"
                          />
                          <img
                            style={{ cursor: "pointer" }}
                            src={Graytrash}
                            alt="..."
                            width="24"
                            className="ms-2"
                          />
                        </span>
                      ) : (
                        <span className="quick-act-ico d-flex">
                          <img
                            onClick={() => {
                               Navigate(`/admin/editListing/${listing.listing_id}`)

                            }}
                            style={{ cursor: "pointer" }}
                            src={pen}
                            alt="..."
                            width="24"
                          />
                          <img
                            onClick={() => {
                              return ShowDeleteModal(listing.listing_id);
                            }}
                            style={{ cursor: "pointer" }}
                            src={trash}
                            alt="..."
                            width="24"
                            className="ms-2"
                          />
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <td colspan="10" style={{ padding: "10px" }}>
              <center>
                <CircularProgress
                  style={{ color: "#FF5348", textAlign: "center" }}
                />
              </center>
            </td>
          )} */}
        </table>



        {/* deleting list Modal */}
        {/* <Modal
          className="edit-modal"
          show={deleteModalShow}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header className="d-flex justify-content-center color-orange font-family-poppins">
            <img
              style={{ cursor: "pointer" }}
              src={trash}
              alt="..."
              width="24"
            />
            <Modal.Title id="contained-modal-title-vcenter">
              &nbsp; Delete User
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h4 className="delete-user-text">
                Are you sure you want to delete this List?
              </h4>
            </div>
            <form className="login-form " onSubmit={deleteListing}>
              <div className="row">
                <div className="col-md-6">
                  <button
                    className="bg-white-cusd"
                    onClick={(e) => {
                      e.preventDefault();
                      setDeleteModalShow(false);
                    }}
                  >
                    Close
                  </button>
                </div>
                <div className="col-md-6">
                  <button type="submit" className="add-user-btn">
                    Delete
                  </button>
                </div>
              </div>
            </form>

            {showAlert ? <Alert message={showMessage} type={showStatus} /> : ""}
          </Modal.Body>
        </Modal> */}
      </div>
      {/* <Pagination
        count={count}
        limit={limit}
        handlePageClick={handlePageClick}
        initialpage={initialpage}
      /> */}
    </>
  );
}

export default EventsTable;
