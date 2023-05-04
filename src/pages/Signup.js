import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils';
import { Select, message, Spin, Button, Checkbox, Form, Radio, Input, Card, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined, MailOutlined, RedEnvelopeOutlined, UserOutlined ,HomeOutlined } from '@ant-design/icons';
import { Alert } from 'antd';

const Signup = () => {
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);
    const [donorState, setDonorState] = useState(1)
    const [showAlert, setShowAlert]= useState(false);
    const [showStatus, setStatusAlert]= useState('');
    const [showMessage, setMessageAlert]= useState('');
    const [donorStatus, setDonorStatus] = useState('')
    const navigate = useNavigate()
    // const handleInput = (e) => {
    //     e.persist();
    //     setUserInput({...userInput,[e.target.name]: e.target.value});
    // }

    const onChangeForDonor = (e) => {
        // console.log('radio checked', e.target.value);
        setDonorState(e.target.value);
      };
      const onChangeForDonorStatus = (e) => {
        // console.log('radio checked for donor', e.target.value);
        setDonorStatus(e.target.value);
      };

      const onFinish = async(values) => {
        console.log('Success:', values);
        values.availability = "not_available"
        var mailformat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        var passw = /^(?=.*[a-z]).{8,15}$/;

        if(values.email.match(mailformat)){
            if(values.password.match(passw)){
                const response = await fetch('http://127.0.0.1:5000/auth/register',{
                    method:"POST",
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify(values)
                })
    
                const data = await response.json();
                if(data.status===0)
                {
                    setMessageAlert("Email Already Registered")
                    setStatusAlert("error")
                    setShowAlert(true)
                  
                }
                else if(data.status===1)
                {
                    setMessageAlert("Error in Creating User")
                    setStatusAlert("error")
                    setShowAlert(true)
                    console.log("Error in Creating User");
                }
                else {
                    navigate("/login"); 
                }
            }else{
                alert('Wrong password Type! Please use characters between 8 and 15 and alteast one numeric digit and special character.')
            }
        }else{
            alert("You have entered an invalid email address!");
            }
      };

    const divStyle = {
        margin: 'auto',
        width: '50%',
        padding: '10px',
        marginTop: '100px',
    };

    return (
        <div style={divStyle}>
            <Card
                title="Sign Up"
                style={{ backgroundColor: 'lightgray', width: '100%' }}
                extra={
                    <Button type="link" block>
                        <Link to="/login">Login</Link>
                    </Button>
                }
            >
                <Spin spinning={loading}>
                    <Form
                        name="basic"
                        initialValues={{
                            remember: false,
                        }}
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                        
                    >
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your first name',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined />} />
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your last name',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined />} />
                        
                        </Form.Item>
                        <Form.Item
                            label="Age"
                            name="age"
                            type="number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your Age',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined />} />
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your Address',
                                },
                            ]}
                        >
                            <Input prefix={<HomeOutlined />} />
                        </Form.Item>
                            <Form.Item
                        
                            label="CNIC"
                            name="cnic"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your CNIC without dashes', 
                                },
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if (getFieldValue('cnic').length !== 13) {
                                            return Promise.reject("Invalid CNIC");
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Input type='text' prefix={<RedEnvelopeOutlined />} />
                        </Form.Item>
                        

                        <Form.Item
                            label="Phone No."
                            name="phoneNo"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your phone without dashes',
                                },
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if (getFieldValue('phoneNo').length !== 11) {
                                            return Promise.reject("Invalid Phone No.");
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Input type='number' prefix={<RedEnvelopeOutlined />} />
                        </Form.Item>

                        <Form.Item label="User Role" name="user_role" rules={[{
                                required: true, message: "Role is required"
                            }]}>
                                <Radio.Group onChange={onChangeForDonor}>
                                    <Space direction="vertical">
                                        <Radio  value={2}>Patient</Radio>
                                        <Radio   value={3}>Donor</Radio>
                                    {
                                        donorState===3 ? <>
                                        <Form.Item label="Donor Status" name="donor_status" rules={[{
                                required: true, message: "Role is required"
                            }]}>

                                        
                                        <Radio.Group onChange={onChangeForDonorStatus}>
                                        <Radio   value={"one_time"}>One time</Radio>
                                        <Radio   value={"adopt_a_child"}>Adopt a Child</Radio>
                                        </Radio.Group>
                                        </Form.Item>
                                        </>:""
                                    }
                                        
                                    </Space>
                                </Radio.Group>
                        </Form.Item>
                        
                        <Form.Item label="Blood Group" name="blood"
                            rules={[{
                                required: true, message: "Blood Group is required"
                            }]}
                        >
                            <Select
                                style={{width: 200, marginBottom: 16}}
                                placeholder="Select Your Blood Group"
                                options={[
                                    {value: 'ab+', label: "AB+"},
                                    {value: 'a-', label: "A-"},
                                    {value: 'ab-', label: "AB-"},
                                    {value: 'b+', label: "B+"},
                                    {value: 'a+', label: "A+"}
                                ]}
                            />
                        </Form.Item>

                        <Form.Item label="Gender" name="gender"
                            rules={[{
                                required: true, message: "Gender is required"
                            }]}
                        >
                            <Select
                                style={{width: 200, marginBottom: 16}}
                                placeholder="Select Your Gender"
                                options={[
                                    {value: 'male', label: "Male"},
                                    {value: 'female', label: "Female"},
                                    {value: 'other', label: "Other"}
                                ]}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your email',
                                },
                            ]}
                        >
                            <Input prefix={<MailOutlined />} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your password',
                                },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} />
                        </Form.Item>
                {showAlert? <Alert message={showMessage} type={showStatus} />: <div></div>}


                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="MainButtons" block>
                                Submit
                            </Button>
                        </Form.Item>

                    </Form>
                </Spin>
            </Card>
        </div>
    );
};

export default Signup;
