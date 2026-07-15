import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import { createHCP } from "../../services/hcpService";

const initialForm = {
    doctor_name: "",
    specialization: "",
    hospital: "",
    city: "",
    phone: "",
    email: ""
};

export default function CreateHCP() {
    const navigate = useNavigate();
    const [form, setForm] = useState(initialForm);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSave = async () => {
        if (!form.doctor_name.trim()) {
            setError("Doctor name is required.");
            return;
        }

        setError("");
        setSaving(true);

        try {
            await createHCP(form);
            navigate("/hcps");
        } catch (err) {
            setError("Unable to save the HCP record.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <Card>
            <CardContent>
                <Stack spacing={3}>
                    <Box>
                        <Typography variant="h4" fontWeight={800} gutterBottom>
                            Add healthcare professional
                        </Typography>
                        <Typography color="text.secondary">
                            Capture the core profile details for the field team.
                        </Typography>
                    </Box>

                    {error && <Alert severity="error">{error}</Alert>}

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth required label="Doctor name" name="doctor_name" value={form.doctor_name} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Specialization" name="specialization" value={form.specialization} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Hospital" name="hospital" value={form.hospital} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="City" name="city" value={form.city} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Phone" name="phone" value={form.phone} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Email" type="email" name="email" value={form.email} onChange={handleChange} />
                        </Grid>
                    </Grid>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                        <Button variant="outlined" onClick={() => navigate("/hcps")} disabled={saving}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleSave} disabled={saving}>
                            {saving ? <CircularProgress size={20} color="inherit" /> : "Save HCP"}
                        </Button>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}
