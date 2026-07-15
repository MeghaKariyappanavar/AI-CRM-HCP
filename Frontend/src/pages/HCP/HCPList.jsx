import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Grid,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AddIcon from "@mui/icons-material/Add";

import { deleteHCP, getHCPs } from "../../services/hcpService";

export default function HCPList() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        loadDoctors();
    }, []);

    const loadDoctors = async () => {
        try {
            setError("");
            setLoading(true);
            const data = await getHCPs();
            setDoctors(data);
        } catch (err) {
            setError("Unable to load HCP records.");
        } finally {
            setLoading(false);
        }
    };

    const filteredDoctors = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return doctors;
        return doctors.filter((doctor) =>
            [doctor.doctor_name, doctor.specialization, doctor.hospital, doctor.city]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(query))
        );
    }, [doctors, search]);

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Delete this HCP record?");
        if (!confirmed) return;

        try {
            await deleteHCP(id);
            setDoctors((current) => current.filter((doctor) => doctor.id !== id));
        } catch (err) {
            setError("Unable to delete the selected HCP.");
        }
    };

    return (
        <Stack spacing={3}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", md: "center" },
                    gap: 2,
                    flexWrap: "wrap"
                }}
            >
                <Box>
                    <Typography variant="h4" fontWeight={800} gutterBottom>
                        Healthcare professionals
                    </Typography>
                    <Typography color="text.secondary">
                        Search, update, and open interactions from a single list.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate("/hcp/create")}
                >
                    Add HCP
                </Button>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <TextField
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, specialization, hospital, or city"
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />

            {loading ? (
                <Box sx={{ display: "grid", placeItems: "center", py: 8 }}>
                    <CircularProgress />
                </Box>
            ) : filteredDoctors.length === 0 ? (
                <Card>
                    <CardContent sx={{ textAlign: "center", py: 6 }}>
                        <Typography variant="h6" fontWeight={700} gutterBottom>
                            No HCPs found
                        </Typography>
                        <Typography color="text.secondary" sx={{ mb: 2 }}>
                            Try a different search or add a new healthcare professional.
                        </Typography>
                        <Button variant="contained" onClick={() => navigate("/hcp/create")}>
                            Create HCP
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <Grid container spacing={3}>
                    {filteredDoctors.map((doctor) => (
                        <Grid item xs={12} md={6} lg={4} key={doctor.id}>
                            <Card sx={{ height: "100%" }}>
                                <CardContent>
                                    <Stack spacing={2}>
                                        <Box>
                                            <Typography variant="h6" fontWeight={800}>
                                                {doctor.doctor_name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {doctor.specialization || "Specialization not added"}
                                            </Typography>
                                        </Box>

                                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                            {doctor.hospital && <Chip label={doctor.hospital} />}
                                            {doctor.city && <Chip label={doctor.city} variant="outlined" />}
                                        </Stack>

                                        <Box>
                                            <Typography variant="body2">
                                                <strong>Phone:</strong> {doctor.phone || "-"}
                                            </Typography>
                                            <Typography variant="body2">
                                                <strong>Email:</strong> {doctor.email || "-"}
                                            </Typography>
                                        </Box>

                                        <Stack direction="row" spacing={1} justifyContent="space-between">
                                            <Button
                                                size="small"
                                                startIcon={<EditIcon />}
                                                onClick={() => navigate(`/hcp/edit/${doctor.id}`)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="small"
                                                startIcon={<EventNoteIcon />}
                                                onClick={() => navigate("/interaction", { state: { doctor } })}
                                            >
                                                Log
                                            </Button>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(doctor.id)}
                                                aria-label="Delete HCP"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Stack>
    );
}
