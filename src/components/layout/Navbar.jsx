import React from 'react'
import { Link, NavLink } from "react-router-dom";


function Navbar() {
    const id = localStorage.getItem('CURRENT_USERID');
    const name = localStorage.getItem('CURRENT_USERNAME');
    const role = localStorage.getItem('USER_ROLE');
    return (
        <div >
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Link className="navbar-brand" to={`/${role}`} >{name.toUpperCase()}</Link>

                <div className="collapse navbar-collapse" >
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item ">
                            <NavLink className="nav-link" to={`/${role}`}>Home </NavLink>
                        </li>
                        {
                            role == 'admin' && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin/ticket">Ticket</NavLink>
                                </li>
                            )
                        }
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                </div>
                {
                    role != 'admin' && <Link className='btn btn-outline-light' to={`/users/edit/${id}`}>Edit Profile</Link>
                }
                <Link className='btn ml-3 btn-outline-light' to={`/users/${id}`}>View Profile</Link>
                <Link className='btn ml-3 btn-outline-light' to="/">Logout</Link>
            </nav>
        </div>
    )
}

export default Navbar
