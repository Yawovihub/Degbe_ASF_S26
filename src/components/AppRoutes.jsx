import {Navigate, Route, Routes} from "react-router-dom";
import App from "../App.jsx";
import UserManagement from "./UserManagement.jsx";
import SoldierDashboard from "./SoldierDashboard.jsx";

const AppRoutes = () => {
    return(

            <Routes>
                <Route path="/" element={<Navigate to="/landing" replace />} />
                {/* Define unique paths for your components */}
                {/*<Route path="/landing" element={<UserManagement />} />*/}
                <Route path="/app" element={<SoldierDashboard />} />
            </Routes>

    )
}
export default AppRoutes;