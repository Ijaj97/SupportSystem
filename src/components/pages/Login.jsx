import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sign_img from './Sign_img';
import axios from 'axios';


const Login = () => {

    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    const [inpval, setInpval] = useState({
        email: "",
        password: ""
    })

    const getdata = (e) => {
        const { value, name } = e.target;
        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })

    }


    const loadUsers = async () => {
        const result = await axios.get("http://localhost:3003/users");
        setUsers(result.data.reverse());
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const { email, password } = inpval;

        if (email === "") {
            toast.error('email field is requred', {
                position: "top-center",
            });
        } else if (!email.includes("@")) {
            toast.error('plz enter valid email addres', {
                position: "top-center",
            });
        } else if (password === "") {
            toast.error('password field is required', {
                position: "top-center",
            });
        } else if (password.length < 5) {
            toast.error('Password length required greater five', {
                position: "top-center",
            });
        } else {

            if (users && users.length) {
                // const userdata = JSON.parse(users);
                const userlogin = users.filter((data, k) => {
                    return data.email === email && data.password === password
                });

                if (userlogin.length === 0) {
                    toast.error('Invalid Details', {
                        position: "top-center",
                    });
                } else {
                    toast.success('User Login Succesfully', {
                        position: "top-center",
                    });

                    localStorage.setItem('CURRENT_USERID', userlogin[0].id)
                    localStorage.setItem('CURRENT_USERNAME', userlogin[0].username)
                    localStorage.setItem('USER_ROLE', userlogin[0].role)

                    setTimeout(() => {
                        if(userlogin[0].role == 'admin') {
                            navigate("/admin")
                        } else if(userlogin[0].role == 'user') {
                            navigate("/user")
                        } else {
                            navigate('support')
                        }
                    }, 1000);

                }
            }
        }

    }

    useEffect(() => {
        loadUsers();
    }, [])

    return (
        <>
            <div className="container mt-3">
                <div style={{ height: '100px' }}></div>
                <section className='d-flex justify-content-between'>
                    <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
                        <h3 className='text-center col-lg-6'>Sign In</h3>
                        <Form >
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                                <Form.Control type="password" name='password' onChange={getdata} placeholder="Password" />
                            </Form.Group>

                            <div className="col-lg-6 d-flex justify-content-between">
                                <Button variant="success" className='col-lg-5' onClick={handleSubmit} type="submit">
                                    Submit
                                </Button>
                                <Link className='col-lg-5' to={'/users/add'}>
                                    <Button variant="primary">
                                        Registor
                                    </Button>
                                </Link>
                            </div>
                        </Form>

                    </div>
                    <Sign_img />
                </section>
                <ToastContainer />
            </div>
        </>
    )
}

export default Login