import React, { useState, useEffect } from "react";
import Nav from "../../components/navbar/nav";
import "./style.css";
import { useLocation, useNavigate } from 'react-router-dom';
// import sverokModel from "../../models/sverokModel";
import eventModel from "../../models/eventModel";
import userModel from "../../models/userModel";
import Lottie from 'lottie-react';
import lLoading from '../../lotties/loading.json';
const Event = () => {
    const location = useLocation();
    const seat = location.state?.seat; // Use optional chaining operator
    const navigate = useNavigate();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [zip, setZip] = useState("");
    const [city, setCity] = useState("");
    const [nickname, setNickname] = useState("");
    const [ssn, setSsn] = useState("");

    const [parentName, setParentName] = useState("");
    const [parentPhone, setParentPhone] = useState("");

    const [underAge, setUnderAge] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Redirect to "/book" if the seat is not available
        if (!seat) {
            navigate('/book');
        }
    }, [seat, navigate]);

    function ssnHandler(e) {
        let ssn = e.target.value;
        ssn = ssn.replace(/[^0-9]/g, '');
        console.log(ssn);
        if (ssn.length === 12) {
            let year = ssn.substring(0, 4);
            let month = ssn.substring(4, 6);
            let day = ssn.substring(6, 8);

            let birthDate = new Date(year, month - 1, day); // Månader i JavaScript börjar från 0 (januari är 0)
            let today = new Date();

            let age = today.getFullYear() - birthDate.getFullYear();
            let monthDiff = today.getMonth() - birthDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            console.log("Ålder: " + age + " år");

            if (age < 18) {
                setUnderAge(true);
                console.log("Under 18");
            } else {
                setUnderAge(false);
                console.log("18 eller äldre");
            }
        } else {
            setUnderAge(false);
            console.log("Ogiltigt personnummer");
        }
        setSsn(ssn);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        let active = await eventModel.getActiveEvent();

        let userData = {
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "phone": phone,
            "address": address,
            "zip": zip,
            "city": city,
            "nickname": nickname,
            "ssn": ssn,
            "parentName": parentName,
            "parentPhone": parentPhone,
            "seat": seat,
            "event": active.eventName,
        }

        // Handle form submission here

        function validateEmail(email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }


        if (!validateEmail(email)) {
            alert("Felaktig e-postadress");
            setLoading(false);
            return;
        }
        // Är personen medlem?
        // let response = await sverokModel.createMember({ firstname, lastname, email, phone, address, zip, city, nickname, ssn })
        let response = { request_result: "success" }
        if (response.name === "An Internal Error Has Occurred." || response.request_result === "success") {
            // Om ja eller nej, skapa i databas och boka plats
            let now = new Date();
            let date = now.toLocaleDateString('sv-SE');
            console.log(seat.row, seat.nr);
            let body = {
                "member": {
                    "firstname": firstname,
                    "lastname": lastname,
                    "email": email,
                    "phone1": phone,
                    "address": address,
                    "zip_code": zip,
                    "city": city,
                    "member_nick": nickname,
                    "street": address,
                    "renewed": date.toString(),
                },
                "seat": {
                    "row": seat.row,
                    "seat": seat.nr,
                },
                "event": active.eventName,
            };
            let res = await eventModel.bookSeat({ seat });
            console.log(res)
            if (res === 200) {
                await userModel.createUser(body);
            } else {
                alert("Platsen är redan bokad.");
                setLoading(false);
                return;
            }
            // navigate('/confirmation');
            navigate('/confirmation', { state: { userData } });
        } else {
            // Om något inte stämmer, visa felmeddelande  
            alert("Kontrollera personuppgifterna och försök igen.");
        }
        console.log({ firstname, lastname, email, phone, address, zip, city, nickname, ssn });
    };

    return (
        <>
            {loading ? <div className="loading"><Lottie animationData={lLoading}
                loop
                autoPlay
                style={{ width: "400px", height: "400px" }} /></div> : ""}
            <Nav />
            <div className="form-container">
                <h1>BOKNING AV PLATS {seat.row}{seat.nr}</h1>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="left">
                        <div>
                            <label>Förnamn:</label>
                            <input name="name" type="text" value={firstname} onChange={e => setFirstname(e.target.value)} placeholder="Skriv ditt förnamn" required />
                        </div>
                        <div>
                            <label>Efternamn:</label>
                            <input name="lastname" type="text" value={lastname} onChange={e => setLastname(e.target.value)} placeholder="Skriv ditt efternamn" required />
                        </div>
                        <div>
                            <label>E-post:</label>
                            <input name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Skriv din e-post" required />
                        </div>
                        <div>
                            <label>Telefon:</label>
                            <input name="phone" type="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Skriv ditt telefonnummer" required />
                        </div>
                        <div>
                            <label>Adress:</label>
                            <input name="street-address" type="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="Skriv din adress" required />
                        </div>
                    </div>
                    <div className="right">
                        <div>
                            <label>Postnummer:</label>
                            <input name="postal-code" type="postal-code" value={zip} onChange={e => setZip(e.target.value)} placeholder="Skriv ditt postnummer" required />
                        </div>
                        <div>
                            <label>Stad:</label>
                            <input name="city" type="city" value={city} onChange={e => setCity(e.target.value)} placeholder="Skriv din stad" required />
                        </div>
                        <div>
                            <label>Nickname:</label>
                            <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} placeholder="Skriv ditt smeknamn" required />
                        </div>
                        <div>
                            <label>Personnummer:</label>
                            <input name="name" type="ssn" onChange={e => ssnHandler(e)} placeholder="ÅÅÅÅMMDDXXXX" required="required" />
                        </div>

                        {underAge ?
                            <>
                                <div className="info">
                                    <p>Om du är under 18 måste du ha föräldrarnas tillåtelse och ange dess kontaktuppgifter:</p>
                                </div>
                                <div>
                                    <label>Förälders namn:</label>
                                    <input name="name" type="text" value={parentName} onChange={e => setParentName(e.target.value)} placeholder="Skriv förlälderns namn" required />
                                </div>
                                <div>
                                    <label>Förälders telefonnummer:</label>
                                    <input name="phone" type="phone" value={parentPhone} onChange={e => setParentPhone(e.target.value)} placeholder="Skriv förälderns telefonnr" required />
                                </div>
                                <div>
                                    <label for="under-age">Jag har förälderns tillåtelse att boka platsen.</label>
                                    <input type="checkbox" id="under-age" required />
                                </div>
                            </>
                            : ""}
                        <div>
                            <label for="terms">Jag godkänner <a href="/terms" target="_blank">villkoren</a>.</label>
                            <input type="checkbox" id="terms" name="terms" required />
                        </div>
                        <div>
                            <input className="submit" type="submit" value="BOKA" />
                        </div>
                    </div>
                </form>
            </div>
        </ >
    );
};

export default Event;