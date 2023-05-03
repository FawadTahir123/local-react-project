import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Layout from './pages/Layout';
import UserLayout from './pages/UserLayout';
import {message} from "antd";
import Volunteer from './pages/Voluteer';
import Dashboard from "./pages/Dashboard";
import DashboardRequests from "./pages/DashboardRequests"
import DashboardEvents from "./pages/DashboardEvents"
import Protected from "../src/components/Protected";

const App = () => {

    // const [previousUrl,setPreviousUrl] = useState("");
    const url  = window.location.pathname
    console.log(url);

// const location = useLocation(); // React Hook
// console.log(location.pathname);
    const PrivateRoutes = (role) => {
        const user = localStorage.getItem('user')
        const status = user ? JSON.parse(user)?.status : false

        // const adminRoutes = [];
        const adminRoutes = [
            '/dashboard/admin/home',
            '/dashboard/admin/historicdata',
            '/dashboard/admin/application',
            '/dashboard/admin/formbuilder'
        ];

        const userRoutes = [
            '/dashboard/user/home',
            '/dashboard/user/historicdata'
        ];


        if (role.role==='admin' && adminRoutes.includes(window.location.pathname)) {
            return <Outlet />
        } else if (role.role==='user' && userRoutes.includes(window.location.pathname)) {
            return <Outlet />
        } 
        
        else {
            return <Navigate to="/" />
        }

        // if (adminRoutes.includes(window.location.pathname)) {
        //     return <Outlet />
        // } else {
        //     return <Navigate to="/" />
        // }
    }


    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Layout />} />
                    <Route path="*" element={<Navigate to="/" />} />
                    {/* <Route element={<PrivateRoutes role="admin" />}>
                        <Route path="/dashboard/admin/*" element={<Layout />} />
                    </Route>
                    <Route element={<PrivateRoutes role="user" />}>
                        <Route path="/dashboard/user/*" element={<UserLayout />} />
                    </Route> */}
            <Route
            path="/admin/user"
            element={<Protected Component={Dashboard} url={window.location.href} />}
          />
           <Route
            path="/admin/requests"
            element={<Protected Component={DashboardRequests} url={window.location.href}/>}
          />
            <Route
            path="/admin/events"
            element={<Protected Component={DashboardEvents} url={window.location.href}/> }
          />
                    <Route exact path="/login" element={<Login url={url}/>}/>
                    <Route exact path="/sign-up" element={<Signup />}/>
                    <Route exact path="/volunteer" element={<Volunteer />}/>
                    {/*<Route exact path="/forgot-password" element={<ForgotPassword />}/>*/}
                </Routes>
            </Router>
        </div>

    )

};

export default App;