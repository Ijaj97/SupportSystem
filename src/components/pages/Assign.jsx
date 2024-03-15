import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Assign() {
    let navigate = useNavigate();
    const { id } = useParams();
    const Location = useLocation();
    const [ticket, setTicket] = useState({
        subject: "",
        message: "",
        level: '',
        usernameId: '',
        assignTo: '',
        resolve: '',
    });

    const { assignTo } = ticket;

    const onInputChange = (e) => {
        let ticketdata = Location.state;
        setTicket({ ...ticket, ...ticketdata, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3003/tickets/${id}`, ticket);
        navigate("/admin/ticket");
    };

    const [users, setUsers] = useState([]);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:3003/users");
        setUsers(result.data.filter((data, k) => {
            return data.role == 'support'
        }).reverse());
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className="container">
            <form className="myForm my-3" onSubmit={(e) => onSubmit(e)}>
                <h1>Assign Ticket</h1>
                <br />
                <div className="form-group">
                    <div className="form-group ">
                        <select class="form-select form-control" name="assignTo" value={assignTo} onChange={(e) => onInputChange(e)} aria-label="Default select example" required>
                            <option selected>-- Select Role --</option>
                            {
                                users && users.map((data, id) => {
                                    return (
                                        <Fragment key={id}>
                                            <option value={data.id}>{data.name}</option>
                                        </Fragment>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Assign;
