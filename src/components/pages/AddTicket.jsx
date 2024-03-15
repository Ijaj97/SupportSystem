import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTicket() {
    let navigate = useNavigate();
    const id = localStorage.getItem('CURRENT_USERID');
    const [ticket, setTicket] = useState({
        subject: "",
        message: "",
        level: 1,
        usernameId: id,
        resolve: false,
    });

    const { subject, message, level, usernameId } = ticket;

    const onInputChange = (e) => {
        setTicket({ ...ticket, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3003/tickets", ticket);
        navigate("/user");
    };

    return (
        <div className="container">
            <form className="myForm my-3" onSubmit={(e) => onSubmit(e)}>
                <h1>Raise Ticket</h1>
                <div className="form-group">
                    <input
                        type="text"
                        name="subject"
                        className="form-control"
                        id="exampleInputName"
                        value={subject}
                        required
                        aria-describedby="emailHelp"
                        placeholder="Enter Your Subject"
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        type="text"
                        name="message"
                        required
                        className="form-control"
                        id="exampleInputUsername"
                        value={message}
                        placeholder="Enter Your Message"
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="level" className="">Set Priority</label>
                    <input
                        type="range"
                        name="level"
                        max={10}
                        className="form-control"
                        id="exampleInputPhone"
                        value={level}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>

                <button type="submit" className="btn btn-primary myButton">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AddTicket;
