import React, { useEffect, useState } from 'react';
import './style.css';
import userModel from '../../models/userModel';
import eventModel from '../../models/eventModel';
import { useNavigate } from 'react-router-dom';


const Users = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    async function fetchUsers() {
        let activeEvent = await eventModel.getActiveEvent();
        if (activeEvent) {
            let res = await userModel.getUsersByEvent(activeEvent.eventName);
            setUsers(res);
        }
    }


    function moveToUser() {
        return () => {
            navigate("/admin/users");
        };
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    async function handleInOut(user) {
        if (user.checked_in) {
            user.checked_in = false;
        }
        else {
            user.checked_in = true;
        }
        await userModel.updateUser(user);
        // finns ingen updateUser i userModel
        setUsers([...users]);
    }

    async function removeUser(user) {
        console.log('Removing user:', user._id);
        await userModel.deleteUser(user._id);
        fetchUsers();
    };

    let Registered = users.map((user, index) => (
        <div key={index} className="user" >
            <div className='two-col'>
                <h1>{user.member.member_nick}</h1>
                {user.checked_in ? <p className='green'>Checked in</p> : <p className='red'>Not checked in</p>}
            </div>
            <div className='two-col'>
                <p>{user.member.firstname} {user.member.lastname}</p>
                <p>{user.member.phone1}</p>
            </div>
            <div className='two-col'>
                {user.seat ? <><p>Plats</p>
                    <p>{user.seat.row} {user.seat.seat}</p></> : <p>BESÖKSBILJETT</p>}

            </div>
            <div className='two-col'>
                <button onClick={() => removeUser(user)}>Ta bort</button>
                {user.checked_in ? <button onClick={() => handleInOut(user)}>Checka ut</button> : <button onClick={() => handleInOut(user)}>Checka in</button>}
            </div>
        </div>
    ));
    
    
    
    return (
        <div className="users-container">
            <button onClick={moveToUser()}>Användare</button>
            <div className='two-col'>
                <h1>Registrerade användare</h1>
                <button onClick={fetchUsers}>Uppdatera</button>
            </div>
            <p>Antal användare: {users.length}</p>
            {Registered}
        </div>
    );
};

export default Users;