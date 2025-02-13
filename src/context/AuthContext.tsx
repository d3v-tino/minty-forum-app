import React from "react";
import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { User } from "../models/User";

interface AuthContextProps {

    isLoggedIn: boolean;
    token: string | null;
    user: User | null;
     
    login: (responseToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("No authentication context");
    }

    return context;
};

export const AuthProvider = ({ children }: {  children: ReactNode}) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const login = useCallback((responseToken: string) => {
        setToken(responseToken);
        localStorage.setItem("token", responseToken);
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn: !!token, login, logout, token, user }}>
            {children}
        </AuthContext.Provider>
    );
};
