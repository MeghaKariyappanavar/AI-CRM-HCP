import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

import { getHCP, updateHCP } from "../../services/hcpService";

const emptyForm = {
    doctor_name: "",
    specialization: "",
    hospital: "",
    city: "",
    phone: "",
    email: ""
};

export default function EditHCP() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState(emptyForm);

    useEffect(() => {
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
            } catch (err) {
                setError("Unable to load the HCP record.");
            } finally {
                setLoading(false);
            }
        };

        loadHCP();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleUpdate = async () => {
        if (!form.doctor_name.trim()) {
            setError("Doctor name is required.");
            return;
        }

        setError("");
        setSaving(true);

        try {
            await updateHCP(id, form);
            navigate("/hcps");
        } catch (err) {
            setError("Unable to update the HCP record.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "grid", placeItems: "center", py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Card>
            <CardContent>
                <Stack spacing={3}>
                    <Box>
                        <Typography variant="h4" fontWeight={800} gutterBottom>
                            Edit healthcare professional
                        </Typography>
                        <Typography color="text.secondary">
                            Update the profile details and keep the list current.
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
                        <Button variant="contained" onClick={handleUpdate} disabled={saving}>
                            {saving ? <CircularProgress size={20} color="inherit" /> : "Update HCP"}
                        </Button>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}
