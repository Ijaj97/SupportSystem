import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'

function GuestLayout() {

    return (
        <Fragment>
            <div className=''>
                <Outlet />
            </div>
        </Fragment>
    )
}

export default GuestLayout