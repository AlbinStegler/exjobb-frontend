import React from 'react';
import style from './stage.module.css'

const stage = () => {
    return (
        <>
        <div className={style.stage}>
            <h1>MAIN STAGE</h1>
        </div>
        <p className={style.info}>Dubbelklicka på en bokad plats för att se vem som sitter där</p>
        </>
    );
};

export default stage;
