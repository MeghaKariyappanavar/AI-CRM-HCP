import { useState } from "react";

import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    Paper,
    TextField,
    Typography
} from "@mui/material";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import { generateAISummary, saveAISummary } from "../../services/chatService";

export default function AIAssistant({ onExtract }) {
    const [conversation, setConversation] = useState("");
    const [messages, setMessages] = useState([]);
    const [generating, setGenerating] = useState(false);
    const [savedStatus, setSavedStatus] = useState("");

    const parseProducts = (value) => {
        if (Array.isArray(value)) return value;
        if (typeof value === "string") {
            return value.split(",").map((item) => item.trim()).filter(Boolean);
        }
        return [];
    };

    const handleGenerate = async () => {
        if (!conversation.trim() || generating) return;

        const userText = conversation.trim();
        setMessages((current) => [...current, { type: "user", text: userText }]);
        setGenerating(true);

        try {
            const response = await generateAISummary(userText);
            const data = response?.data ?? response;

            const aiMessage = {
                type: "ai",
                text: data.summary || "Interaction details extracted.",
                sentiment: data.sentiment || "Neutral",
                products: parseProducts(data.products_discussed),
                followup: data.next_followup || "-"
            };

            setMessages((current) => [...current, aiMessage]);
            onExtract?.(data, userText);
            setSavedStatus("");
        } catch (error) {
            setMessages((current) => [
                ...current,
                { type: "ai", text: "Sorry, the AI summary could not be generated." }
            ]);
        } finally {
            setGenerating(false);
        }
    };

    const handleGenerateAndSave = async () => {
        if (!conversation.trim() || generating) return;

        try {
            await handleGenerate();
            const response = await saveAISummary(conversation.trim());
            setSavedStatus(
                response?.success
                    ? "Conversation saved to database."
                    : "Conversation generated."
            );
        } catch (error) {
            setSavedStatus("Conversation preview generated, but auto-save failed.");
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 3,
                display: "flex",
                flexDirection: "column"
            }}
        >
            <Typography variant="h5" fontWeight={800}>
                AI assistant
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Paste a conversation and let the model extract the visit details.
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Box
                sx={{
                    minHeight: 160,
                    maxHeight: 260,
                    overflowY: "auto",
                    pr: 1,
                    mb: 2
                }}
            >
                {messages.length === 0 ? (
                    <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>
                        No AI conversation yet.
                    </Typography>
                ) : (
                    messages.map((msg, index) => (
                        <Paper
                            key={`${msg.type}-${index}`}
                            elevation={1}
                            sx={{
                                p: 2,
                                mb: 2,
                                bgcolor: msg.type === "user" ? "primary.main" : "grey.50",
                                color: msg.type === "user" ? "common.white" : "text.primary"
                            }}
                        >
                            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                                {msg.type === "user" ? "You" : "AI Assistant"}
                            </Typography>
                            <Typography variant="body2">{msg.text}</Typography>
                            {msg.type === "ai" && (
                                <>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Typography variant="subtitle2" fontWeight={700}>
                                        Products
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                        {msg.products?.length ? msg.products.join(", ") : "-"}
                                    </Typography>
                                    <Typography variant="subtitle2" fontWeight={700}>
                                        Sentiment
                                    </Typography>
                                    <Chip
                                        sx={{ mt: 1, mb: 1.5 }}
                                        label={msg.sentiment}
                                        color={
                                            msg.sentiment === "Positive"
                                                ? "success"
                                                : msg.sentiment === "Negative"
                                                ? "error"
                                                : "warning"
                                        }
                                    />
                                    <Typography variant="subtitle2" fontWeight={700}>
                                        Follow-up
                                    </Typography>
                                    <Typography variant="body2">{msg.followup}</Typography>
                                </>
                            )}
                        </Paper>
                    ))
                )}
            </Box>

            <Divider sx={{ mb: 2 }} />

            <TextField
                fullWidth
                multiline
                rows={5}
                label="Conversation"
                placeholder="Example: Met Dr Rahul, discussed CardioPlus, positive interest, follow-up next week."
                value={conversation}
                onChange={(e) => setConversation(e.target.value)}
            />

            <Button
                variant="contained"
                size="large"
                sx={{ mt: 3 }}
                startIcon={generating ? <CircularProgress size={18} color="inherit" /> : <AutoAwesomeRoundedIcon />}
                onClick={handleGenerateAndSave}
                disabled={generating}
            >
                {generating ? "Generating..." : "Generate AI Summary"}
            </Button>

            {savedStatus && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {savedStatus}
                </Typography>
            )}
        </Paper>
    );
}
