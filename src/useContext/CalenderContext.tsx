import React from 'react';
import CalenderType from "../types/CalenderType";
import CalenderInit from "../utils/CalenderInit";

const calenderInit = CalenderInit;
export const calenderContext = React.createContext<CalenderType>(calenderInit);
export const isCalenderContext = React.createContext((isModal: boolean) => {});

export function CalenderContextProvider({children}: {children: React.ReactNode}) {
    const [isModal, setIsModal] = React.useState<boolean>(false);
    const [checkIn, setCheckIn] = React.useState(calenderInit.checkIn);
    const [checkOut, setCheckOut] = React.useState(calenderInit.checkOut);
    const [count, setCount] = React.useState(calenderInit.count);

    return(
        <calenderContext.Provider value={{isModal, setIsModal, checkIn, setCheckIn, checkOut, setCheckOut, count, setCount}}>
            <isCalenderContext.Provider  value={setIsModal}>
                {children}
            </isCalenderContext.Provider>
        </calenderContext.Provider>
    )
}
