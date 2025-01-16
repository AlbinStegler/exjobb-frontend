import React, { useState, useEffect } from "react";
import Nav from "../../components/navbar/nav";
import "./style.css";
import { useLocation, useNavigate } from 'react-router-dom';
import sverokModel from "../../models/sverokModel";
import eventModel from "../../models/eventModel";
import userModel from "../../models/userModel";
// import Lottie from 'lottie-react';
// import lLoading from '../../lotties/loading.json';

const Event = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const seat = location.state?.seat; // Use optional chaining operator skickas från book.js
    const visitor = location.state?.visitor; // Use optional chaining operator skickas från book.js


    const [parentName, setParentName] = useState("");
    const [parentPhone, setParentPhone] = useState("");

    const [underAge, setUnderAge] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    // Om personen är under 18 år, sätt förälderns namn och telefonnummer
    useEffect(() => {
        if (parentName && parentPhone) {
            console.log(parentName, parentPhone);
            setFormData(prevState => ({
                ...prevState,
                "parentName": parentName,
                "parentPhone": parentPhone
            }));
        }
    }, [parentName, parentPhone]);

    const [formData, setFormData] = useState({
        fName: "",
        lName: "",
        email: "",
        phone: "",
        address: "",
        zip: "",
        city: "",
        nickname: "",
        ssn: "",
        parentName: "",
        parentPhone: "",
    });


    const steps = [
        {
            fields: ['Förnamn', 'Efternamn', 'Mail', 'Telefon'],
            type: ['text', 'text', 'email', 'phone'],
            name: ['fName', 'lName', 'email', 'phone'],
            label: 'Step 1',
            stepName: 'Personuppgifter'
        },
        {
            fields: ['Adress', 'Postkod', 'Stad', 'Smeknamn'],
            type: ['address', 'zip', 'city', 'nickname'],
            name: ['address', 'zip', 'city', 'nickname'],
            label: 'Step 2',
            stepName: 'Address'

        },
        {
            fields: ['Personnummer', 'Jag godkänner villkoren'],
            type: ['ssn', 'checkbox'],
            name: ['ssn', 'terms'],
            label: 'Step 3',
            stepName: 'Personnummer'
        },
        {
            label: 'Step 4',
            stepName: 'Bekräftelse'
        }
    ]
    const isFormValid = () => {
        let form = document.getElementById('form')
        // console.log(form.checkValidity());
        let formChilds = document.getElementById('form').childNodes;
        for (let i = 0; i < formChilds.length; i++) {
            if (formChilds[i].childNodes[1]) {
                let valid = formChilds[i].childNodes[1].checkValidity();
                if (valid) {
                    formChilds[i].childNodes[1].classList.remove("is-invalid");
                    formChilds[i].childNodes[1].classList.add("is-valid");
                } else {
                    formChilds[i].childNodes[1].classList.add("is-invalid");
                    formChilds[i].childNodes[1].classList.remove("is-valid");
                }
            }
        }
        return form.checkValidity();
    };

    const handleChange = (e) => {
        if (e.target.name === 'terms') { return; }
        if (e.target.name === 'ssn') {
            ssnHandler(e);
        }

        let formChilds = document.getElementById('form').childNodes;
        for (let i = 0; i < formChilds.length; i++) {
            if (formChilds[i].childNodes[1]) {
                let valid = formChilds[i].childNodes[1].checkValidity();
                if (valid) {
                    formChilds[i].childNodes[1].classList.remove("is-invalid");
                    formChilds[i].childNodes[1].classList.add("is-valid");
                } else {
                    formChilds[i].childNodes[1].classList.add("is-invalid");
                    formChilds[i].childNodes[1].classList.remove("is-valid");
                }
            }
        }

        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const nextStep = (e) => {
        if (currentStep < 3) {
            if (!isFormValid()) {
                alert("Kontrollera alla fält och försök igen.");
                return;
            }
        }
        if (currentStep < steps.length - 1) {
            let form = document.getElementById('form');
            form.style.setProperty('--animate-duration', '0.5s');
            form.classList.add("animate__bounceOutLeft");
            setTimeout(() => {
                setCurrentStep(currentStep + 1);
                form.classList.remove("animate__bounceOutLeft");
                form.classList.add("animate__bounceInRight");
            }, 400);
            setTimeout(() => {
                form.classList.remove("animate__bounceInRight");
            }, 1000);


        } else {
            handleSubmit();
        }
    };

    const prevStep = () => {
        setUnderAge(false);
        formData.ssn = "";
        if (currentStep > 0) {
            let form = document.getElementById('form');
            form.style.setProperty('--animate-duration', '0.5s');
            form.classList.add("animate__bounceOutRight");
            setTimeout(() => {
                setCurrentStep(currentStep - 1);
                form.classList.remove("animate__bounceOutRight");
                form.classList.add("animate__bounceInLeft");
            }, 400);
            setTimeout(() => {
                form.classList.remove("animate__bounceInLeft");
            }, 1000);
        }
    };

    useEffect(() => {
        // Redirect to "/book" if the seat is not available
        if (!seat && !visitor) {
            navigate('/book');
        }
    }, [seat, visitor, navigate]);

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
            } else {
                setUnderAge(false);
            }
        } else {
            setUnderAge(false);
        }
        setFormData(prevState => ({
            ...prevState,
            "ssn": ssn
        }));
    }

    const handleSubmit = async () => {
        let active = await eventModel.getActiveEvent();

        let userData = {
            "firstname": formData.fName,
            "lastname": formData.lName,
            "email": formData.email,
            "phone": formData.phone,
            "address": formData.address,
            "zip": formData.zip,
            "city": formData.city,
            "nickname": formData.nickname,
            "ssn": formData.ssn,
            "parentName": formData.parentName,
            "parentPhone": formData.parentPhone,
            "event": active.eventName,
            "seat": seat,
        }
        // Handle form submission here
        function validateEmail(email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }


        if (!validateEmail(formData.email)) {
            alert("Felaktig e-postadress");
            setCurrentStep(1);
            return;
        }
        // Är personen medlem?
        // let response = await sverokModel.createMember({ firstname, lastname, email, phone, address, zip, city, nickname, ssn })
        let date = new Date();
        date = date.toLocaleString("en-SE", { timeZone: "Europe/Stockholm" }).slice(0, 10);
        const apiStructure = {
            "member": {
                "firstname": formData.fName,
                "lastname": formData.lName,
                "renewed": date,
                "email": formData.email,
                "socialsecuritynumber": formData.ssn,
                "phone1": formData.phone,
                "street": formData.address,
                "zip_code": formData.zip,
                "city": formData.city,
                "member_nick": formData.nickname
            }
        };
        // let response = await sverokModel.createMember(apiStructure) // AVKOMMENTERA NÄR API ÄR KLAR
        let response = { request_result: "success" } // För testning
        if (response.name === "An Internal Error Has Occurred." || response.request_result === "success") {
            // Om ja eller nej, skapa i databas och boka plats
            let now = new Date();
            let date = now.toLocaleDateString('sv-SE');
            console.log({ seat });
            let body = {
                "member": {
                    "firstname": formData.fName,
                    "lastname": formData.lName,
                    "email": formData.email,
                    "phone1": formData.phone,
                    "address": formData.address,
                    "zip_code": formData.zip,
                    "city": formData.city,
                    "member_nick": formData.nickname,
                    "renewed": date.toString(),
                    "parentPhone": userData.parentPhone,
                    "parentName": userData.parentName,
                },
                "event": active.eventName,
            };

            if (seat) {
                body.seat = { row: seat.row, seat: seat.nr };
            } else if (visitor) {
                body.visitor = visitor;
            }

            let userSuccess = false;

            // Skapa användare
            let userResult = await userModel.createUser(body);
            // Finns användaren redan, uppdatera användaren
            if (userResult.error) {
                //Hitta id
                let id = await userModel.findByEmailorNickname({ email: formData.email, nickname: formData.nickname });
                body._id = id._id;
                //Uppdatera användaren om den inte har bokat plats på aktiva lanet
                if (id.event === active.eventName) {
                    alert("Du har redan bokat en plats på detta lan.")
                    return;
                } else {
                    let status = await userModel.updateUser(body);
                    console.log(status)
                    console.log(body)
                    if (status.status === 200) {
                        userSuccess = true;
                    }
                }
            } else {
                userSuccess = true;
            }


            // Om användaren fått en plats, boka platsen

            let res;
            if (seat && userSuccess) {
                res = await eventModel.bookSeat({ seat, nickname: formData.nickname });
            }
            else if (visitor) {
                res = await eventModel.bookVisitor({ nickname: formData.nickname });
            }
            if (res !== 200) {
                // Om platsen redan är bokad, visa felmeddelande
                alert("Platsen är redan bokad.");
                return;
            }

            navigate('/confirmation', { state: { userData } });
        } else {
            // Om något inte stämmer, visa felmeddelande  
            alert("Kontrollera personuppgifterna och försök igen.");
        }
    };

    function openTerms() {
        window.open("/lan-terms", "_blank");
    }

    return (
        <>
            {/* {loading ? <div className="loading"><Lottie animationData={lLoading}
                loop
                autoPlay
                style={{ width: "400px", height: "400px" }} /></div> : ""} */}
            <Nav />
            <div className="progressbar">
                <div className={currentStep >= 0 ? "step current-step" : "step"}>
                    <p>1</p>
                    <p>personuppgifter</p>
                </div>
                <div className={currentStep >= 1 ? "step current-step" : "step"}>
                    <p>2</p>
                    <p>address</p>
                </div>
                <div className={currentStep >= 2 ? "step current-step" : "step"}>
                    <p>3</p>
                    <p>Boka</p>
                </div>
            </div>
            <div className="form-container-booking">
                {seat ? <h1>BOKNING AV PLATS {seat.row}{seat.nr}</h1> : <h1>BOKNING AV BESÖKSBILJETT</h1>}
                <form id='form' className="register-form animate__animated" onSubmit={handleSubmit}>
                    {currentStep < 3 ? steps[currentStep].fields.map((field, index) => (
                        <div key={field}>
                            <label
                                onClick={field === "Jag godkänner villkoren" ? openTerms : null}
                                className={field === "Jag godkänner villkoren" ? "clickable-text" : null}>{field === 'ssn' ? 'Personnummer' : field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                            <input name={steps[currentStep].name[index]}
                                type={steps[currentStep].type[index]}
                                value={formData[steps[currentStep].name[index]]}
                                className={field === 'Jag godkänner villkoren' ? "checkbox" : null}
                                onChange={handleChange}
                                placeholder={field === 'Personnummer' ? 'ÅÅÅÅMMDDXXXX' : `${field}`}
                                />
                        </div>
                    )) :
                        <div className="confirmation-field">
                            <h2>Uppgifter</h2>
                            <div className="two-col">
                                <p>Namn:</p>
                                <p>{formData.fName} {formData.lName}</p>
                            </div>
                            <div className="two-col">
                                <p>E-post:</p>
                                <p> {formData.email}</p>
                            </div>
                            <div className="two-col">
                                <p>Telefon:</p>
                                <p> {formData.phone}</p>
                            </div>
                            <div className="two-col">
                                <p>Adress:</p>
                                <p> {formData.address}</p>
                            </div>
                            <div className="two-col">
                                <p>Postnummer:</p>
                                <p> {formData.zip}</p>
                            </div>
                            <div className="two-col">
                                <p>Ort:</p>
                                <p> {formData.city}</p>
                            </div>
                            <div className="two-col">
                                <p>Användarnamn:</p>
                                <p>{formData.nickname}</p>
                            </div>
                            {underAge ?
                                <>
                                    <div className="two-col">
                                        <p>Förälders namn:</p>
                                        <p>{formData.parentName}</p>
                                    </div>
                                    <div className="two-col">
                                        <p>Förälders telefon:</p>
                                        <p>{formData.parentPhone}</p>
                                    </div>
                                </> : ""}

                        </div>

                    }
                    {underAge && currentStep === 2 ?
                        <>
                            <div className="info">
                                <p>Om du är under 18 måste du ha föräldrarnas tillåtelse och ange dess kontaktuppgifter:</p>
                            </div>
                            <div>
                                <label>Förälders namn:</label>
                                <input name="parentName" type="text" value={parentName} onChange={e => setParentName(e.target.value)} placeholder="Skriv förlälderns namn" required />
                            </div>
                            <div>
                                <label>Förälders telefonnummer:</label>
                                <input name="parentPhone" type="phone" value={parentPhone} onChange={e => setParentPhone(e.target.value)} placeholder="Skriv förälderns telefonnr" required />
                            </div>
                            <div>
                                <label for="under-age">Jag har förälderns tillåtelse att boka platsen.</label>
                                <input type="checkbox" id="under-age" required />
                            </div>
                        </>
                        : ""}
                    {currentStep > 0 ? <div className="back">
                        <button type="button" onClick={prevStep}>Tillbaka</button>
                    </div> : ""}
                    {
                        currentStep === 3 ?
                            <div className="next">
                                <button type="button" onClick={nextStep}>Boka</button>
                            </div> :
                            <div className="next">
                                <button type="button" onClick={nextStep}>Nästa</button>
                            </div>
                    }
                </form >
            </div >
        </ >
    );
};

export default Event;