import React from 'react';
import '../styles/CalenderModal.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CalenderObject, {DAY}from "../utils/CalenderObject";
import CurrentDay from "../utils/CurrentDay";
import TestModelReservedData from "../TextModel/TestModelReservedData";

function CalenderModal() {
    const currentDay = CurrentDay()
    const reservationDate = TestModelReservedData()
    const calenderObject = CalenderObject({year: currentDay.year, month: currentDay.month, reservation: reservationDate.CurrenMonth});

    let calenderDate = []
    let rows = []

    for(let i = 1; i <= calenderObject.length; i++) {
        if (i % 7 === 0) {
            calenderDate.push(<tr className={`rows`} key={`rows${calenderDate.length}`}>{rows}</tr>);
            rows = []
        }
        if (i === calenderObject.length - 1) {
            calenderDate.push(<tr className={`rows`} key={`rows${calenderDate.length}`}>{rows}</tr>);
        }
        if (i === 1) {
            for (let j = 0; j < calenderObject[0].day; j++) {
                rows.push(<td className={`td cannot day${i}`} key={`empty${j}`}></td>)
            }
        }
        calenderObject[i - 1].reservation === 0 ? rows.push(<td className={`td cannot day${i}`} id={`td-day${i}`} key={`day${i}`}>{i}</td>) : rows.push(<td className={`td day${i}`} id={`day${i}`} key={`td-cannot-day${i}`}>{i}</td>);
    }
    return (
        <div className='calender-modal'>
            <div className={'modal-title'}>
                <p>날짜 선택</p>
                <p>여행 날짜를 입력하여 정확한 요금을 확인하세요.</p>
            </div>
            <div className={'modal-body'}>
                <div className={'calenderStart'}>
                    <div className={'modalBody header'}>
                        <ArrowBackIosIcon />
                        <p>{currentDay.year}년 {currentDay.month}월</p>
                        <div></div>
                    </div>
                    <table className={'calender table'}>
                        <tbody>
                        <tr className={'table title'}>
                            <td>일</td>
                            <td>월</td>
                            <td>화</td>
                            <td>수</td>
                            <td>목</td>
                            <td>금</td>
                            <td>토</td>
                        </tr>
                        {calenderDate.map((e) => {
                                return e
                            })}
                        </tbody>
                    </table>
                </div>
                <div className={'calenderEnd'}>
                    <div className={'modalBody header'}>
                        <ArrowBackIosIcon/>
                        <p>{currentDay.year}년 {currentDay.month}월</p>
                        <div></div>
                    </div>
                    <table className={'calender table'}>
                        <tbody>
                        <tr className={'table title'}>
                            <td>일</td>
                            <td>월</td>
                            <td>화</td>
                            <td>수</td>
                            <td>목</td>
                            <td>금</td>
                            <td>토</td>
                        </tr>
                        {calenderDate.map((e) => {
                            return e
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CalenderModal;
