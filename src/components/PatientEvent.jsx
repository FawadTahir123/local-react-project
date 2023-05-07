import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Space, Table,Tag} from 'antd'


function PatientEvent() {

  const userID = localStorage.getItem("id");
  const [patientData, setPatientData] = useState([])
  const [eventData, setEventData] = useState([])

  const getPatientRequest= async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/patient-request/${userID}`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      setPatientData(
        result.data.map(patient => ({
          unit: patient.unit,
          blood_group: patient.blood_group.toUpperCase(),
          date: patient.required_date,
          tags: [patient.status]
        }))
      );

    } catch (e) {
      console.log("error", e);
    }
  };

  const getPatientEvents= async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/patinet-events/${userID}`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      setEventData(
        result.data.map(patient => ({
          unit: patient.unit,
          name: patient.first_name +" "+ patient.last_name,
          blood_group: patient.blood_group.toUpperCase(),
          date: patient.required_date,
          tags: [patient.event_status]
        }))
      );

    } catch (e) {
      console.log("error", e);
    }
  };


    const divStyle = {
        margin: 'auto',
        width: '50%',
        padding: '10px',
        marginTop: '100px',
    };
    const columns = [
        {
          title: 'Units',
          dataIndex: 'unit',
          key: 'unit',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Blood Group Req.',
          dataIndex: 'blood_group',
          key: 'blood_group',
        },
        {
          title: 'Req. Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Status',
          key: 'tags',
          dataIndex: 'tags',
          render: (_, { tags }) => (
            <>
              {tags.map((tag) => {
                let color = ''
                if (tag === 'pending') {
                  color = 'geekblue';
                }else if(tag === 'approve'){
                  color = 'green'  
                }else{
                  color = 'volcano'
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
      ];

      const columnsforPatient = [
        {
          title: 'Donor Name',
          dataIndex: 'donor_name',
          key: 'donor_name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Blood Group Req.',
          dataIndex: 'blood_group',
          key: 'blood_group',
        },
        {
          title: 'Unit',
          dataIndex: 'unit',
          key: 'unit',
        },
        {
          title: 'Event date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Status',
          key: 'tags',
          dataIndex: 'tags',
          render: (_, { tags }) => (
            <>
              {tags.map((tag) => {
                let color = ''
                if (tag === 'pending') {
                  color = 'geekblue';
                }else if(tag === 'approve'){
                  color = 'green'  
                }else{
                  color = 'volcano'
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
      ];

    
      useEffect(() => {
       getPatientRequest()
       getPatientEvents()
      }, []);


console.log(patientData, "patientData");

console.log(eventData, "patientEvent");
      return (
        <>
        <div className='container' style={{marginTop:'30px'}}>
              <h2 style={{textAlign:'center'}}>YOUR EVENTS</h2>
        <div style={divStyle}>
        
    
        <Table   pagination={false} columns={columnsforPatient} dataSource={eventData}  />

      <h2 style={{textAlign:'center'}}>Request Status</h2>
      <div className='mt-5'>

      <Table  bordered pagination={false} columns={columns} dataSource={patientData} />;
      </div>
        </div>
        </div>
        
        </>
      )
    }
    
 

export default PatientEvent 