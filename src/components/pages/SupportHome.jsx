import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TicketTable from "./TicketTable";

const SupportHome = () => {

  return (
    <div className="container">
      <div className="py-4">
        <h1>Ticket List</h1>
        <TicketTable />
      </div>
    </div>
  );
};

export default SupportHome;
