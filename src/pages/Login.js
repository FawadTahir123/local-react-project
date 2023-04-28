import React, { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils'
import { Link, useNavigate } from 'react-router-dom'
import { message, Spin, Button, Checkbox, Form, Input, Card, } from 'antd'
import {LockOutlined, LoginOutlined, UserOutlined} from "@ant-design/icons";

const Login = () => {
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        if (values.email === 'admin@admin.com' && values.password === 'admin') {
            message.success('Login Successful');
            setLoading(false);
            nav('/dashboard/admin/home');
            setLoading(false)
            return;
        } else if (values.email === 'user@user.com' && values.password === 'user') {
            message.success('Login Successful');
            setLoading(false);
            nav('/dashboard/user/home');
            setLoading(false)
            return;
        }


        try {
            const response = await axios.post(`${BASE_URL}/user/login`, {
                email: values.email,
                password: values.password,
            });
            message.success('Login Successful');
            setLoading(false);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            nav('/dashboard/user/home');
        } catch (error) {
            setLoading(false);
            message.error("Something went wrong");
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
                title="Login"
                style={{backgroundColor: "lightgray", width: '100%' }}
                extra={
                    <Button type='link' block>
                        <Link to="/sign-up">Sign Up</Link>
                    </Button>
                }
            >
                <Spin spinning={loading}>
                    <Form
                        name="basic"
                        initialValues={{
                            remember: false,
                        }}
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your username',
                                },
                            ]}
                        >
                            <Input type="email" prefix={<UserOutlined />}/>
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
                            <Input.Password prefix={<LockOutlined />}/>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 4,
                                span: 16,
                            }}
                        >
                            <Button style={{marginTop: "15px"}} type="primary" htmlType="submit" block icon={<LoginOutlined/>}>
                                Log In
                            </Button>

                        </Form.Item>
                    </Form>
                </Spin>
            </Card>
        </div>
    );
}

export default Login;
