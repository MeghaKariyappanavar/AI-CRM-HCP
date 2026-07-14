import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
    Container,
    Typography,
    Tabs,
    Tab,
    Box,
    TextField,
    Button,
    Grid,
    Paper,
    Divider,
    Alert
} from "@mui/material";

import { generateAISummary } from "../../services/chatService";
import { saveInteraction } from "../../services/interactionService";

export default function LogInteraction() {

    const location = useLocation();
    const navigate = useNavigate();
    const doctor = location.state?.doctor;

    const [tab, setTab] = useState(0);

    // Structured Form
    const [doctorName, setDoctorName] = useState(doctor?.doctor_name || "");
    const [visitDate, setVisitDate] = useState(new Date().toISOString().split("T")[0]);
    const [discussion, setDiscussion] = useState("");
    const [products, setProducts] = useState("");
    const [sampleGiven, setSampleGiven] = useState("");
    const [followupDate, setFollowupDate] = useState("");
    const [remarks, setRemarks] = useState("");

    // AI Chat
    const [conversation, setConversation] = useState("");
    const [aiResult, setAiResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleGenerateSummary = async () => {
        if (!conversation.trim()) {
            alert("Please enter a conversation.");
            return;
        }

        try {
            setLoading(true);
            const result = await generateAISummary(conversation);
            setAiResult(result);
        } catch (error) {
            console.error(error);
            alert("Failed to generate AI summary.");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        // hcp_id comes only from the doctor passed via navigation state.
        // If it's missing, the backend will reject the request with a 422
        // ("hcp_id field required"), so we catch it here first with a
        // clear, actionable message instead of a raw JSON error dialog.
        if (!doctor?.id) {
            alert(
                "No doctor is linked to this interaction. Please open this page from a doctor's profile page so the doctor is selected automatically."
            );
            return;
        }

        if (tab === 0 && !doctorName.trim()) {
            alert("Please enter the doctor's name.");
            return;
        }

        if (tab === 1 && !conversation.trim()) {
            alert("Please enter a conversation.");
            return;
        }

        if (tab === 1 && !aiResult) {
            alert("Please generate the AI summary before saving.");
            return;
        }

        const payload =
            tab === 0
                ? {
                    type: "structured",

                    hcp_id: doctor.id,

                    doctor_name: doctorName,

                    visit_date: visitDate,

                    discussion,

                    products_discussed: products,

                    sample_given: sampleGiven,

                    followup_date: followupDate || null,

                    remarks
                }
                : {
                    type: "ai_chat",

                    hcp_id: doctor.id,

                    // Fall back to the known doctor's name if the AI didn't
                    // manage to extract one — the backend column is
                    // NOT NULL, so an empty value here would also 422/500.
                    doctor_name: aiResult?.doctor_name || doctor?.doctor_name || "Unknown",

                    conversation,

                    products_discussed: aiResult?.products_discussed,

                    summary: aiResult?.summary,

                    next_followup: aiResult?.next_followup,

                    sentiment: aiResult?.sentiment
                };

        try {
            setSaving(true);
            const response = await saveInteraction(payload);

            console.log(response);

            alert("Interaction saved successfully.");

            if (tab === 0) {
                setDiscussion("");
                setProducts("");
                setSampleGiven("");
                setFollowupDate("");
                setRemarks("");
            } else {
                setConversation("");
                setAiResult(null);
            }
        } catch (err) {
            console.error(err);

            // Surface the backend's validation detail instead of a blank
            // "[object Object]" style alert, and guard against err.response
            // being undefined (e.g. network errors).
            const detail = err?.response?.data?.detail;
            const message = Array.isArray(detail)
                ? detail.map((d) => `${d.loc?.join(".")}: ${d.msg}`).join("\n")
                : detail || err.message || "Failed to save interaction.";

            alert(message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Log Interaction
            </Typography>

            {!doctor && (
                <Alert severity="warning" sx={{ mb: 3 }}>
                    No doctor selected. Interactions must be linked to a doctor —
                    please go back and open this page from a doctor's profile.
                    <Button size="small" sx={{ ml: 2 }} onClick={() => navigate(-1)}>
                        Go Back
                    </Button>
                </Alert>
            )}

            <Paper sx={{ p: 3 }}>
                <Tabs value={tab} onChange={(e, value) => setTab(value)}>
                    <Tab label="Structured Form" />
                    <Tab label="AI Chat" />
                </Tabs>

                {/* Structured Form */}
                {tab === 0 && (
                    <Box sx={{ mt: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Doctor Name"
                                    value={doctorName}
                                    onChange={(e) => setDoctorName(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Visit Date"
                                    type="date"
                                    value={visitDate}
                                    onChange={(e) => setVisitDate(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>

                            {doctor && (
                                <Grid item xs={12}>
                                    <Paper variant="outlined" sx={{ p: 2 }}>
                                        <Typography variant="subtitle1">
                                            Doctor Details
                                        </Typography>
                                        <Divider sx={{ my: 1 }} />
                                        <Typography>
                                            <strong>Hospital:</strong> {doctor.hospital}
                                        </Typography>
                                        <Typography>
                                            <strong>City:</strong> {doctor.city}
                                        </Typography>
                                        <Typography>
                                            <strong>Specialization:</strong>{" "}
                                            {doctor.specialization}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Discussion"
                                    value={discussion}
                                    onChange={(e) => setDiscussion(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Products Discussed"
                                    value={products}
                                    onChange={(e) => setProducts(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Sample Given"
                                    value={sampleGiven}
                                    onChange={(e) => setSampleGiven(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Follow-up Date"
                                    type="date"
                                    value={followupDate}
                                    onChange={(e) => setFollowupDate(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Remarks"
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    onClick={handleSave}
                                    disabled={saving}
                                >
                                    {saving ? "Saving..." : "Save Interaction"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                )}

                {/* AI Chat */}
                {tab === 1 && (
                    <Box sx={{ mt: 4 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={8}
                            label="Type your conversation with the doctor..."
                            value={conversation}
                            onChange={(e) => setConversation(e.target.value)}
                        />

                        <Button
                            variant="contained"
                            sx={{ mt: 3, mr: 2 }}
                            onClick={handleGenerateSummary}
                            disabled={loading}
                        >
                            {loading ? "Generating..." : "Generate AI Summary"}
                        </Button>

                        {aiResult && (
                            <>
                                <Paper sx={{ mt: 4, p: 3 }}>
                                    <Typography variant="h6" gutterBottom>
                                        AI Generated Summary
                                    </Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <Typography>
                                        <strong>Doctor:</strong> {aiResult.doctor_name}
                                    </Typography>
                                    <Typography sx={{ mt: 1 }}>
                                        <strong>Products:</strong>{" "}
                                        {Array.isArray(aiResult.products_discussed)
                                            ? aiResult.products_discussed.join(", ")
                                            : aiResult.products_discussed}
                                    </Typography>
                                    <Typography sx={{ mt: 1 }}>
                                        <strong>Summary:</strong> {aiResult.summary}
                                    </Typography>
                                    <Typography sx={{ mt: 1 }}>
                                        <strong>Follow-up:</strong> {aiResult.next_followup}
                                    </Typography>
                                    <Typography sx={{ mt: 1 }}>
                                        <strong>Sentiment:</strong> {aiResult.sentiment}
                                    </Typography>
                                </Paper>

                                <Button
                                    variant="contained"
                                    color="success"
                                    sx={{ mt: 3 }}
                                    onClick={handleSave}
                                    disabled={saving}
                                >
                                    {saving ? "Saving..." : "Save Interaction"}
                                </Button>
                            </>
                        )}
                    </Box>
                )}
            </Paper>
        </Container>
    );
}
