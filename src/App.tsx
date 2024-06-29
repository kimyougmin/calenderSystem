import React, {useEffect} from 'react';
import './App.css';
import PaymentUi from "./components/PaymentUi";
import {useCookies} from "react-cookie";
import {CalenderContext} from "./useContext/CalenderContext";
import CalenderInit from "./utils/CalenderInit";

function App() {
    const [cookies, setCookies, removeCookie] = useCookies(['calenderDate']);
    //예약 시스템 쿠키 관리
    useEffect(() => {
        if(cookies.calenderDate === undefined) {
            setCookies('calenderDate',{
                    isModal: false,
                }
            );
        }
        return () => {
            if(cookies.calenderDate === undefined) return
            setCookies('calenderDate', { isModal: cookies.calenderDate.isModal })
        }
    },[]);

    return (
        <div className='app' >
            <div className='app-images'>

            </div>
            <div className='app-body'>
                <div className='app-content'>

                </div>
                <div className='app-payment'>
                    <CalenderContext.Provider value={CalenderInit}>
                        <PaymentUi/>
                    </CalenderContext.Provider>
                </div>
            </div>
        </div>
    )
}

export default App;
