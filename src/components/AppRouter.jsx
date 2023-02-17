import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import Leaderboard from './pages/Leaderboard';
import Menu from './pages/Menu';
import Options from './pages/Options';
import Sapper from './pages/Sapper';

const AppRouter = () => {
    return (
        <Routes>
            <Route key='/game' path='/game' element={<Sapper />} />
            <Route key='/menu' path='/menu' element={<Menu />} />
            <Route key='/leaderboard' path='/leaderboard' element={<Leaderboard />} />
            <Route key='/options' path='/options' element={<Options />} />
            <Route
                path="*"
                element={<Navigate to="/menu" replace />}
            />
        </Routes>
    )
}

export default AppRouter