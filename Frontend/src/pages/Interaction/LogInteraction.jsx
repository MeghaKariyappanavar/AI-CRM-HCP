import { useState } from "react";
import { generateAISummary } from "../../services/chatService";

import {
    Container,
    Typography,
    Tabs,
    Tab,
    Box,
    TextField,
    Button,
    Grid,
    Paper
} from "@mui/material";

export default function LogInteraction() {

    const [conversation, setConversation] = useState("");
    const [aiResult, setAiResult] = useState(null);
    const [tab, setTab] = useState(0);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>

            <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
            >
                Log Interaction
            </Typography>

            <Paper sx={{ p: 2 }}>

                <Tabs
                    value={tab}
                    onChange={(e, value) => setTab(value)}
                >
                    <Tab label="Structured Form" />
                    <Tab label="AI Chat" />
                </Tabs>

                {tab === 0 && (
                    <Box sx={{ mt: 4 }}>

                        <Grid container spacing={3}>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Doctor Name"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Discussion"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Products Discussed"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Sample Given"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Remarks"
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

                {tab === 1 && (
                    <Box sx={{ mt: 4 }}>

                        <TextField
                            fullWidth
                            multiline
                            rows={8}
                            value={conversation}
                            onChange={(e) => setConversation(e.target.value)}
                            label="Type your conversation..."
                        />

                        <Button
                            variant="contained"
                            sx={{ mt: 3 }}
                            onClick={async () => {
                                const result = await generateAISummary(conversation);
                                setAiResult(result);
                            }}
                        >
                            Generate AI Summary
                        </Button>

                        {aiResult && (
                            <Paper sx={{ mt: 3, p: 2 }}>
                                <pre>
                                    {JSON.stringify(aiResult, null, 2)}
                                </pre>
                            </Paper>
                        )}

                    </Box>
                )}

            </Paper>

        </Container>
    );
}