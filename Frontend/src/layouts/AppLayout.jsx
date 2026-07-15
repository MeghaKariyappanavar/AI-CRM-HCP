import { useMemo, useState } from "react";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";

import {
    AppBar,
    Box,
    Button,
    Container,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import EventNoteIcon from "@mui/icons-material/EventNote";
import HistoryIcon from "@mui/icons-material/History";
import MenuIcon from "@mui/icons-material/Menu";

const navigation = [
    { label: "Dashboard", to: "/", icon: <DashboardIcon /> },
    { label: "HCP List", to: "/hcps", icon: <PeopleIcon /> },
    { label: "Add HCP", to: "/hcp/create", icon: <PersonAddAlt1Icon /> },
    { label: "Log Interaction", to: "/interaction", icon: <EventNoteIcon /> },
    { label: "History", to: "/interactions/history", icon: <HistoryIcon /> }
];

const drawerWidth = 280;

export default function AppLayout() {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const location = useLocation();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const currentTitle = useMemo(() => {
        const item = navigation.find((entry) => entry.to === location.pathname);
        return item?.label ?? "AI CRM HCP";
    }, [location.pathname]);

    const drawerContent = (
        <Box sx={{ width: drawerWidth, p: 2 }}>
            <Typography variant="h6" fontWeight={800} sx={{ px: 1, py: 1 }}>
                AI CRM HCP
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ px: 1, mb: 2 }}>
                Healthcare field activity, clean and simple.
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <List>
                {navigation.map((item) => (
                    <ListItemButton
                        key={item.to}
                        component={RouterLink}
                        to={item.to}
                        selected={
                            item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to)
                        }
                        onClick={() => setDrawerOpen(false)}
                        sx={{ borderRadius: 2, mb: 0.5 }}
                    >
                        <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    bgcolor: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(10px)"
                }}
            >
                <Toolbar sx={{ gap: 2 }}>
                    {!isDesktop && (
                        <IconButton edge="start" onClick={() => setDrawerOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                            Assignment workspace
                        </Typography>
                        <Typography variant="h6" fontWeight={800}>
                            {currentTitle}
                        </Typography>
                    </Box>
                    <Button component={RouterLink} to="/hcp/create" variant="contained">
                        New HCP
                    </Button>
                </Toolbar>
            </AppBar>

            <Box sx={{ display: "flex" }}>
                {isDesktop ? (
                    <Box sx={{ width: drawerWidth, flexShrink: 0 }}>
                        <Drawer
                            variant="permanent"
                            open
                            PaperProps={{
                                sx: {
                                    width: drawerWidth,
                                    boxSizing: "border-box",
                                    borderRight: "1px solid",
                                    borderColor: "divider",
                                    position: "relative"
                                }
                            }}
                        >
                            {drawerContent}
                        </Drawer>
                    </Box>
                ) : (
                    <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                        {drawerContent}
                    </Drawer>
                )}

                <Box component="main" sx={{ flex: 1, py: 3 }}>
                    <Container maxWidth="xl">
                        <Outlet />
                    </Container>
                </Box>
            </Box>
        </Box>
    );
}
