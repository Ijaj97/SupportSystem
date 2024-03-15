import { createBrowserRouter } from 'react-router-dom'
import GuestLayout from './components/layout/GuestLayout';
import Login from './components/pages/Login';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import AddUsers from './components/users/AddUsers';
import EditUser from './components/users/EditUser';
import ViewUser from './components/users/ViewUser';
import MainLayout from './components/layout/MainLayout';
import PageNotFound from './components/pages/PageNotFound';
import AdminHome from './components/pages/AdminHome';
import UserHome from './components/pages/UserHome';
import SupportHome from './components/pages/SupportHome';
import AddTicket from './components/pages/AddTicket';
import Assign from './components/pages/Assign';
import TicketList from './components/pages/TicketList';
import ResolveTicket from './components/pages/ResolveTicket';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            { path: '/', element: <Login /> },
            { path: '/users/add', element: <AddUsers /> },
        ]
    }, {
        element: <MainLayout />,
        children: [
            { path: '/admin', element: <AdminHome /> },
            { path: '/admin/assign-ticket/:id', element: <Assign /> },
            { path: '/admin/ticket', element: <TicketList /> },

            { path: '/user', element: <UserHome /> },
            { path: '/user/add-ticket', element: <AddTicket /> },
            { path: '/users/edit/:id', element: <EditUser /> },
            { path: '/users/:id', element: <ViewUser /> },

            { path: '/support', element: <SupportHome /> },

            { path: '/about', element: <About /> },
            { path: '/contact', element: <Contact /> },

            { path: '/resolve-ticket/:id', element: <ResolveTicket /> },
        ]
    }, {
        path: '*',
        element: <PageNotFound />
    }
]);

export default Router