import React from 'react'
import {Space, Table,Tag} from 'antd'


function DonorEvent() {
  const columns = [
    {
      title: 'Patient Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'patient Blood Group',
      dataIndex: 'bood_group',
      key: 'blood_group',
    },
    {
      title: ' Event Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Tags',
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
      bood_group: "A+",
      date: '12/08/2023',
      tags: ['Pending'],
    },
    {
      key: '2',
      name: 'Jim Green',
      bood_group: "A+",
      date: '11/7/2023',
      tags: ['Pending'],
    },
    {
      key: '3',
      name: 'Joe Black',
      bood_group: "A+",
      date: '10/5/2023',
      tags: ['Completed'],
    },
  ];
  const divStyle = {
    margin: 'auto',
    width: '50%',
    padding: '10px',
    marginTop: '100px',
};
  return (
    <>
    <div className='container' style={{marginTop:'30px'}}>
          <h2 style={{textAlign:'center'}}>YOUR EVENTS</h2>
    <div style={divStyle}>

    <Table   pagination={false} columns={columns} dataSource={data} />;
    </div>
    </div>
    
    </>
  )
}

export default DonorEvent