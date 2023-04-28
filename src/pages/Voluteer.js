import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils';
import { Select, message, Spin, Button, Checkbox, Form, Input, Card , Radio, Space} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined, MailOutlined, RedEnvelopeOutlined, UserOutlined } from '@ant-design/icons';

const Volunteer = () => {
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);

        try {
            // Add user to database
            const response = await axios.post(`${BASE_URL}/user`, {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                role: 'applicant',
                applicationId: values.applicationID,
            });

            if (response.data.error) {
                setLoading(false);
                message.error("Something went wrong: ", response.data.error);
                setLoading(false)
                nav('/user/signup')
                return;
            }

            setLoading(false);
            nav('/');
        } catch (error) {
            setLoading(false);
            message.error('Failed to create user');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                title="Volunteer"
                style={{ backgroundColor: 'lightgray', width: '100%' }}
            >
                <Spin spinning={loading}>
                    <Form
                        name="basic"
                        initialValues={{
                            remember: false,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
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
                            label="CNIC"
                            name="cnic"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your CNIC without dashes',
                                },
                            ]}
                        >
                            <Input type='number' prefix={<RedEnvelopeOutlined />} />
                        </Form.Item>

                        <Form.Item
                            label="Phone No."
                            name="phoneNo"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your phone without dashes',
                                },
                            ]}
                        >
                            <Input type='number' prefix={<RedEnvelopeOutlined />} />
                        </Form.Item>

                        <Form.Item label="Preference" name="preference" rules={[{
                                required: true, message: "Preference is required"
                            }]}>
                                <Radio.Group >
                                    <Space direction="vertical">
                                        <Radio value={1}>One Time Donor</Radio>
                                        <Radio value={2}>Adopt a Patient</Radio>
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

export default Volunteer;
