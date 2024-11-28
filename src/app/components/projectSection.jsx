"use client";

import { useUser } from "@/context/user/useUser";

import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import AddEmployee from "./forms/addEmployee";
import { useEffect, useState } from "react";
import { Delete, ExpandMore } from "@mui/icons-material";
import { useProject } from "@/context/projects/useProject";
import AddProject from "./forms/addProject";

export default function AdminProjectSection() {
    const { user } = useUser();
    const { projects, fetchProjects, deleteProject } = useProject()
    const [pageData, setPageData] = useState(projects)


    let ksh = new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KSH",
    });


    useEffect(() => {
        if (user.role === 'admin') {
            fetchProjects()
        }
    }, [pageData])


    return (
        <Box sx={{ display: "flex", flexDirection: "column", my: '1em' }}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box>
                        <Typography variant="h4">Projects</Typography>
                        <Typography variant="caption">Get to view the current Projects.</Typography>
                    </Box>

                </AccordionSummary>
                <AccordionDetails>
                    <Paper sx={{ padding: 2, borderRadius: 2 }}>
                        <Box
                            sx={{
                                display: "flex",
                                width: "100%",
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant="h6">Project List</Typography>
                            {user.role === "admin" && <AddProject />}
                        </Box>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="center">Description</TableCell>
                                        <TableCell align="center">Start Date</TableCell>
                                        <TableCell align="center">End Date</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {projects.map((row, index) => {
                                        return (
                                            <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell component={'th'} scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="center">{row.email}</TableCell>
                                                <TableCell align="center">{row.department}</TableCell>
                                                <TableCell align="center">{row.role}</TableCell>
                                                <TableCell align="center"><Chip label={row.status} color={row.status === "active" ? "success" : "error"} /></TableCell>
                                                <TableCell align="center"> <Box>
                                                    <IconButton color="error" onClick={async () => {
                                                        await deleteProject(row._id)
                                                        fetchEmployees()
                                                    }}>
                                                        <Delete />
                                                    </IconButton>
                                                </Box>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </AccordionDetails>
            </Accordion>
        </Box >
    );
}

