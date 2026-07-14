import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import TodayIcon from "@mui/icons-material/Today";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import ChatIcon from "@mui/icons-material/Chat";

const stats = [
    {
        title: "Total Doctors",
        value: 125,
        icon: <PeopleIcon fontSize="large" />
    },
    {
        title: "Today's Visits",
        value: 18,
        icon: <TodayIcon fontSize="large" />
    },
    {
        title: "Pending Follow-ups",
        value: 9,
        icon: <EventRepeatIcon fontSize="large" />
    },
    {
        title: "Interactions",
        value: 54,
        icon: <ChatIcon fontSize="large" />
    }
];

const recentInteractions = [
    {
        doctor: "Dr Rahul",
        status: "Positive",
        date: "Today"
    },
    {
        doctor: "Dr Meena",
        status: "Neutral",
        date: "Yesterday"
    },
    {
        doctor: "Dr Arjun",
        status: "Positive",
        date: "Today"
    }
];

export default function Dashboard() {
    return (
        <Container sx={{ mt: 4 }}>

            <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
            >
                AI CRM HCP Dashboard
            </Typography>

            <Grid container spacing={3}>

                {stats.map((item) => (

                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        key={item.title}
                    >

                        <Card>

                            <CardContent>

                                {item.icon}

                                <Typography variant="h6">
                                    {item.title}
                                </Typography>

                                <Typography
                                    variant="h4"
                                    fontWeight="bold"
                                >
                                    {item.value}
                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>

                ))}

            </Grid>

            <Card sx={{ mt: 5 }}>

                <CardContent>

                    <Typography
                        variant="h6"
                        gutterBottom
                    >
                        Recent Interactions
                    </Typography>

                    <List>

                        {recentInteractions.map((item) => (

                            <ListItem key={item.doctor}>

                                <ListItemText
                                    primary={item.doctor}
                                    secondary={`${item.status} • ${item.date}`}
                                />

                            </ListItem>

                        ))}

                    </List>

                </CardContent>

            </Card>

        </Container>
    );
}