import React from "react";
import style from "./colorExplanation.module.css";

const ColorExplanation = () => {

    return (
        <div className={style.container}>

            <div className={style.color}>
                <p>TILLGÄNGLIG</p>
                <div className={`${style.colorBox} ${style.backgroundBlue}`} id="available"></div>
            </div>
            <div className={style.color}>
                <p>BOKAD</p>
                <div className={`${style.colorBox} ${style.backgroundRed}`} id="booked"></div>
            </div>
            <div className={style.color}>
                <p>VALD</p>
                <div className={`${style.colorBox} ${style.backgroundGray}`} id="selected"></div>
            </div>

        </div>
    )
}

export default ColorExplanation;