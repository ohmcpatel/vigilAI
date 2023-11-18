import React from 'react';
import { useState } from 'react';
import './ReportCard.css';
import Popup from './Popup';

function ReportCard({field1, field2, field3, setOpenModel}) {
    const [openModal, setOpenModal] = useState({state: false});
    function handleClick() {
        return <Popup />;
    }
    return (
        <div 
        className='ReportCard'
        onClick={handleClick}>
            <h1>{field1}</h1>
            <h1>{field2}</h1>
            <h1>{field3} mistakes</h1>
        </div>
    )
}
export default ReportCard;