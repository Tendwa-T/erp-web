"use client"

import { useUser } from "@/context/user/useUser"
import { Box, Card, CardHeader, Chip, Divider, Grid2, List, ListItem, ListItemText, Paper, Typography } from "@mui/material"

export default function UserPage() {
    const { user } = useUser()
    let ksh = new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KSH'
    })
    console.log(ksh.format(user.salary))

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
            <Paper sx={{ padding: 2, borderRadius: 2, }}>
                <Typography variant="h4">
                    Personal Info
                </Typography>
                <Grid2 container padding={2}>
                    <Grid2 size={4} padding={1}>
                        <Typography variant="h5">
                            Full Name:
                        </Typography>
                        <Typography variant="body2">
                            {user.name}
                        </Typography>
                    </Grid2>
                    <Grid2 size={4} padding={1}>
                        <Typography variant="h5">
                            Email:
                        </Typography>
                        <Typography variant="body2">
                            {user.email}
                        </Typography>
                    </Grid2>
                    <Grid2 size={4} padding={1}>
                        <Typography variant="h5">
                            Status:
                        </Typography>
                        <Chip label={user.status} color={user.status === "active" ? "success" : "error"} />

                    </Grid2>
                </Grid2>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h4" mt={2}>
                    Employement Info
                </Typography>
                <Grid2 container padding={2} rowGap={4}>
                    <Grid2 size={4} padding={1}>
                        <Typography variant="h5">
                            Department:
                        </Typography>
                        <Typography variant="body2">
                            {user.department}
                        </Typography>
                    </Grid2>
                    <Grid2 size={4} padding={1}>
                        <Typography variant="h5">
                            Role:
                        </Typography>
                        <Typography variant="body2">
                            {user.role}
                        </Typography>
                    </Grid2>
                    <Grid2 size={4} padding={1}>
                        <Typography variant="h5">
                            Salary:
                        </Typography>
                        <Typography variant="body2">
                            {ksh.format(user.salary)}
                        </Typography>
                    </Grid2>

                    <Grid2 size={4} padding={1}>
                        <Typography variant="h5">
                            Skills:
                        </Typography>
                        {user.skills.length > 0 ? (
                            <List>
                                {user.skills.map((sk, index) => (
                                    <ListItemText key={index} secondary={sk} />
                                ))}
                            </List>
                        ) : (<Typography variant="caption">No Skills Added</Typography>)}
                    </Grid2>
                    <Grid2 size={4} padding={1}>
                        <Typography variant="h5">
                            Projects:
                        </Typography>
                        {user.projects > 0 ? (
                            <List>
                                {user.projects.map((pj, index) => (
                                    <ListItemText key={index} secondary={pj} />
                                ))}
                            </List>
                        ) : (<Typography variant="caption">No Projects Assigned</Typography>)}
                    </Grid2>
                    <Grid2 size={4} padding={1}>
                        <Typography variant="h5">
                            Certifications:
                        </Typography>
                        {user.certifications > 0 ? (
                            <List>
                                {user.certifications.map((ct, index) => (
                                    <ListItemText key={index} secondary={ct} />
                                ))}
                            </List>
                        ) : (<Typography variant="caption">No Certifications Added</Typography>)}
                    </Grid2>
                </Grid2>
            </Paper>
        </Box>
    )

}