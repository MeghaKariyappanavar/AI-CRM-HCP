import {
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    TextField
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const doctors = [
    {
        id: 1,
        name: "Dr Rahul",
        specialization: "Cardiologist"
    },
    {
        id: 2,
        name: "Dr Meena",
        specialization: "Neurologist"
    },
    {
        id: 3,
        name: "Dr Arjun",
        specialization: "Orthopedic"
    }
];

export default function HCPList() {

    const navigate = useNavigate();

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
                label="Search Doctor"
                fullWidth
                sx={{ mb: 4 }}
            />

            <Grid container spacing={3}>

                {doctors.map((doctor) => (

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

                                    <Typography
                                        variant="h6"
                                    >
                                        {doctor.name}
                                    </Typography>

                                    <Typography
                                        color="text.secondary"
                                    >
                                        {doctor.specialization}
                                    </Typography>

                                </div>

                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        navigate("/interaction")
                                    }
                                >
                                    Log Interaction
                                </Button>

                            </CardContent>

                        </Card>

                    </Grid>

                ))}

            </Grid>

        </Container>

    );
}