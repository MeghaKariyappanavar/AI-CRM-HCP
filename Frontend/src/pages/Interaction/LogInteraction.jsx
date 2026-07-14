import { useState } from "react";
import { useLocation } from "react-router-dom";

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
    Divider
} from "@mui/material";

import { generateAISummary } from "../../services/chatService";

export default function LogInteraction() {

    const location = useLocation();
    const doctor = location.state?.doctor;

    const [tab, setTab] = useState(0);

    // Structured Form
    const [doctorName, setDoctorName] = useState(
        doctor?.doctor_name || ""
    );

    const [visitDate, setVisitDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [discussion, setDiscussion] = useState("");

    const [products, setProducts] = useState("");

    const [sampleGiven, setSampleGiven] = useState("");

    const [followupDate, setFollowupDate] = useState("");

    const [remarks, setRemarks] = useState("");

    // AI Chat
    const [conversation, setConversation] = useState("");
    const [aiResult, setAiResult] = useState(null);
    const [loading, setLoading] = useState(false);

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

    return (

        <Container maxWidth="lg" sx={{ mt: 4 }}>

            <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
            >
                Log Interaction
            </Typography>

            <Paper sx={{ p: 3 }}>

                <Tabs
                    value={tab}
                    onChange={(e, value) => setTab(value)}
                >
                    <Tab label="Structured Form" />
                    <Tab label="AI Chat" />
                </Tabs>

                {/* ========================= */}
                {/* Structured Form */}
                {/* ========================= */}

                {tab === 0 && (

                    <Box sx={{ mt: 4 }}>

                        <Grid container spacing={3}>

                            <Grid item xs={12} md={6}>

                                <TextField
                                    fullWidth
                                    label="Doctor Name"
                                    value={doctorName}
                                    onChange={(e) =>
                                        setDoctorName(e.target.value)
                                    }
                                />

                            </Grid>

                            <Grid item xs={12} md={6}>

                                <TextField
                                    fullWidth
                                    label="Visit Date"
                                    type="date"
                                    value={visitDate}
                                    onChange={(e) =>
                                        setVisitDate(e.target.value)
                                    }
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />

                            </Grid>

                            {doctor && (

                                <Grid item xs={12}>

                                    <Paper
                                        variant="outlined"
                                        sx={{ p: 2 }}
                                    >

                                        <Typography variant="subtitle1">
                                            Doctor Details
                                        </Typography>

                                        <Divider sx={{ my: 1 }} />

                                        <Typography>
                                            <strong>Hospital:</strong>{" "}
                                            {doctor.hospital}
                                        </Typography>

                                        <Typography>
                                            <strong>City:</strong>{" "}
                                            {doctor.city}
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
                                    onChange={(e) =>
                                        setDiscussion(e.target.value)
                                    }
                                />

                            </Grid>

                            <Grid item xs={12} md={6}>

                                <TextField
                                    fullWidth
                                    label="Products Discussed"
                                    value={products}
                                    onChange={(e) =>
                                        setProducts(e.target.value)
                                    }
                                />

                            </Grid>

                            <Grid item xs={12} md={6}>

                                <TextField
                                    fullWidth
                                    label="Sample Given"
                                    value={sampleGiven}
                                    onChange={(e) =>
                                        setSampleGiven(e.target.value)
                                    }
                                />

                            </Grid>

                            <Grid item xs={12} md={6}>

                                <TextField
                                    fullWidth
                                    label="Follow-up Date"
                                    type="date"
                                    value={followupDate}
                                    onChange={(e) =>
                                        setFollowupDate(e.target.value)
                                    }
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />

                            </Grid>

                            <Grid item xs={12}>

                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Remarks"
                                    value={remarks}
                                    onChange={(e) =>
                                        setRemarks(e.target.value)
                                    }
                                />

                            </Grid>

                            <Grid item xs={12}>

                                <Button
                                    variant="contained"
                                    size="large"
                                >
                                    Save Interaction
                                </Button>

                            </Grid>

                        </Grid>

                    </Box>

                )}

                {/* ========================= */}
                {/* AI Chat */}
                {/* ========================= */}

                {tab === 1 && (

                    <Box sx={{ mt: 4 }}>

                        <TextField
                            fullWidth
                            multiline
                            rows={8}
                            label="Type your conversation with the doctor..."
                            value={conversation}
                            onChange={(e) =>
                                setConversation(e.target.value)
                            }
                        />

                        <Button
                            variant="contained"
                            sx={{ mt: 3 }}
                            onClick={handleGenerateSummary}
                            disabled={loading}
                        >
                            {loading
                                ? "Generating..."
                                : "Generate AI Summary"}
                        </Button>

                        {aiResult && (

                            <Paper sx={{ mt: 4, p: 3 }}>

                                <Typography variant="h6" gutterBottom>
                                    AI Generated Summary
                                </Typography>

                                <Divider sx={{ mb: 2 }} />

                                <Typography>
                                    <strong>Doctor:</strong>{" "}
                                    {aiResult.doctor_name}
                                </Typography>

                                <Typography sx={{ mt: 1 }}>
                                    <strong>Products:</strong>{" "}
                                    {Array.isArray(aiResult.products_discussed)
                                        ? aiResult.products_discussed.join(", ")
                                        : aiResult.products_discussed}
                                </Typography>

                                <Typography sx={{ mt: 1 }}>
                                    <strong>Summary:</strong>{" "}
                                    {aiResult.summary}
                                </Typography>

                                <Typography sx={{ mt: 1 }}>
                                    <strong>Follow-up:</strong>{" "}
                                    {aiResult.next_followup}
                                </Typography>

                                <Typography sx={{ mt: 1 }}>
                                    <strong>Sentiment:</strong>{" "}
                                    {aiResult.sentiment}
                                </Typography>

                            </Paper>

                        )}

                    </Box>

                )}

            </Paper>

        </Container>

    );

}