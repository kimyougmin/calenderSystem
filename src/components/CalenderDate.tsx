import React from 'react';

function CalenderDate() {

    // 예약된 날짜를 가지고 올 모듈
    const reservedDayModel = () => {
        return [6, 21,22, 23, 24, 28,29]
    }
    // console.log('year: 2023, month: 6,', CalenderObject({year: 2023, month: 6, reservation: reservedDayModel()}))
    // console.log('year: 2024, month: 3', CalenderObject({year: 2024, month: 3, reservation: reservedDayModel()}))
    return (
        <div className='calender-modal' style={{width:'300px', height:'100px', backgroundColor:'black'}}>
            <p className='aaaa'>ddd</p>
        </div>
    );
}

export default CalenderDate;
