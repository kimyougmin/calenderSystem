import React from 'react';
import '../styles/CalenderModal.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CalenderObject from "../utils/CalenderObject";
import CurrentDay from "../utils/CurrentDay";
import TestModelReservedData from "../TextModel/TestModelReservedData";
import NextMont from "../utils/NextMonth";
import MonthDateType from "../types/MonthDateType";
import {calenderContext} from "../useContext/CalenderContext";
import CalenderSelectDay from "../utils/CalenderSelectDay";

interface props {
    isSelectDay: boolean;
    setIsSelectDay: React.Dispatch<React.SetStateAction<boolean>>
}

function CalenderModal({isSelectDay, setIsSelectDay}: props) {
    const currentDay = CurrentDay();
    const [beforeMonth, setBeforeMonth] = React.useState(currentDay);
    const [nextMonth, setNextMonth] = React.useState(NextMont());
    const reservationDate = TestModelReservedData();
    const [currentCalenderObject, setCurrentCalenderObject] = React.useState(CalenderObject({
        year: beforeMonth.year,
        month: beforeMonth.month,
        reservation: reservationDate.CurrenMonth
    }));
    const [nextCalenderObject, setNextCalenderObject] = React.useState(CalenderObject({
        year: nextMonth.year,
        month: nextMonth.month,
        reservation: reservationDate.NextMonth
    }));
    const {setIsModal, checkIn, setCheckIn, checkOut, setCheckOut} = React.useContext(calenderContext);
    let isTdId = true;

    React.useEffect(() => {
        setIsSelectDay(true);
    }, [])
    
    const onClickCalenderHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        const getId = target.id.split(' ');
        const calenderSelectDay = CalenderSelectDay({selectDay: Number(getId[2]), selectMonth: getId[1], currentMonth : currentCalenderObject, nextMonth: nextCalenderObject});
        if (isSelectDay) {
            setCurrentCalenderObject(calenderSelectDay.leftCalender)
            setNextCalenderObject(calenderSelectDay.rightCalender)
            setIsSelectDay(!isSelectDay)
        } else {
            getId[1] === 'true' ?
                setCheckOut([beforeMonth.year, beforeMonth.month, Number(getId[2])]) :
                setCheckOut([nextMonth.year, nextMonth.month, Number(getId[2])]);
            setIsModal(false)
        }
    }

    const calenderHTML = (calenderObject: MonthDateType[]) => {
        let calenderDate = [];
        let rows = [];
        for (let i = 0; i <= calenderObject.length - 1; i++) {
            if (i === 0) {
                for (let j = 0; j < calenderObject[0].day; j++) {
                    rows.push(<td className={`td cannot day${i + 1}`} key={`empty${j + 1}`}></td>);
                }
            }
            calenderObject[i].reservation === 0 ?
                rows.push(<td className={`td cannot day${i + 1}`} id={`cannot-day${i + 1}`}
                              key={`cannot-day${i + 1}`}>{calenderObject[i].date}</td>)
                : rows.push(<td onClick={(e) => onClickCalenderHandler(e)} className={`td day${i + 1}`}
                                id={`day ${isTdId} ${i + 1}`} key={`td-day${i + 1}`}>{calenderObject[i].date}</td>);

            if (calenderObject[i].day === 6) {
                calenderDate.push(<tr className={`rows`} key={`rows${calenderDate.length}`}>{rows}</tr>);
                rows = []
            }
            if (i === calenderObject.length - 1) {
                calenderDate.push(<tr className={`rows`} key={`rows${calenderDate.length}`}>{rows}</tr>);
            }
        }
        isTdId = !isTdId;
        return calenderDate;
    }

    const onBeforeBtnHandler = () => {
        if (beforeMonth.month === 1) {
            setBeforeMonth({
                year: beforeMonth.year - 1,
                month: 12,
                date: 1
            });
            setNextMonth({
                year: nextMonth.year,
                month: beforeMonth.month,
                date: 1
            });
        } else if (beforeMonth.month === 12 && nextMonth.month === 1) {
            setBeforeMonth({
                year: beforeMonth.year,
                month: beforeMonth.month - 1,
                date: 1
            });
            setNextMonth({
                year: beforeMonth.year,
                month: beforeMonth.month,
                date: 1
            });
        } else {
            setBeforeMonth({
                year: beforeMonth.year,
                month: beforeMonth.month - 1,
                date: 1
            });
            setNextMonth({
                year: beforeMonth.year,
                month: beforeMonth.month,
                date: 1
            });
        }
    }

    const onNextBtnHandler = () => {
        if (nextMonth.month === 12) {
            setBeforeMonth({
                year: beforeMonth.year,
                month: nextMonth.month,
                date: 1
            });
            setNextMonth({
                year: beforeMonth.year + 1,
                month: 1,
                date: 1
            });
        } else if (nextMonth.month === 1 && beforeMonth.month === 12) {
            setBeforeMonth({
                year: nextMonth.year,
                month: nextMonth.month,
                date: 1
            });
            setNextMonth({
                year: nextMonth.year,
                month: nextMonth.month + 1,
                date: 1
            });
        } else {
            setBeforeMonth({
                year: beforeMonth.year,
                month: nextMonth.month,
                date: 1
            });
            setNextMonth({
                year: beforeMonth.year,
                month: nextMonth.month + 1,
                date: 1
            });
        }
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
                        {(beforeMonth.month === currentDay.month) && (beforeMonth.year === currentDay.year) ?
                            <ArrowBackIosIcon className={'headerBtn before cannot'}/> :
                            <ArrowBackIosIcon onClick={onBeforeBtnHandler} className={'headerBtn before'}/>}
                        <p>{beforeMonth.year}년 {beforeMonth.month}월</p>
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
                        {calenderHTML(currentCalenderObject).map((e) => {
                            return e
                        })}
                        </tbody>
                    </table>
                </div>
                <div className={'calenderEnd'}>
                    <div className={'modalBody header'}>
                        <div></div>
                        <p>{nextMonth.year}년 {nextMonth.month}월</p>
                        <ArrowBackIosIcon onClick={onNextBtnHandler} className={'headerBtn next'}/>
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
                        {calenderHTML(nextCalenderObject).map((e) => {
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
