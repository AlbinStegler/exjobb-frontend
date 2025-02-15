import React, { useState, useEffect } from 'react';
import style from './events.module.css';
import eventModel from '../../models/eventModel';

const Events = () => {

    const [events, setEvents] = useState([]);
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
        const fetchEvents = async () => {
            let res = await eventModel.getEvents();
            // console.log(res);
            setEvents(res);
        };
        fetchEvents();
        setRefetch(false);
    }, [refetch]);
    async function activateEvent(e, eventName) {
        await eventModel.activateEvent({ eventName: eventName });
        setRefetch(true)
    }

    async function deleteEvent(e, id) {
        await eventModel.deleteEvent(id);
        setRefetch(true)

    }


    return (
        <div className={style.eventsContainer}>
            <h1>Event</h1>
            <h3>Antal event: {events.length}</h3>
            {events.length > 0 ? events.map((event, index) => (
                event && <div key={index} className={event.active === true ? `${style.event} ${style.activeEvent}` : `${style.event}`}>
                    <h1>{event.eventName}</h1>
                    <div className={style.twoCol}>
                        <p>{new Date(event.eventDate).toLocaleDateString('sv-SE')}</p>
                        <button onClick={e => deleteEvent(e, event._id)}>Ta bort event</button>
                    </div>
                    <div className={style.twoCol}>
                        {event.active === true ? <p className={style.green}>AKTIVT</p> : <p className={style.red}>EJ AKTIVT</p>}
                        {event.active !== true ? <button onClick={e => activateEvent(e, event.eventName)}>Aktivera</button> : null}
                    </div>
                </div>
            )) : <p>Laddar Event</p>}
        </div>
    );
};

export default Events;