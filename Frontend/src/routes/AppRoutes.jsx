import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import HCPList from "../pages/HCP/HCPList";
import LogInteraction from "../pages/Interaction/LogInteraction";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/hcps" element={<HCPList />} />
            <Route
                path="/interaction"
                element={<LogInteraction />}
            />
        </Routes>
    );
}