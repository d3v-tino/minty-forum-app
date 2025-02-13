import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import {Dashboard} from "./pages/Dashboard";
import {Navbar} from "./components/Navbar";
import {AuthProvider} from "./context/AuthContext";

const App: React.FC = () => {
    return(
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Dashboard/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                </Routes>
            </Router>
        </AuthProvider>
    )
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);