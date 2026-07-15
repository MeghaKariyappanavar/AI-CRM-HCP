import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import {
    Alert,
    Box,
    Card,
    CardContent,
    Button,
    Divider,
    Grid,
    MenuItem,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import AIAssistant from "./AIAssistant";
import { saveInteraction } from "../../services/interactionService";
import { getHCPs } from "../../services/hcpService";

const defaultForm = {
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

export default function LogInteraction() {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const [hcps, setHcps] = useState([]);
    const [form, setForm] = useState(defaultForm);

    useEffect(() => {
        const loadHcps = async () => {
            try {
                const data = await getHCPs();
                setHcps(data);
            } catch (err) {
                setError("Unable to load HCP options.");
            }
        };

        loadHcps();
    }, []);

    useEffect(() => {
        const doctor = location.state?.doctor;
        if (doctor) {
            setForm((current) => ({
                ...current,
                hcp_id: doctor.id,
                doctor_name: doctor.doctor_name
            }));
        }
    }, [location.state]);

    const selectedHcp = useMemo(
        () => hcps.find((hcp) => String(hcp.id) === String(form.hcp_id)),
        [hcps, form.hcp_id]
    );

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleExtract = (data, conversationText) => {
        setForm((current) => ({
            ...current,
            doctor_name: data.doctor_name || current.doctor_name,
            products_discussed: Array.isArray(data.products_discussed)
                ? data.products_discussed.join(", ")
                : data.products_discussed || current.products_discussed,
            summary: data.summary || current.summary,
            next_followup: data.next_followup || current.next_followup,
            sentiment: data.sentiment || current.sentiment,
            discussion: conversationText
        }));
    };

    const handleSave = async () => {
        if (!form.hcp_id) {
            setError("Please select an HCP first.");
            return;
        }

        setError("");
        setSaving(true);

        try {
            await saveInteraction({
                hcp_id: Number(form.hcp_id),
                type: form.type,
                doctor_name: form.doctor_name,
                visit_date: form.visit_date || null,
                discussion: form.discussion,
                products_discussed: form.products_discussed,
                sample_given: form.sample_given,
                followup_date: form.followup_date || null,
                remarks: form.remarks,
                conversation: form.discussion,
                summary: form.summary,
                next_followup: form.next_followup,
                sentiment: form.sentiment
            });

            navigate("/interactions/history");
        } catch (err) {
            setError("Unable to save the interaction.");
        } finally {
            setSaving(false);
        }
    };

    const handleSaveAndAddAnother = async () => {
        if (!form.hcp_id) {
            setError("Please select an HCP first.");
            return;
        }

        setError("");
        setSaving(true);

        try {
            await saveInteraction({
                hcp_id: Number(form.hcp_id),
                type: form.type,
                doctor_name: form.doctor_name,
                visit_date: form.visit_date || null,
                discussion: form.discussion,
                products_discussed: form.products_discussed,
                sample_given: form.sample_given,
                followup_date: form.followup_date || null,
                remarks: form.remarks,
                conversation: form.discussion,
                summary: form.summary,
                next_followup: form.next_followup,
                sentiment: form.sentiment
            });

            setForm({
                ...defaultForm,
                hcp_id: form.hcp_id,
                doctor_name: form.doctor_name
            });
        } catch (err) {
            setError("Unable to save the interaction.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <Stack spacing={3}>
            <Box>
                <Typography variant="h4" fontWeight={800} gutterBottom>
                    Log interaction
                </Typography>
                <Typography color="text.secondary">
                    Use AI extraction, then fine-tune the visit details before saving.
                </Typography>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <Box
                sx={{
                    display: "grid",
                    gap: 3,
                    alignItems: "start",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "minmax(360px, 430px) minmax(0, 1fr)"
                    }
                }}
            >
                <Box sx={{ minWidth: 0 }}>
                    <AIAssistant onExtract={handleExtract} />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                    <Card sx={{ display: "flex", minWidth: 0 }}>
                        <CardContent sx={{ flex: 1 }}>
                            <Stack spacing={3} sx={{ height: "100%" }}>
                                <Box>
                                    <Typography variant="h6" fontWeight={800}>
                                        Interaction details
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Save the structured visit record here.
                                    </Typography>
                                </Box>

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

                                {selectedHcp && (
                                    <Alert severity="info">
                                        {selectedHcp.specialization || "Specialization not set"} -{" "}
                                        {selectedHcp.hospital || "Hospital not set"}
                                    </Alert>
                                )}

                                <Grid container spacing={2}>
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
                                            label="Visit date"
                                            name="visit_date"
                                            value={form.visit_date}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: true }}
                                        />
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

                                <Divider />

                                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="space-between">
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate("/interactions/history")}
                                        disabled={saving}
                                    >
                                        View history
                                    </Button>
                                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                        <Button variant="outlined" onClick={() => setForm(defaultForm)} disabled={saving}>
                                            Reset
                                        </Button>
                                        <Button variant="outlined" onClick={handleSaveAndAddAnother} disabled={saving}>
                                            {saving ? "Saving..." : "Save & Add Another"}
                                        </Button>
                                        <Button variant="contained" onClick={handleSave} disabled={saving}>
                                            {saving ? "Saving..." : "Save Interaction"}
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Stack>
    );
}
