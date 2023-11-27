"use client"

import React, { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

// Define the context type
interface StateGlobalContextType {
    modalState: boolean;
    setModalState: Dispatch<SetStateAction<boolean>>;
}


interface ChildProps {
    children: ReactNode;
}
// Create the context
const StateGlobalContext = createContext<StateGlobalContextType | undefined>(undefined);

// Create the provider
export const StateGlobalProvider = ({ children }: ChildProps) => {
    const [modalState, setModalState] = useState<boolean>(false);

    return (
        <StateGlobalContext.Provider value={{ modalState, setModalState }}>
            {children}
        </StateGlobalContext.Provider>
    );
};

export default StateGlobalContext;