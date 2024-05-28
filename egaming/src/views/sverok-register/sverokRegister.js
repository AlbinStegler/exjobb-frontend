import React from "react";
import './style.css'
import { useState } from "react";
import sverokModel from "../../models/sverokModel";

const SverokRegister = () => {
    const [currentStep, setCurrentStep] = useState(0);

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

    async function sendMember() {
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
        console.log(apiStructure);
        let res = await sverokModel.createMember(apiStructure);
        if (res.request_result === "success") {
            console.log("Success");
        } else {
            console.log("Error");
        }
    }

    function nextStep(e) {
        e.preventDefault();
        let valid = document.getElementById("submit-form").checkValidity();
        if (valid) {
            if (currentStep < steps.length - 1) {
                let form = document.getElementById('submit-form');
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


            }
        } else {
            alert("Fyll i alla fält");
        }

    }

    const prevStep = () => {
        formData.ssn = "";
        if (currentStep > 0) {
            let form = document.getElementById('submit-form');
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
    function openTerms() {
        window.open("/lan-terms", "_blank");
    }
    return (<div className="form-container center" >
        <img className="etown-logo" src={process.env.PUBLIC_URL + '/images/Banner.png'} alt="etown" />
        <form id="submit-form" onSubmit={(e) => e.preventDefault()} className="register-form animate__animated">
            {currentStep < 3 ? steps[currentStep].fields.map((field, index) => (
                <div key={field}>
                    <label onClick={field === "Jag godkänner villkoren" ? openTerms : null}
                        className={field === "Jag godkänner villkoren" ? "clickable-text" : null}>{field}</label>
                    <input name={steps[currentStep].name[index]}
                        type={steps[currentStep].type[index]}
                        value={formData[steps[currentStep].name[index]]}
                        className={field}
                        onChange={(e) => setFormData({ ...formData, [steps[currentStep].name[index]]: e.target.value })}
                        placeholder={field}
                        required />
                </div>
            )) : null}
            {currentStep > 0 ? <div><button className="next" onClick={prevStep}>Tillbaka</button></div> : null}
            {currentStep === 2 ?
                <div>
                    <button className="next" onClick={(e) => sendMember(e)}>BLI MEDLEM</button>
                </div>
                :
                <div>
                    <button className="next" onClick={(e) => nextStep(e)}>Nästa</button>
                </div>}
        </form>
        <div className="event-sponsors">
            <div className="three-col">
                <img src={process.env.PUBLIC_URL + '/images/sparbanken.jpg'} alt="sparbanken" />
                <img src={process.env.PUBLIC_URL + '/images/lfsodermanland.jpg'} alt="Länsförsäkrningar Södermanland" />
                <img src={process.env.PUBLIC_URL + '/images/cherryxtrfy.png'} alt="xtrfy" />
            </div>
            <div className="three-col">
                <img src={process.env.PUBLIC_URL + '/images/stiga.png'} alt="sverok" />
                <img src={process.env.PUBLIC_URL + '/images/dreamhacklogo.png'} alt="sverok" />

            </div>
        </div>
    </div>);
};

export default SverokRegister;