import React, { useEffect, useState } from "react";
import Table from '../table/table';
import Stage from '../stage/stage';
import './style.css';
import eventModel from "../../../models/eventModel";
import { useNavigate } from "react-router-dom";

const CreateForm = () => {
    const navigate = useNavigate();
    const rowNames = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const [col, setCol] = useState(2);
    const [row, setRows] = useState(2);
    const [eventDate, setDate] = useState("");
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [eventType, setEventType] = useState("OnSite");

    useEffect(() => {
        if (eventType !== "Lan") {
            setCol(-1);
            setRows(-1);
        }
    }, [eventType]);

    function handleType(e) {
        setEventType(e.target.value);
    }

    function handleCol(e) {
        setCol(e.target.value);
    }

    function handleEventName(e) {
        setEventName(e.target.value);
    }

    function handleRow(e) {
        setRows(e.target.value);

    }

    function handleDate(e) {
        setDate(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (eventName !== "" && eventDate !== "") {
            let data = { "eventName": eventName, "eventDate": eventDate, "seats": {}, "eventDescription": eventDescription, "eventLocation": eventLocation, "eventType": eventType };
            if (eventType === "Lan") {
                for (let i = 0; i < col; i++) {
                    let rowData = {};
                    for (let j = 0; j < row; j++) {
                        let nr = j * 2 + 1;
                        rowData[nr] = "free";
                        rowData[nr + 1] = "free";
                    }
                    data.seats[rowNames[i]] = rowData;
                }
            } else {
                data.active = true;
            }
            // data.A["3"] = { "booked": "true", "name": "Kalle" };
            // event[eventName].push(data);
            console.log(data);
            eventModel.addEvent(data);
            navigate('/admin');

        }
        else {
            alert("Fyll i alla fält");
        }
    }
    return (
        <>
            <div className="instructions">
                <p>Välj antalet rader och hur många bord som ni vill ha till erat event. Det här skapar datan för databasen som krävs för att användare skall kunna boka in sig på eventet.</p>
            </div>
            <div className='event-edit'>
                <div className='event-edit-sidebar'>
                    <h1>SKAPA EVENT</h1>
                    <form >
                        <div className="label-value">
                            <label>Namn på event</label>
                        </div>
                        <input type="text" placeholder='Namn' onChange={e => handleEventName(e)} required />
                        <div>
                            <label>Typ av event</label>
                            <select onChange={e => handleType(e)} required>
                                <option value="OnSite">Event på plats</option>
                                <option value="Lan">Lan</option>
                                <option value="Online">Event på discord</option>
                            </select>
                        </div>
                        <div className="label-value">
                            <label>Plats</label>
                        </div>
                        <input type="text" placeholder='Plats' onChange={e => setEventLocation(e.target.value)} required />
                        <div className="label-value">
                            <label>Beskrivning</label>
                        </div>
                        <input type="text" placeholder='Beskrivning' onChange={e => setEventDescription(e.target.value)} required />
                        <div className="label-value">
                            <label>Datum</label>
                        </div>
                        <input type="date" default={eventDate} onChange={(e) => handleDate(e)} placeholder='Datum' required="required" />
                        {eventType === "Lan" ?
                            <>
                                <div className="label-value">
                                    <label>Rader</label>
                                    <label>{col / 2}</label>
                                </div>

                                <input className="slider" type="range" step="2" min="2" max="8" defaultValue="2" placeholder='Antal' onChange={e => handleCol(e)} />
                                <div className="label-value">
                                    <label>Antal bord</label>
                                    <label>{row}</label>
                                </div>
                                <input className="slider" type="range" min="1" max="8" defaultValue="2" placeholder='Antal' onChange={e => handleRow(e)} />

                            </>
                            : ""}
                        <input type="submit" value="Skapa Event" onClick={handleSubmit} />
                    </form>

                    {eventType === "Lan" ? <>
                        <div className="event-info">
                            <h2>Antal platser {row * col * 2}</h2>
                        </div>
                    </> : ""}

                </div>
                {eventType === "Lan" ? <>
                    <div className='event-view'>
                        <Stage />
                        <div id="booking" className='booking-area'>
                            {Array.from({ length: col }).map((_, j) => (
                                <div className="row" key={j}>
                                    <h1>{rowNames[j]}</h1>
                                    {Array.from({ length: row }).map((_, i) => (
                                        <Table seatInfo={{ "row": rowNames[j], "nr": i * 2 + 1 }}
                                            isBooked={["free", "free"]}
                                            onSeatClick={() => { }}
                                            key={i} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </> : ""}
            </div>
        </>
    );
};

export default CreateForm;
