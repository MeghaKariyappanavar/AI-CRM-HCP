import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    TextField,
    CircularProgress
} from "@mui/material";

import { getHCPs } from "../../services/hcpService";

export default function HCPList() {

    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDoctors();
    }, []);

    const loadDoctors = async () => {
        try {

            const data = await getHCPs();

            console.log("API Response:", data);

            setDoctors(data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }
    };

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.doctor_name
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <Container sx={{ mt: 5, textAlign: "center" }}>
                <CircularProgress />
            </Container>
        );
    }

    return (

        <Container sx={{ mt: 4 }}>

            <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
            >
                Healthcare Professionals
            </Typography>

            <TextField
                fullWidth
                label="Search Doctor"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 4 }}
            />

            <Grid container spacing={3}>

                {filteredDoctors.length > 0 ? (

                    filteredDoctors.map((doctor) => (

                        <Grid
                            item
                            xs={12}
                            key={doctor.id}
                        >

                            <Card>

                                <CardContent
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >

                                    <div>

                                        <Typography variant="h6">
                                            {doctor.doctor_name}
                                        </Typography>

                                        <Typography color="text.secondary">
                                            {doctor.specialization}
                                        </Typography>

                                        <Typography color="text.secondary">
                                            {doctor.hospital}
                                        </Typography>

                                        <Typography color="text.secondary">
                                            {doctor.city}
                                        </Typography>

                                    </div>

                                    <Button
                                        variant="contained"
                                        onClick={() =>
                                            navigate("/interaction", {
                                                state: { doctor }
                                            })
                                        }
                                    >
                                        Log Interaction
                                    </Button>

                                </CardContent>

                            </Card>

                        </Grid>

                    ))

                ) : (

                    <Grid item xs={12}>

                        <Typography align="center">
                            No Healthcare Professionals Found
                        </Typography>

                    </Grid>

                )}

            </Grid>

        </Container>

    );

}