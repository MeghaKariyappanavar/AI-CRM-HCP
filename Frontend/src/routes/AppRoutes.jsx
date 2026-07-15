import { Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import HCPList from "../pages/HCP/HCPList";
import CreateHCP from "../pages/HCP/CreateHCP";
import EditHCP from "../pages/HCP/EditHCP";
import LogInteraction from "../pages/Interaction/LogInteraction";
import InteractionHistory from "../pages/Interaction/InteractionHistory";
import EditInteraction from "../pages/Interaction/EditInteraction";
import AppLayout from "../layouts/AppLayout";

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/hcps" element={<HCPList />} />
                <Route path="/hcp/create" element={<CreateHCP />} />
                <Route path="/hcp/edit/:id" element={<EditHCP />} />
                <Route path="/interaction" element={<LogInteraction />} />
                <Route path="/interactions/history" element={<InteractionHistory />} />
                <Route path="/interactions/edit/:id" element={<EditInteraction />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}
