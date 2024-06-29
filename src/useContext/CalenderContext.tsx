import React from 'react';
import CalenderType from "../types/CalenderType";
import CalenderInit from "../utils/CalenderInit";

export const CalenderContext = React.createContext<CalenderType>(CalenderInit);
