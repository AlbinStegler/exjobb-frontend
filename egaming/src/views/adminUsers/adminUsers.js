import style from './adminUsers.module.css';
import React, { useEffect, useState } from 'react';
import userModel from '../../models/userModel';
import eventModel from '../../models/eventModel';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [matchingUsers, setMatchingUsers] = useState([]);

    async function fetchUsers() {
        let activeEvent = await eventModel.getActiveEvent();
        if (activeEvent) {
            let res = await userModel.getUsersByEvent(activeEvent.eventName);
            setUsers(res);
            // setMatchingUsers(res);
        }
    }
    
    async function handleInOut(user) {
        console.log();
        if (user.checked_in) {
            user.checked_in = false;
        }
        else {
            user.checked_in = true;
        }
        await userModel.updateUser(user);
        setUsers([...users]);
    }

    function handleInput(e) {
        const value = e.target.value;
        if (value === "") {
            setMatchingUsers(users);
            return;
        }
        let tempUsers = [];
        for (let i = 0; i < users.length; i++) {
            try {
                if ((users[i].member.firstname.toLowerCase() + " " + users[i].member.lastname.toLowerCase()).includes(value.toLowerCase())) {
                    tempUsers.push(users[i]);
                } else if (users[i].member.member_nick.toLowerCase().includes(value.toLowerCase())) {
                    tempUsers.push(users[i]);
                } else if ((users[i].seat.row.toLowerCase() + users[i].seat.seat.toLowerCase()).includes(value.toLowerCase())) {
                    tempUsers.push(users[i]);
                }
            } catch (error) {
                console.log(error);
            }
        }
        setMatchingUsers(tempUsers);
        console.log(matchingUsers)
        // console.log(uesrs);
    }

    function filterUsers(k) {
        let tempUsers = [];
        for (let i = 0; i < users.length; i++) {
            if (users[i].visitor === k) {
                tempUsers.push(users[i]);
            }
        }
        setMatchingUsers(tempUsers);
    }

    function filterInOut(k) {
        let tempUsers = [];
        for (let i = 0; i < users.length; i++) {
            if (users[i].checked_in === k) {
                tempUsers.push(users[i]);
            }
        }
        setMatchingUsers(tempUsers);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        setMatchingUsers(users);
    }, [users]);

    return (
        <div className={style.adminUsersMain}>
            <h1>Sök på bokade</h1>
            <div className={style.filter}>
                <button className={style.visitor} onClick={() => filterUsers(true)}>Besökare</button>
                <button className={style.booked} onClick={() => filterUsers(false)}>Bokade</button>
                <button className={style.all} onClick={() => setMatchingUsers(users)}>Alla</button>
            </div>
            <div className={style.filter}>
                <button className={style.checkedIn} onClick={() => filterInOut(true)}>Incheckade</button>
                <button className={style.checkedOut} onClick={() => filterInOut(false)}>Utcheckad</button>
            </div>
            <h3>Matchningar: {matchingUsers.length}</h3>
            <input type="text" placeholder="Sök användare"  onChange={handleInput} />
            <div className={style.users}>
                {matchingUsers.length ?
                    matchingUsers.map(user => (
                                                <div className={`${style.user} ${user.checked_in ? style.checkedInTrue : style.checkedInFalse}`} key={user.member.member_id}>
                            <h2 key={user.member.firstname}>{user.member.firstname} {user.member.lastname} ({user.member.member_nick})</h2>
                            {
                                user.seat ?
                                <h3>{user.seat.row}{user.seat.seat}</h3>
                                :
                                <h3>#</h3>
                            }
                            <button onClick={() => handleInOut(user)}>{user.checked_in ? "Checka ut" : "Checka in"}</button>
                        </div>
                    ))
                    :
                    <><p>Inga användare hittades</p></>
                }
            </div>
        </div>
    );
}

export default AdminUsers;