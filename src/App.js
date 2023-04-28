import React from 'react';
import { BrowserRouter as Router, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Layout from './pages/Layout';
import UserLayout from './pages/UserLayout';
import {message} from "antd";
import Volunteer from './pages/Voluteer';



const App = () => {

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
                    <Route exact path="/login" element={<Login />}/>
                    <Route exact path="/sign-up" element={<Signup />}/>
                    <Route exact path="/volunteer" element={<Volunteer />}/>
                    {/*<Route exact path="/forgot-password" element={<ForgotPassword />}/>*/}
                </Routes>
            </Router>
        </div>

    )

};

export default App;