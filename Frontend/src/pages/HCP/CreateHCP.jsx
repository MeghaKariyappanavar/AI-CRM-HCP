import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Paper,
    TextField,
    Typography
} from "@mui/material";

import { createHCP } from "../../services/hcpService";

export default function CreateHCP() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        doctor_name: "",
        specialization: "",
        hospital: "",
        city: "",
        phone: "",
        email: ""
    });

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSave = async () => {

        if (!form.doctor_name.trim()) {
            alert("Doctor Name is required.");
            return;
        }

        if (!form.specialization.trim()) {
            alert("Specialization is required.");
            return;
        }

        if (!form.hospital.trim()) {
            alert("Hospital is required.");
            return;
        }

        try {

            setLoading(true);

            const response = await createHCP(form);

            console.log("Created HCP:", response);

            alert("Healthcare Professional created successfully.");

            navigate("/hcps", {
                state: {
                    refresh: true
                }
            });

        } catch (error) {

            console.error("Create HCP Error:", error);

            if (error.response) {
                console.error(error.response.data);
                alert(JSON.stringify(error.response.data));
            } else {
                alert("Unable to connect to the server.");
            }

        } finally {

            setLoading(false);

        }
    };

    return (

        <Container
            maxWidth="md"
            sx={{ mt: 4, mb: 4 }}
        >

            <Paper
                elevation={3}
                sx={{ p: 4 }}
            >

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                >
                    Create Healthcare Professional
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    Add a new Healthcare Professional to the CRM.
                </Typography>

                <Grid container spacing={3}>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            required
                            label="Doctor Name"
                            name="doctor_name"
                            value={form.doctor_name}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            required
                            label="Specialization"
                            name="specialization"
                            value={form.specialization}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            label="Hospital"
                            name="hospital"
                            value={form.hospital}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="City"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </Grid>

                </Grid>

                <Box
                    sx={{
                        mt: 4,
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2
                    }}
                >

                    <Button
                        variant="outlined"
                        onClick={() => navigate("/hcps")}
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <CircularProgress
                                    size={20}
                                    color="inherit"
                                    sx={{ mr: 1 }}
                                />
                                Saving...
                            </>
                        ) : (
                            "Save"
                        )}
                    </Button>

                </Box>

            </Paper>

        </Container>
    );
}