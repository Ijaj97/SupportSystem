import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function ResolveTicket() {
    let navigate = useNavigate();
    const { id } = useParams();
    const UserId = localStorage.getItem('CURRENT_USERID');
    const role = localStorage.getItem('USER_ROLE');
    const Location = useLocation();
    const [Resolve, setResolve] = useState({
        subject: "",
        message: "",
        level: '',
        usernameId: '',
        assignTo: '',
        resolveMsg: '',
        resolvedBy: UserId
    });

    const { resolveMsg } = Resolve;

    const onInputChange = (e) => {
        let ticketdata = Location.state;
        setResolve({ ...Resolve, ...ticketdata, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        let obj = {
            ...Resolve,
            resolve: true
        }
        await axios.put(`http://localhost:3003/tickets/${id}`, obj);
        if (role == 'admin') {
            navigate("/admin/ticket");
        } else {
            navigate(`/${role}`);
        }
    };

    return (
        <div className="container">
            <form className="myForm my-3" onSubmit={(e) => onSubmit(e)}>
                <h1>Resolve Ticket</h1>
                <br />
                <div className="form-group">
                    <div className="form-group ">
                        <div className="form-group">
                            <textarea
                                type="text"
                                name="resolveMsg"
                                required
                                className="form-control"
                                id="exampleInputUsername"
                                value={resolveMsg}
                                placeholder="Enter Your Message"
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    Resolve
                </button>
            </form>
        </div>
    );
}

export default ResolveTicket;
