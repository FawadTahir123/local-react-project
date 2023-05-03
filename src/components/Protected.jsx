import React, { useEffect } from 'react'
import {useNavigate } from 'react-router-dom';

function Protected(props) {
    const {Component, url} = props;
    const navigate = useNavigate();
    useEffect(()=>{
        let loginAdmin = localStorage.getItem('user_role');

        if (!loginAdmin == "1"){
          navigate("/login")
        }
        // else{
        //   navigate(url)
        // }
    });
  return (
    <div>
        <Component/>
    </div>
  )
}

export default Protected
