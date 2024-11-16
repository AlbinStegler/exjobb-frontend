import React from 'react';
import Seat from './seat/seat';
import style from './table.module.css';

const Table = ({ seatInfo, onSeatClick, isBooked }) => {
    let data1 = { "row": seatInfo.row, "nr": seatInfo.nr };
    let data2 = { "row": seatInfo.row, "nr": seatInfo.nr + 1 };

    return (
        <div className={style.table} >
            <Seat seatInfo={data1} onSeatClick={onSeatClick} isBooked={isBooked[0]} />
            <Seat seatInfo={data2} onSeatClick={onSeatClick} isBooked={isBooked[1]} />
        </div>
    );
};

export default Table;