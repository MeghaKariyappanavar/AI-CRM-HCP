import { useEffect, useMemo, useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    InputAdornment,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

import { getInteractionHistory } from "../../services/interactionService";

export default function InteractionHistory() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [interactions, setInteractions] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const data = await getInteractionHistory();
                setInteractions(data);
            } catch (err) {
                setError("Unable to load interaction history.");
            } finally {
                setLoading(false);
            }
        };

        loadHistory();
    }, []);

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return interactions;
        return interactions.filter((item) =>
            [item.doctor_name, item.summary, item.products_discussed, item.sentiment]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(query))
        );
    }, [interactions, search]);

    return (
        <Stack spacing={3}>
            <Box>
                <Typography variant="h4" fontWeight={800} gutterBottom>
                    Interaction history
                </Typography>
                <Typography color="text.secondary">
                    Review the captured discussions and follow-up outcomes.
                </Typography>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <TextField
                fullWidth
                placeholder="Search doctor, product, sentiment, or summary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />

            <Card>
                <CardContent sx={{ p: 0 }}>
                    {loading ? (
                        <Box sx={{ display: "grid", placeItems: "center", py: 8 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Doctor</TableCell>
                                    <TableCell>Products</TableCell>
                                    <TableCell>Summary</TableCell>
                                    <TableCell>Follow-up</TableCell>
                                    <TableCell>Sentiment</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filtered.map((item) => (
                                    <TableRow key={item.id} hover>
                                        <TableCell>{item.doctor_name}</TableCell>
                                        <TableCell>{item.products_discussed || "-"}</TableCell>
                                        <TableCell sx={{ maxWidth: 380 }}>{item.summary || "-"}</TableCell>
                                        <TableCell>{item.followup_date || "-"}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={item.sentiment || "Neutral"}
                                                color={
                                                    item.sentiment === "Positive"
                                                        ? "success"
                                                        : item.sentiment === "Negative"
                                                        ? "error"
                                                        : "warning"
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                size="small"
                                                startIcon={<EditIcon />}
                                                onClick={() => navigate(`/interactions/edit/${item.id}`)}
                                            >
                                                Edit
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {filtered.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            No interactions found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </Stack>
    );
}
