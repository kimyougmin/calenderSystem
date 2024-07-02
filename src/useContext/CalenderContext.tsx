import React from 'react';
import CalenderType from "../types/CalenderType";
import CalenderInit from "../utils/CalenderInit";

const calenderInit = CalenderInit;
export const calenderContext = React.createContext<CalenderType>(calenderInit);
export const isCalenderContext = React.createContext((isModal: boolean) => {})

export function CalenderContextProvider({children}: {children: React.ReactNode}) {
    const [isModal, setIsModal] = React.useState<boolean>(false);

    return(
        <calenderContext.Provider value={{isModal, setIsModal, checkIn: calenderInit.checkIn, checkOut: calenderInit.checkOut, count: calenderInit.count}}>
            <isCalenderContext.Provider  value={setIsModal}>
                {children}
            </isCalenderContext.Provider>
        </calenderContext.Provider>
    )
}
