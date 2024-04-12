import React from 'react';
import AdminNav from '../../components/adminnav/adminnav';
import Users from '../../components/users/users';
import Events from '../../components/events/events';
import './style.css';

const AdminStart = () => {

    return (
        <>
            <AdminNav />
            <div className="admin-start">
                <div className='view-container'>
                    <Users />
                    <Events />
                </div>
            </div>
        </>
    );
};
export default AdminStart;