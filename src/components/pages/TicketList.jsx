import React from 'react'
import TicketTable from './TicketTable'

function TicketList() {
    return (
        <div className="container">
            <div className="py-4">
                <h1>Ticket List</h1>
                <TicketTable />
            </div>
        </div>
    )
}

export default TicketList