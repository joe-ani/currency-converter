"use client"

import React, { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

// Define the context type
interface StateGlobalContextType {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}


interface ChildProps {
    children: ReactNode;
}
// Create the context
const StateGlobalContext = createContext<StateGlobalContextType | undefined>(undefined);

// Create the provider
export const StateGlobalProvider = ({ children }: ChildProps) => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <StateGlobalContext.Provider value={{ loading, setLoading }}>
            {children}
        </StateGlobalContext.Provider>
    );
};

export default StateGlobalContext;