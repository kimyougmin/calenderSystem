import React from 'react';
import '../styles/PaymentUi.css';
import CalenderModal from "./CalenderModal";
import {calenderContext} from "../useContext/CalenderContext";
import {Button} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function PaymentUi() {
    const {isModal, setIsModal, checkIn, checkOut, count} = React.useContext(calenderContext);
    const modalRef = React.useRef<HTMLDivElement>(null);
    const [reservationInformation, setReservationInformation] = React.useState({
        dayPrice: 0,
        checkIn: checkIn,
        checkOut: checkOut,
        cleaningFee: 0
    });

    React.useEffect(() => {
        dummyModule();
    }, []);

    const dummyModule = () => {
        setReservationInformation({
            dayPrice: 90000,
            checkIn,
            checkOut,
            cleaningFee: 20000
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
        setIsModal(true);
    }
    return (
        <div className='payment-none' onClick={(e => onClickHandler(e))}>
            <div className={'payment-header'}>
                <p>₩{reservationInformation.dayPrice.toLocaleString()} </p>
                <p>/박</p>
            </div>
            <div className={'payment-selector'}>
                <div className={'selector-day'}>
                    <div onClick={onOpenModal}>
                        <p>check-in</p>
                        <p>{checkIn[0]}. {checkIn[1]}. {checkIn[2]}.</p>
                    </div>
                    <div onClick={onOpenModal}>
                        <p>check-out</p>
                        <p>{checkOut[0]}. {checkOut[1]}. {checkOut[2]}.</p>
                    </div>
                </div>
                <div className={'selector-person'}>
                    <div>
                        <p>인원</p>
                        <p>게스트 1인 </p>
                    </div>
                    <ArrowBackIosIcon className={'person-icon'}/>
                </div>
            </div>
            <div className={'payment-footer'}>
                <Button variant="contained" disableElevation>
                    예약하기
                </Button>
                <span>
                    <p>₩{reservationInformation.dayPrice.toLocaleString()} X {count.toLocaleString()}박</p>
                    <p>₩{(reservationInformation.dayPrice * count).toLocaleString()}</p>
                </span>
                {
                    reservationInformation.cleaningFee === 0 ?
                        null :
                        <span>
                            <p>청소비</p>
                            <p>₩{reservationInformation.cleaningFee.toLocaleString()}</p>
                        </span>
                }
                <span>
                    <p>총 합계</p>
                    <p>₩{(reservationInformation.dayPrice * count + reservationInformation.cleaningFee).toLocaleString()}</p>
                </span>
            </div>
            {isModal ?
                <div ref={modalRef} className='modal-box'>
                    <button onClick={() => {
                        setIsModal(false)
                    }}>close
                    </button>
                    <CalenderModal/>
                </div> : null}
        </div>
    )
}

export default PaymentUi;