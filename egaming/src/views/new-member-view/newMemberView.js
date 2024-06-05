import React, { useState, useEffect } from "react";
import './style.css';
import logModel from "../../models/logModel";
import { useNavigate } from "react-router-dom";

const NewMemberView = () => {
    const [newMember, setNewMember] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === false || localStorage.getItem('isLoggedIn') === null) {
            navigate('/');
            console.log('Not logged in');
        }
    }, [navigate]);

    const getLogs = async () => {
        let members = await logModel.getLogsToday();
        setNewMember(members);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getLogs();
        }, 1000);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);

    console.log(newMember[0]);

    return (
        <>
            <div className="memberLog">
                <div className="aside">
                    {/* <h1>Tidigare</h1> */}
                    {newMember.length > 0 ? newMember.slice(1).map((member) => (
                        <div className="oneNew two-col" key={member.id}>
                            <h2 className="user-new">{member.nickname}</h2>
                            <h2 className="time-new">{new Date(member.timestamp).toLocaleTimeString().slice(0, 5)}</h2>
                        </div>
                    )) : null}
                </div>
                <div className="new-center">

                    <img src={process.env.PUBLIC_URL + '/images/Banner.png'} alt="Sparbanken" />
                    <h1>Välkommen</h1>
                    <h1 className="user-new">{newMember.length > 0 ? newMember[0].nickname : ""}</h1>
                    <h2>Vi är glada att se dig här idag!</h2>
                </div>
            </div>
            <div className="event-sponsors">
                <div className="spons-three-col">
                    <img src={process.env.PUBLIC_URL + '/images/sparbanken.jpg'} alt="sparbanken" />
                    <img src={process.env.PUBLIC_URL + '/images/lfsodermanland.jpg'} alt="Länsförsäkrningar Södermanland" />
                    <img src={process.env.PUBLIC_URL + '/images/cherryxtrfy.png'} alt="xtrfy" />
                </div>
                <div className="spons-three-col">
                    <img src={process.env.PUBLIC_URL + '/images/stiga.jpg'} alt="sverok" />
                    <img src={process.env.PUBLIC_URL + '/images/dreamhack-logo.png'} alt="sverok" />

                </div>
            </div>
        </>
    );
};

export default NewMemberView;
