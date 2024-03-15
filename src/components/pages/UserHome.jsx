import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import TicketTable from "./TicketTable";

const UserHome = () => {
   

    return (
        <div className="container">
            <div className="py-4">
                <div className="d-flex justify-content-between">
                    <h1>Ticket List</h1>
                    <Link to={'/user/add-ticket'}>
                        <Button variant="primary">
                            Add Ticket
                        </Button>
                    </Link>
                </div>
                <TicketTable />
            </div>

        </div>
    );
};

export default UserHome;
