import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    MenuItem,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import { getHCPs } from "../../services/hcpService";
import { getInteraction, updateInteraction } from "../../services/interactionService";

const emptyForm = {
    hcp_id: "",
    doctor_name: "",
    type: "Face to Face",
    visit_date: "",
    discussion: "",
    products_discussed: "",
    sample_given: "No",
    followup_date: "",
    remarks: "",
    summary: "",
    next_followup: "",
    sentiment: "Neutral"
};

export default function EditInteraction() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [hcps, setHcps] = useState([]);
    const [form, setForm] = useState(emptyForm);

    useEffect(() => {
        const load = async () => {
            try {
                const [interaction, hcpList] = await Promise.all([
                    getInteraction(id),
                    getHCPs()
                ]);

                setHcps(hcpList);
                setForm({
                    hcp_id: interaction.hcp_id ?? "",
                    doctor_name: interaction.doctor_name ?? "",
                    type: interaction.mode ?? "Face to Face",
                    visit_date: "",
                    discussion: interaction.discussion ?? "",
                    products_discussed: interaction.products_discussed ?? "",
                    sample_given: interaction.sample_given ?? "No",
                    followup_date: interaction.followup_date ?? "",
                    remarks: interaction.notes ?? "",
                    summary: interaction.summary ?? "",
                    next_followup: interaction.next_action ?? "",
                    sentiment: interaction.sentiment ?? "Neutral"
                });
            } catch (err) {
                setError("Unable to load the interaction.");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [id]);

    const selectedHcp = useMemo(
        () => hcps.find((hcp) => String(hcp.id) === String(form.hcp_id)),
        [hcps, form.hcp_id]
    );

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSave = async () => {
        if (!form.hcp_id) {
            setError("Please select an HCP.");
            return;
        }

        setError("");
        setSaving(true);

        try {
            await updateInteraction(id, {
                hcp_id: Number(form.hcp_id),
                type: form.type,
                doctor_name: form.doctor_name,
                visit_date: form.visit_date || null,
                discussion: form.discussion,
                products_discussed: form.products_discussed,
                sample_given: form.sample_given,
                followup_date: form.followup_date || null,
                remarks: form.remarks,
                summary: form.summary,
                next_followup: form.next_followup,
                sentiment: form.sentiment
            });

            navigate("/interactions/history");
        } catch (err) {
            setError("Unable to update the interaction.");
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
                            Edit interaction
                        </Typography>
                        <Typography color="text.secondary">
                            Update the saved visit and follow-up details.
                        </Typography>
                    </Box>

                    {error && <Alert severity="error">{error}</Alert>}

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                fullWidth
                                label="Select HCP"
                                name="hcp_id"
                                value={form.hcp_id}
                                onChange={handleChange}
                            >
                                {hcps.map((hcp) => (
                                    <MenuItem key={hcp.id} value={hcp.id}>
                                        {hcp.doctor_name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Doctor name"
                                name="doctor_name"
                                value={form.doctor_name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                fullWidth
                                label="Interaction type"
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                            >
                                {["Face to Face", "Virtual", "Phone Call", "Email"].map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Follow-up date"
                                name="followup_date"
                                value={form.followup_date}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                minRows={3}
                                label="Discussion"
                                name="discussion"
                                value={form.discussion}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Products discussed"
                                name="products_discussed"
                                value={form.products_discussed}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                fullWidth
                                label="Sample given"
                                name="sample_given"
                                value={form.sample_given}
                                onChange={handleChange}
                            >
                                {["Yes", "No"].map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                fullWidth
                                label="Sentiment"
                                name="sentiment"
                                value={form.sentiment}
                                onChange={handleChange}
                            >
                                {["Positive", "Neutral", "Negative"].map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                minRows={3}
                                label="Remarks"
                                name="remarks"
                                value={form.remarks}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    {selectedHcp && (
                        <Alert severity="info">
                            Linked to {selectedHcp.doctor_name}
                        </Alert>
                    )}

                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                        <Button variant="outlined" onClick={() => navigate("/interactions/history")} disabled={saving}>
                            Cancel
                        </Button>
                        <Button variant="outlined" onClick={() => setForm((current) => ({ ...current, remarks: "" }))} disabled={saving}>
                            Clear remarks
                        </Button>
                        <Button variant="contained" onClick={handleSave} disabled={saving}>
                            {saving ? <CircularProgress size={20} color="inherit" /> : "Update interaction"}
                        </Button>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}
