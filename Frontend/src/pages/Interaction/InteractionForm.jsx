import {
    Box,
    Button,
    Divider,
    Grid,
    MenuItem,
    Paper,
    TextField,
    Typography
} from "@mui/material";

export default function InteractionForm({

    doctor,

    doctorName,
    setDoctorName,

    visitDate,
    setVisitDate,

    discussion,
    setDiscussion,

    products,
    setProducts,

    sampleGiven,
    setSampleGiven,

    followupDate,
    setFollowupDate,

    remarks,
    setRemarks,

    saving,

    handleSave

}) {

    return (

        <Paper
            elevation={3}
            sx={{
                p: 4,
                borderRadius: 3,
                height: "100%"
            }}
        >

            <Typography
                variant="h5"
                fontWeight="bold"
            >
                HCP Interaction Details
            </Typography>

            <Typography
                color="text.secondary"
                sx={{ mb: 3 }}
            >
                Record the discussion with the Healthcare Professional.
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {doctor && (

                <Paper
                    variant="outlined"
                    sx={{
                        p: 2,
                        mb: 3,
                        bgcolor: "#fafafa"
                    }}
                >

                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        gutterBottom
                    >
                        Selected Healthcare Professional
                    </Typography>

                    <Grid container spacing={2}>

                        <Grid item xs={12} md={6}>
                            <Typography>
                                <strong>Name :</strong> {doctor.doctor_name}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography>
                                <strong>Specialization :</strong> {doctor.specialization}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography>
                                <strong>Hospital :</strong> {doctor.hospital}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography>
                                <strong>City :</strong> {doctor.city}
                            </Typography>
                        </Grid>

                    </Grid>

                </Paper>

            )}

            <Grid container spacing={3}>

                <Grid item xs={12} md={6}>

                    <TextField
                        fullWidth
                        label="HCP Name"
                        value={doctorName}
                        onChange={(e) =>
                            setDoctorName(e.target.value)
                        }
                    />

                </Grid>

                <Grid item xs={12} md={6}>

                    <TextField
                        fullWidth
                        select
                        defaultValue="Face to Face"
                        label="Interaction Type"
                    >

                        <MenuItem value="Face to Face">
                            Face to Face
                        </MenuItem>

                        <MenuItem value="Virtual">
                            Virtual
                        </MenuItem>

                        <MenuItem value="Phone Call">
                            Phone Call
                        </MenuItem>

                        <MenuItem value="Email">
                            Email
                        </MenuItem>

                    </TextField>

                </Grid>

                <Grid item xs={12} md={6}>

                    <TextField
                        fullWidth
                        type="date"
                        label="Visit Date"
                        value={visitDate}
                        onChange={(e) =>
                            setVisitDate(e.target.value)
                        }
                        InputLabelProps={{
                            shrink: true
                        }}
                    />

                </Grid>

                <Grid item xs={12} md={6}>

                    <TextField
                        fullWidth
                        type="time"
                        label="Visit Time"
                        InputLabelProps={{
                            shrink: true
                        }}
                    />

                </Grid>

                <Grid item xs={12}>

                    <TextField
                        fullWidth
                        label="Attendees"
                        placeholder="Doctor, Medical Representative, Manager..."
                    />

                </Grid>

                <Grid item xs={12}>

                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Topics Discussed"
                        value={discussion}
                        onChange={(e) =>
                            setDiscussion(e.target.value)
                        }
                    />

                </Grid>

                <Grid item xs={12} md={6}>

                    <TextField
                        fullWidth
                        label="Materials Shared"
                        placeholder="Brochures, Clinical Papers..."
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
                        select
                        label="Samples Distributed"
                        value={sampleGiven}
                        onChange={(e) =>
                            setSampleGiven(e.target.value)
                        }
                    >

                        <MenuItem value="Yes">
                            Yes
                        </MenuItem>

                        <MenuItem value="No">
                            No
                        </MenuItem>

                    </TextField>

                </Grid>

                <Grid item xs={12} md={6}>

                    <TextField
                        fullWidth
                        type="date"
                        label="Follow-up Date"
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
                        rows={4}
                        label="Outcome / Remarks"
                        value={remarks}
                        onChange={(e) =>
                            setRemarks(e.target.value)
                        }
                    />

                </Grid>

            </Grid>

            <Divider sx={{ my: 4 }} />

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end"
                }}
            >

                <Button
                    variant="contained"
                    size="large"
                    onClick={handleSave}
                    disabled={saving}
                >

                    {saving
                        ? "Saving..."
                        : "Save Interaction"}

                </Button>

            </Box>

        </Paper>

    );

}