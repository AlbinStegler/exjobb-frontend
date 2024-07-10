import React from "react";
import './style.css';

const EtownAcademy = ({ namn1, namn2, namn3, namn4, namn5 }) => {
    return (
        <div className='etown-academy'>
            <h1>Etown Academy</h1>
            <div className="etown-players">
                <p>{namn1}</p>
                <p>{namn2}</p>
                <p>{namn3}</p>
                <p>{namn4}</p>
                <p>{namn5}</p>
            </div>
        </div>
    );
};

export default EtownAcademy;