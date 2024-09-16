import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import { Painel } from "../pages/Painel";

import context from "../context/userContext";
import { useState } from "react";

export const RoutesPage = () => {
    const [user, setUser] = useState({});

    const ProtectedRoute = (props) => {
        return user.login ? props.children : <Navigate to="/" />
    }

    return (
        <BrowserRouter>
            <Routes>

                <Route element={
                    <context.Provider value={{ setUser }}>
                        <App />
                    </context.Provider>
                } path="/" />

                <Route element={
                    <context.Provider value={{ user }}>
                        <ProtectedRoute>
                            <Painel />
                        </ProtectedRoute>
                    </context.Provider>
                } path="/painel-ativos" />

                {/* rotas não es[ecificadas encaminharão para a tela de login */}
                <Route path="/*" element={<Navigate to={"/"} />} />

            </Routes>
        </BrowserRouter>
    )
}