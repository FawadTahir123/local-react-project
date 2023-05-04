import React from 'react'
import PatientEvent from './PatientEvent'
import DonorEvent from './DonorEvent'

function CheckEvent() {

    let loginAdmin = localStorage.getItem('user_role');

  return (
    <>
    {
        loginAdmin == "2" ? 
          <PatientEvent/>:<DonorEvent/> 
    }
    </>
  )
}

export default CheckEvent