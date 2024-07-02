import React from 'react';
import './App.css';
import PaymentUi from "./components/PaymentUi";
import {useCookies} from "react-cookie";
import { CalenderContextProvider} from "./useContext/CalenderContext";

function App() {
    const [cookies, setCookies, removeCookie] = useCookies(['calenderDate']);

    //예약 시스템 쿠키 관리
    React.useEffect(() => {
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
        <div className='app'>
            <div className='app-images'>

            </div>
            <div className='app-body'>
                <div className='app-content'>

                </div>
                <div className='app-payment'>
                    <CalenderContextProvider>
                        <PaymentUi/>
                    </CalenderContextProvider>
                </div>
            </div>
        </div>
    )
}

export default App;
