import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function TicketTable() {
    const [tickets, setTickets] = useState([]);

    const [users, setUsers] = useState([]);
    const role = localStorage.getItem('USER_ROLE');
    const id = localStorage.getItem('CURRENT_USERID');

    const loadTickets = async () => {
        const result = await axios.get("http://localhost:3003/tickets");
        if (role == 'admin') {
            setTickets(result.data.reverse());
        } else if (role == 'user') {
            setTickets(result.data.filter((data) => {
                return data.usernameId == id
            }).reverse());
        } else {
            setTickets(result.data.filter((data) => {
                return data.assignTo == id
            }).reverse());
        }
    };

    const resolveTicket = async (tableData) => {
        let obj = {
            ...tableData,
            resolve: true
        }
        await axios.put(`http://localhost:3003/tickets/${tableData.id}`, obj);
        loadTickets();
    };

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:3003/users");
        setUsers(result.data.filter((data, k) => {
            return data.role != 'admin'
        }).reverse());
    };

    useEffect(() => {
        loadUsers();
        loadTickets();
    }, []);
    return (
        <div>
            <table style={{ textAlign: "center" }} className="table border shadow">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Message</th>
                        <th scope="col">Priority Level</th>
                        <th>Resolve Message</th>
                        {role == 'admin' && <th scope="col">Assigned To</th>}
                        <th>Resolved By</th>
                        <th >Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.length >= 1 ? (tickets.map((ticket, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{ticket.subject}</td>
                            <td>{ticket.message}</td>
                            <td>{ticket.level}</td>
                            <td>{ticket.resolveMsg}</td>
                            {
                                role == 'admin' && (
                                    <td>
                                        {
                                            users && users.map((data) => {
                                                return (
                                                    data.id == ticket.assignTo && data.name
                                                )
                                            })

                                        }
                                    </td>
                                )}
                            <td>
                                {
                                    users && users.map((data) => {
                                        return (
                                            data.id == ticket.resolvedBy && data.name
                                        )
                                    })

                                }
                            </td>
                            <td className="d-flex justify-content-center">
                                {
                                    role == 'admin' && (
                                        <Link
                                            state={ticket}
                                            to={`/admin/assign-ticket/${ticket.id}`}
                                            className="btn btn-primary mr-2"
                                        >
                                            Assign
                                        </Link>
                                    )
                                }
                                {
                                    ticket.resolve == true ? (
                                        <button className="btn btn-success">
                                            Resolved
                                        </button>
                                    ) : (
                                        <Link
                                            state={ticket}
                                            to={`/resolve-ticket/${ticket.id}`}
                                            className="btn btn-primary mr-2">
                                            Resolve
                                        </Link>
                                    )
                                }
                            </td>
                        </tr>
                    ))) : (
                        <tr >
                            <td style={{ textAlign: 'center', fontSize: '50px', height: '300px' }} colSpan={5}>No Data</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default TicketTable