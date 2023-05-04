import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Space, Table,Tag} from 'antd'


function PatientEvent() {


    const divStyle = {
        margin: 'auto',
        width: '50%',
        padding: '10px',
        marginTop: '100px',
    };
    const columns = [
        {
          title: 'Donor Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Donor Blood Group',
          dataIndex: 'blood_group',
          key: 'blood_group',
        },
        {
          title: 'Event Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Event Status',
          key: 'tags',
          dataIndex: 'tags',
          render: (_, { tags }) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
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
      const data = [
        {
          key: '1',
          name: 'John Brown',
          blood_group: 'A+',
          date: '1/05/2023',
          tags: ['pending'],
        },
        {
          key: '2',
          name: 'Jim Green',
          blood_group: "A+",
          date: '4/6/2023',
          tags: ['approve'],
        },
        {
          key: '3',
          name: 'Joe Black',
          blood_group: 'A-',
          date: 'Sydney No. 1 Lake Park',
          tags: ['completed'],
        },
      ];
      return (
        <>
        <div className='container' style={{marginTop:'30px'}}>
              <h2 style={{textAlign:'center'}}>YOUR EVENTS</h2>
        <div style={divStyle}>
    
        <Table   pagination={false} columns={columns} dataSource={data} />;

      <h2 style={{textAlign:'center'}}>Request Status</h2>
        </div>
        </div>
        
        </>
      )
    }
    
 

export default PatientEvent 