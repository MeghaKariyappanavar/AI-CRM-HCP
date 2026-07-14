import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Container,
    Paper,
    Typography,
    Grid,
    TextField,
    Button,
    Box
} from "@mui/material";

export default function CreateHCP() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        doctor_name: "",
        specialization: "",
        hospital: "",
        city: "",
        phone: "",
        email: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>

            <Paper elevation={3} sx={{ p: 4 }}>

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
                            label="Doctor Name"
                            name="doctor_name"
                            value={form.doctor_name}
                            onChange={handleChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Specialization"
                            name="specialization"
                            value={form.specialization}
                            onChange={handleChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Hospital"
                            name="hospital"
                            value={form.hospital}
                            onChange={handleChange}
                            required
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
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                        mt: 4
                    }}
                >

                    <Button
                        variant="outlined"
                        onClick={() => navigate("/hcps")}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                    >
                        Save
                    </Button>

                </Box>

            </Paper>

        </Container>
    );
}