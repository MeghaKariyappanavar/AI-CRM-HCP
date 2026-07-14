import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import HCPList from "../pages/HCP/HCPList";
import CreateHCP from "../pages/HCP/CreateHCP";
import LogInteraction from "../pages/Interaction/LogInteraction";

export default function AppRoutes() {
    return (
        <Routes>

            <Route
                path="/"
                element={<Dashboard />}
            />

            <Route
                path="/hcps"
                element={<HCPList />}
            />

            <Route
                path="/hcp/create"
                element={<CreateHCP />}
            />

            <Route
                path="/interaction"
                element={<LogInteraction />}
            />

        </Routes>
    );
}