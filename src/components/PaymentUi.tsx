import React from 'react';
import CurrentDay from "../utils/CurrentDay";
import CalenderDate from "./CalenderDate";
import '../styles/PaymentUi.css'

function PaymentUi() {
    const [modal, setModal] = React.useState(false);
    const modalRef = React.useRef<HTMLDivElement>(null);
    const [reservationInformation, setReservationInformation] = React.useState({
        dayPrice: 0,
        checkIn: CurrentDay(),
        checkOut: {year: 0, month: 0, day: 0}
    });
    React.useEffect(() => {
        dummyModule();
    },[])
    const closeModal = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setModal(true);
    }
    const dummyModule = () => {
        setReservationInformation({
            dayPrice: 90000,
            checkIn: reservationInformation.checkIn,
            checkOut: reservationInformation.checkOut
        });
    }
    const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const target = e.target as HTMLDivElement;
        const refCurrent = modalRef.current as HTMLDivElement;
        if (!refCurrent) {
            return null;
        }
        if (target.className === 'calender-modal' && refCurrent.className === 'modal-box') {
            return null;
        }
        setModal(false);
    }
    return (
        <div className='payment-none' onClick={(e => onClickHandler(e))}>
            <div style={{display:'flex'}}>
                <h2>₩{reservationInformation.dayPrice} </h2>
                <p>/박</p>
            </div>
            <div style={{display:'flex'}}>
                <div>
                    <p>check-in</p>
                    <p>{reservationInformation.checkIn.year}. {reservationInformation.checkIn.month}. {reservationInformation.checkIn.date}.</p>
                </div>
                <div>
                    <p>check-out</p>
                    <p>날짜를 선택해주세요</p>
                </div>
            </div>
            <button onClick={(e) => closeModal(e)}>Open Modal</button>
            {modal ?
                <div ref={modalRef} className='modal-box'>
                    <CalenderDate/>
                </div> : null}
        </div>
    )
}

export default PaymentUi;