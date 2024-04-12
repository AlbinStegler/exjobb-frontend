import React from 'react';
// import Nav from '../../components/navbar/nav';
import CreateForm from '../../components/create/form/createForm';
import './style.css';
import AdminNav from '../../components/adminnav/adminnav';
const createEvent = () => {
    return (
        <div>
            <AdminNav />
            <CreateForm />
        </div>
    );
};

export default createEvent;