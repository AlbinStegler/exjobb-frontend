import React from "react";
import "./style.css";
import Gamenight2023 from "./2023/gamenight2023";
import Gamenight2022 from "./2022/gamenight2022";
import Gamenight2021 from "./2021/gamenight2021";
const EgameNights = () => {

    return (
        <div className='egame-nights'>
            <h1>E-Game Nights</h1>
            <Gamenight2023 />
            <Gamenight2022 />
            <Gamenight2021 />
        </div>
    );
}

export default EgameNights;