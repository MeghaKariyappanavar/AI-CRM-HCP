import { useState } from "react";

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

                {
                    tab === 0 && (

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

                    )
                }

                {
                    tab === 1 && (

                        <Box sx={{ mt: 4 }}>

                            <TextField
                                fullWidth
                                multiline
                                rows={8}
                                label="Type your conversation with the doctor..."
                            />

                            <Button
                                sx={{ mt: 3 }}
                                variant="contained"
                            >
                                Generate AI Summary
                            </Button>

                        </Box>

                    )
                }

            </Paper>

        </Container>

    );

}