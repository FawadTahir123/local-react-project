import { Margin } from '@mui/icons-material'
import React from 'react'
import Navbar from './Home';
import { Switch,Card,Button }from 'antd'
import { Link } from 'react-router-dom';




function AvailabiltyCheck() {

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };


  const divStyle = {
    margin: 'auto',
    width: '50%',
    padding: '10px',
    marginTop: '100px',
    justifyContent:'space-between'
    
};
const divStyleforSwitch = {
    margin: 'auto',
    width: '50%',
    padding: '10px',
    marginTop: '100px',
    justifyContent:'space-between',
    backgroundColor:'lightgray',
    width:'80%',
    borderRadius:"10px"
}

const buttonStyle = {
  display: 'flex',
  justifyContent: 'end',
  width:'auto'
  
}
  return (
    <>
     
    <div className='container' style={divStyle}>
        <div style={{textAlign:"center"}}>
                          <h1 style={{marginTop:'20px'}}>Set Your Availability</h1>                                                                                                
        </div>
        <div  style={buttonStyle}>
        <Button   style={{color:"white", background:'#1677ff'}}>
                        <Link to="/">Back</Link>
                    </Button>
          </div> 
      <div style={divStyleforSwitch} className='d-flex'>
      <p style={{fontWeight:'bold'}}>Set Availability</p>
      <Switch defaultChecked onChange={onChange} />

      </div>
    </div>
    
</>  )
  
}

export default AvailabiltyCheck