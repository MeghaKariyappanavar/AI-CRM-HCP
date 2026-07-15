import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Skeleton,
    Stack,
    Typography
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import TodayIcon from "@mui/icons-material/Today";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import ChatIcon from "@mui/icons-material/Chat";

import api from "../../services/api";

const fallbackStats = [
    { title: "Total HCPs", key: "total_hcps", icon: <PeopleIcon /> },
    { title: "Today's Interactions", key: "today_interactions", icon: <TodayIcon /> },
    { title: "Pending Follow-ups", key: "pending_followups", icon: <EventRepeatIcon /> },
    { title: "Interactions", key: "total_interactions", icon: <ChatIcon /> }
];

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const response = await api.get("/dashboard/stats");
                setStats(response.data);
            } catch (err) {
                setError("Unable to load dashboard data right now.");
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    return (
        <Stack spacing={3}>
            <Box>
                <Typography variant="h4" fontWeight={800} gutterBottom>
                    Field team dashboard
                </Typography>
                <Typography color="text.secondary">
                    Keep HCPs, visits, and follow-ups organized from one clean workspace.
                </Typography>
            </Box>

            {error && <Alert severity="warning">{error}</Alert>}

            <Grid container spacing={3}>
                {fallbackStats.map((item) => {
                    const value = stats?.[item.key];
                    return (
                        <Grid item xs={12} sm={6} md={3} key={item.key}>
                            <Card sx={{ height: "100%" }}>
                                <CardContent>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Box
                                            sx={{
                                                width: 48,
                                                height: 48,
                                                borderRadius: 2,
                                                display: "grid",
                                                placeItems: "center",
                                                bgcolor: "primary.main",
                                                color: "common.white"
                                            }}
                                        >
                                            {item.icon}
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.title}
                                            </Typography>
                                            <Typography variant="h4" fontWeight={800}>
                                                {loading ? <Skeleton width={60} /> : value ?? 0}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                                <Box>
                                    <Typography variant="h6" fontWeight={800}>
                                        Recent interactions
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        The latest field updates at a glance.
                                    </Typography>
                                </Box>
                                <Button component={RouterLink} to="/interaction" variant="outlined">
                                    Log interaction
                                </Button>
                            </Stack>
                            <Divider sx={{ mb: 2 }} />
                            <Stack spacing={2}>
                                {(stats?.recent_interactions ?? []).map((item) => (
                                    <Box
                                        key={`${item.doctor_name}-${item.summary}`}
                                        sx={{
                                            p: 2,
                                            borderRadius: 2,
                                            bgcolor: "grey.50",
                                            border: "1px solid",
                                            borderColor: "divider"
                                        }}
                                    >
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                            <Box>
                                                <Typography fontWeight={700}>{item.doctor_name}</Typography>
                                                <Typography variant="body2" color="text.secondary" noWrap>
                                                    {item.summary || "No summary available."}
                                                </Typography>
                                            </Box>
                                            <Chip
                                                label={item.sentiment || "Neutral"}
                                                color={
                                                    item.sentiment === "Positive"
                                                        ? "success"
                                                        : item.sentiment === "Negative"
                                                        ? "error"
                                                        : "warning"
                                                }
                                            />
                                        </Stack>
                                    </Box>
                                ))}
                                {!loading && (stats?.recent_interactions ?? []).length === 0 && (
                                    <Typography color="text.secondary">No interactions recorded yet.</Typography>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={5}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight={800} gutterBottom>
                                Quick actions
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Jump straight into the most common tasks.
                            </Typography>
                            <Stack spacing={2}>
                                <Button component={RouterLink} to="/hcps" variant="contained" fullWidth>
                                    View HCP directory
                                </Button>
                                <Button component={RouterLink} to="/hcp/create" variant="outlined" fullWidth>
                                    Add a new HCP
                                </Button>
                                <Button component={RouterLink} to="/interactions/history" variant="outlined" fullWidth>
                                    Review history
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Stack>
    );
}
