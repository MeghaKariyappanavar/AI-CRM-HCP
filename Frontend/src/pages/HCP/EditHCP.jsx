import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

import {
    getHCP,
    updateHCP
} from "../../services/hcpService";

export default function EditHCP() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        doctor_name: "",
        specialization: "",
        hospital: "",
        city: "",
        phone: "",
        email: ""
    });

    useEffect(() => {
        loadHCP();
    }, []);

    const loadHCP = async () => {

        try {

            const data = await getHCP(id);

            setForm({
                doctor_name: data.doctor_name ?? "",
                specialization: data.specialization ?? "",
                hospital: data.hospital ?? "",
                city: data.city ?? "",
                phone: data.phone ?? "",
                email: data.email ?? ""
            });

        } catch (error) {

            console.error(error);

            alert("Unable to load Healthcare Professional.");

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

    };

    const handleUpdate = async () => {

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

            setSaving(true);

            await updateHCP(id, form);

            alert("Healthcare Professional updated successfully.");

            navigate("/hcps", {
                state: {
                    refresh: true
                }
            });

        } catch (error) {

            console.error(error);

            if (error.response) {
                alert(JSON.stringify(error.response.data));
            } else {
                alert("Unable to connect to the server.");
            }

        } finally {

            setSaving(false);

        }

    };

    if (loading) {
        return (
            <Container sx={{ mt: 5, textAlign: "center" }}>
                <CircularProgress />
            </Container>
        );
    }

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
                    Edit Healthcare Professional
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    Update Healthcare Professional details.
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
                            type="email"
                            label="Email"
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
                        disabled={saving}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleUpdate}
                        disabled={saving}
                    >
                        {saving ? (
                            <>
                                <CircularProgress
                                    size={20}
                                    color="inherit"
                                    sx={{ mr: 1 }}
                                />
                                Updating...
                            </>
                        ) : (
                            "Update"
                        )}
                    </Button>

                </Box>

            </Paper>

        </Container>

    );

}