import React from "react";
import './style.css'
import { useState } from "react";
import sverokModel from "../../models/sverokModel";
import logModel from "../../models/logModel";

const SverokRegister = () => {
    const [currentStep, setCurrentStep] = useState(2);

    const [shortForm, setShortForm] = useState(true);

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

    const shortSteps = {
        fields: ['Personnummer', 'Mail', 'Telefon', 'Smeknamn', 'Jag godkänner villkoren'],
        type: ['number', 'email', 'phone', 'nickname', 'checkbox'],
        name: ['ssn', 'email', 'phone', 'nickname', 'terms'],
        label: 'Step 1',
        stepName: 'Personuppgifter'
    }


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

    function createLog() {
        let log = { "nickname": formData.nickname }
        logModel.createLog(log);
    }
    //Used to validate a ssn with a regex and a checksum
    function validateSSN(ssn) {
        ssn = ssn.replace(/\D/g, "");
        let regex = /^(19|20)[0-9]{10}$/;
        if (!regex.test(ssn)) {
            console.log("Invalid ssn");
            return false;
        }

        let num = ssn.slice(2, -1);
        let len = num.length;
        let sum = 0;

        for (let i = 0; i < len; i++) {
            let digit = parseInt(num.charAt(i));

            if (i % 2 === 0) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
        }

        let calculatedLastDigit = (10 - (sum % 10)) % 10;
        let actualLastDigit = parseInt(ssn.charAt(ssn.length - 1));

        return calculatedLastDigit === actualLastDigit;
    }

    async function sendMember(e) {
        e.preventDefault();
        let valid = document.getElementById("submit-form").checkValidity();
        let date = new Date();
        date = date.toLocaleString("en-SE", { timeZone: "Europe/Stockholm" }).slice(0, 10);
        if (validateSSN(formData.ssn) === false) {
            return alert("Felaktigt personnummer");
        }
        if (valid && !shortForm) {
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
                createLog();
                setCurrentStep(3);
            } else {
                alert("Något gick fel, testa fyll i igen");
                setCurrentStep(2);
                let temp = formData;
                Object.keys(temp).forEach(key => temp[key] = "");
                setFormData(temp);
                console.log("Error");
            }
        } else if (valid && shortForm) {
            const apiStructure = {
                "member": {
                    "renewed": date,
                    "email": formData.email,
                    "socialsecuritynumber": formData.ssn,
                    "phone1": formData.phone,
                    "member_nick": formData.nickname
                }
            };
            console.log("Short form");
            console.log(apiStructure);
            let res = await sverokModel.createMemberSPAR(apiStructure);

            if (res.request_result === "success") {
                console.log("Success");
                createLog();
                setCurrentStep(3);

            } else {
                alert("Något gick fel, testa fyll i igen");
                setCurrentStep(2);
                let temp = formData;
                Object.keys(temp).forEach(key => temp[key] = "");
                setFormData(temp);
                console.log("Error");
            }
        } else {
            alert("Fyll i alla fält");
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

    const handleShortToggle = () => {
        if (shortForm) {
            setCurrentStep(0);
        } else {
            setCurrentStep(2);
        }
        setShortForm(!shortForm);
    }

    return (<div className="form-container center" >
        <a href="/"><img className="etown-logo" src={process.env.PUBLIC_URL + '/images/Banner.png'} alt="etown" /></a>
        {shortForm ? <p>Automatisk hämtning av personuppgifter</p> : <p>Manuell inmatning</p>}
        <div class="toggle-switch">
            <label class="switch">
                <input type="checkbox" onClick={handleShortToggle} />
                <span class="slider round"></span>
            </label>
        </div>

        {
            currentStep < 3 ? <form id="submit-form" onSubmit={(e) => e.preventDefault()} className="register-form animate__animated">
                {
                    currentStep < 3 && !shortForm ? steps[currentStep].fields.map((field, index) => (
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
                    )) :

                        shortSteps.fields.map((field, index) => (
                            <div key={field}>
                                <label onClick={field === "Jag godkänner villkoren" ? openTerms : null}
                                    className={field === "Jag godkänner villkoren" ? "clickable-text" : null}>{field}</label>
                                <input name={shortSteps.name[index]}
                                    type={shortSteps.type[index]}
                                    value={formData[shortSteps.name[index]]}
                                    className={field}
                                    onChange={(e) => setFormData({ ...formData, [shortSteps.name[index]]: e.target.value })}
                                    placeholder={field === "Personnummer" ? "ÅÅÅÅMMDDXXXX" : field}
                                    required />
                            </div>
                        )
                        )
                }
                {
                    currentStep === 2 ?
                        <div className="next">
                            <button onClick={(e) => sendMember(e)}>BLI MEDLEM</button>
                        </div>
                        :
                        <div className="next">
                            <button onClick={(e) => nextStep(e)}>Nästa</button>
                        </div>
                }
                {
                    currentStep > 0 && !shortForm ? <div className="back"><button onClick={prevStep}>Tillbaka</button></div> : null
                }
            </form> : null
        }
        {currentStep === 3 ?
            <div id="submit-form" className="register-form success">
                <div><h2>Välkommen till E-town Gaming!</h2></div>
                <p>{formData.nickname}</p>
                <div className="next"><a href="/sverok-register">Tillbaka</a></div></div>
            : null
        }

    </div>);
};

export default SverokRegister;