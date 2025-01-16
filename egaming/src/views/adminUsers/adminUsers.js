import style from './adminUsers.module.css';
import React, { useEffect, useState } from 'react';
import userModel from '../../models/userModel';
import eventModel from '../../models/eventModel';
import { useNavigate } from 'react-router-dom';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    console.log(users);
    async function fetchUsers() {
        let activeEvent = await eventModel.getActiveEvent();
        if (activeEvent) {
            let res = await userModel.getUsersByEvent(activeEvent.eventName);
            setUsers(res);
        }
    }

    useEffect(() => {
            fetchUsers();
        }, []);

    return (
        <div className={style.AdminUsers}>
            <h1>AdminUsers</h1>
        </div>
    );
}

export default AdminUsers;