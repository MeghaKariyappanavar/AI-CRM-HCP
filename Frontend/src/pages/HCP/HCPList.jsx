import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Grid,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import {
    getHCPs,
    deleteHCP
} from "../../services/hcpService";

export default function HCPList() {

    const navigate = useNavigate();
    const location = useLocation();

    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDoctors();
    }, [location.state]);

    const loadDoctors = async () => {

        try {

            setLoading(true);

            const data = await getHCPs();

            console.log("HCP Response:", data);

            setDoctors(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this Healthcare Professional?"
        );

        if (!confirmed) return;

        try {

            await deleteHCP(id);

            alert("Healthcare Professional deleted successfully.");

            loadDoctors();

        } catch (error) {

            console.error(error);

            alert("Unable to delete Healthcare Professional.");

        }

    };

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.doctor_name
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <Container sx={{ mt: 6, textAlign: "center" }}>
                <CircularProgress />
            </Container>
        );
    }

    return (

        <Container maxWidth="lg" sx={{ mt: 4 }}>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 4
                }}
            >

                <Typography
                    variant="h4"
                    fontWeight="bold"
                >
                    Healthcare Professionals
                </Typography>

                <Button
                    variant="contained"
                    color="success"
                    onClick={() => navigate("/hcp/create")}
                >
                    + Add HCP
                </Button>

            </Box>

            <TextField
                fullWidth
                label="Search Doctor"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 4 }}
            />

            <Grid container spacing={3}>

                {filteredDoctors.length > 0 ? (

                    filteredDoctors.map((doctor) => (

                        <Grid
                            item
                            xs={12}
                            key={doctor.id}
                        >

                            <Card elevation={3}>

                                <CardContent>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            flexWrap: "wrap",
                                            gap: 2
                                        }}
                                    >

                                        <Box>

                                            <Typography
                                                variant="h6"
                                                fontWeight="bold"
                                            >
                                                {doctor.doctor_name}
                                            </Typography>

                                            <Typography color="text.secondary">
                                                <strong>Specialization:</strong>{" "}
                                                {doctor.specialization}
                                            </Typography>

                                            <Typography color="text.secondary">
                                                <strong>Hospital:</strong>{" "}
                                                {doctor.hospital}
                                            </Typography>

                                            <Typography color="text.secondary">
                                                <strong>City:</strong>{" "}
                                                {doctor.city}
                                            </Typography>

                                        </Box>

                                        <Stack
                                            direction="row"
                                            spacing={1}
                                        >

                                            <Button
                                                variant="outlined"
                                                onClick={() =>
                                                    navigate(
                                                        `/hcp/edit/${doctor.id}`,
                                                        {
                                                            state: { doctor }
                                                        }
                                                    )
                                                }
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() =>
                                                    handleDelete(doctor.id)
                                                }
                                            >
                                                Delete
                                            </Button>

                                            <Button
                                                variant="contained"
                                                onClick={() =>
                                                    navigate(
                                                        "/interaction",
                                                        {
                                                            state: { doctor }
                                                        }
                                                    )
                                                }
                                            >
                                                Log Interaction
                                            </Button>

                                        </Stack>

                                    </Box>

                                </CardContent>

                            </Card>

                        </Grid>

                    ))

                ) : (

                    <Grid item xs={12}>

                        <Typography
                            align="center"
                            variant="h6"
                        >
                            No Healthcare Professionals Found
                        </Typography>

                    </Grid>

                )}

            </Grid>

        </Container>

    );

}