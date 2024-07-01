import React from 'react';
import CurrentDay from "../utils/CurrentDay";
import '../styles/PaymentUi.css';
import CalenderModal from "./CalenderModal";
import {CalenderContext} from "../useContext/CalenderContext";


function PaymentUi() {
    const {isModal, setIsModal, checkIn, checkOut, count} = React.useContext(CalenderContext);
    const [isModalControl, setIsModalControl] = React.useState(isModal);
    const modalRef = React.useRef<HTMLDivElement>(null);
    const [reservationInformation, setReservationInformation] = React.useState({
        dayPrice: 0,
        checkIn: checkIn,
        checkOut: checkOut
    });

    React.useEffect(() => {
        dummyModule();
    }, []);

    const dummyModule = () => {
        setReservationInformation({
            dayPrice: 90000,
            checkIn,
            checkOut,
        });
    };
    const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const refCurrent = modalRef.current as HTMLDivElement;
        if (!refCurrent) {
            return null;
        }
    }
    const onOpenModal = () => {
        setIsModalControl(true);
    }
    return (
        <div className='payment-none' onClick={(e => onClickHandler(e))}>
            <div className={'payment-header'}>
                <p>₩{reservationInformation.dayPrice * count} </p>
                <p>/박</p>
            </div>
            <div style={{display: 'flex'}}>
                <div onClick={onOpenModal}>
                    <p>check-in</p>
                    <p>{checkIn[0]}. {checkIn[1]}. {checkIn[2]}.</p>
                </div>
                <div onClick={onOpenModal}>
                    <p>check-out</p>
                    <p>{checkOut[0]}. {checkOut[1]}. {checkOut[2]}.</p>
                </div>
            </div>
            {isModalControl ?
                <div ref={modalRef} className='modal-box'>
                    <button onClick={() => {setIsModalControl(false)}}>close</button>
                    <CalenderModal/>
                </div> : null}
        </div>
    )
}

export default PaymentUi;