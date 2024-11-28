
import { useProject } from "@/context/projects/useProject";
import { Add } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function AddProject() {
    const [openModal, setOpenModal] = useState(false)
    const { createProject, fetchProjects } = useProject()
    const [assignedEmployees, setAssignedEmployees] = useState([])
    const [projMilestones, setProjectMilestones] = useState([])
    const [projStatus, setProjStatus] = useState("Ongoing")
    const toggleModal = () => {
        setOpenModal(!openModal)
    }

    const sampleID = [
        {
            id: "",
            name: '',
        },
        {
            id: "63159839c2121e4491b5234",
            name: 'Budget 1',
        },
        {
            id: "63159839c2121e4491b5235",
            name: 'Budget 2',
        },
        {
            id: "63159839c2121e4491b5236",
            name: 'Budget 3',
        },
        {
            id: "63159839c2121e4491b5237",
            name: 'Budget 4',
        },
    ]

    const sampleEmployees = [
        {
            id: "",
            name: '',
        },
        {
            id: "63159839c2121e4491b5234",
            name: 'Moses Getonto',
        },
        {
            id: "63159839c2121e4491b5235",
            name: 'Maryleen Menecha',
        },
        {
            id: "63159839c2121e4491b5236",
            name: 'Abel Mwirigi',
        },
        {
            id: "63159839c2121e4491b5237",
            name: 'Joshua Waribu',
        },
    ]


    return (
        <>
            <Button
                onClick={toggleModal}
                variant="contained"
                sx={{ borderRadius: 2 }}
            >
                <Add />
                Add Project
            </Button>
            <Dialog
                open={openModal}
                onClose={toggleModal}
                PaperProps={{
                    component: 'form',
                    sx: { width: '100em', borderRadius: '2em', p: '1em' },
                    onSubmit: async (event) => {
                        event.preventDefault()
                        const formData = new FormData(event.currentTarget)
                        const formJson = Object.fromEntries(formData.entries())
                        const { name,
                            description,
                            budget,
                            milestones,
                            expenses,
                            startDate,
                            endDate,
                            status,
                            employees,
                        } = formJson;
                        const proj = await createProject({
                            name,
                            description,
                            budget,
                            milestones,
                            expenses,
                            startDate,
                            endDate,
                            status,
                            employees
                        })
                        setOpenModal(false);
                        await fetchProjects()
                        return proj
                    },
                }}
            >

                <DialogTitle variant="h4" textAlign={'center'}>
                    Add a Project
                </DialogTitle>
                <DialogContent>
                    <DialogContentText textAlign={'center'}>
                        Use this form to enter data for a new Project
                    </DialogContentText>
                </DialogContent>
                <Box sx={{ display: 'flex', px: 2, }}>
                    <TextField
                        required
                        margin="dense"
                        id="name"
                        name='name'
                        label='Project Name'
                        type='text'
                        fullWidth
                        helperText="Must be Unique to This project"
                    />
                </Box>
                <Box sx={{ display: 'flex', px: 2 }}>
                    <TextField
                        required
                        margin="dense"
                        id="description"
                        name='description'
                        label='Project Description'
                        type='text'
                        multiline
                        fullWidth

                    />
                </Box>
                <Box sx={{ display: 'flex', px: 2 }}>
                    <TextField
                        required
                        margin="dense"
                        id="budget"
                        name='budget'
                        label='Project Budget'
                        fullWidth
                        defaultValue=""
                        select
                        slotProps={{
                            select: {
                                native: true
                            }
                        }}

                    >
                        {sampleID.map((samp, index) => (
                            <MenuItem component={"option"} key={index} value={samp.id}>
                                {samp.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Box sx={{ width: '3em' }} />

                    {/* 
                    TODO: Add Milestone Dialog 
                    */}
                    <MilestoneModal />

                </Box>
                <Box sx={{ display: 'flex', px: 2 }}>
                    <TextField
                        required
                        margin="dense"
                        id="employees"
                        name='employees'
                        label='Assigned Employees'
                        type='text'
                        select
                        defaultValue={""}
                        fullWidth
                        slotProps={{
                            select: {
                                native: true
                            }
                        }}
                    >
                        {sampleEmployees.map((emp, index) => (
                            <MenuItem component="option" key={index} value={emp.id}>
                                {emp.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Box sx={{ width: '3em' }} />
                    <TextField
                        margin="dense"
                        id="status"
                        name='status'
                        label='Status'
                        defaultValue={"Ongoing"}
                        type='text'
                        fullWidth
                        select
                        value={projStatus}
                        onChange={(e) => {
                            setProjStatus(e.target.value)
                        }}
                    >
                        {["Ongoing", "Completed", "On Hold"].map((item, index) => (
                            <MenuItem component={'option'} key={index} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Box sx={{ display: 'flex', px: 2 }}>
                    <TextField
                        required
                        margin="dense"
                        id="salary"
                        name='salary'
                        label='Expected Salary Amount'
                        type='number'
                        fullWidth

                    />
                </Box>
                <Box sx={{ display: 'flex', px: 2 }}>
                    <TextField
                        required
                        margin="dense"
                        id="startDate"
                        name='startDate'
                        label='Start Date'
                        type='date'
                        fullWidth
                        slotProps={{
                            inputLabel: {
                                shrink: true
                            }
                        }}
                    />
                    <Box sx={{ width: '3em' }} />
                    <TextField
                        required
                        margin="dense"
                        id="endDate"
                        name='endDate'
                        label='End Date'
                        type='date'
                        fullWidth
                        slotProps={{
                            inputLabel: {
                                shrink: true
                            }
                        }}
                    />
                </Box>

                <DialogActions>
                    <Button variant="outlined"
                        onClick={toggleModal}
                    >Cancel</Button>
                    <Button variant="contained" type="submit">Add</Button>
                </DialogActions>
            </Dialog >
        </>
    )
}

function MilestoneModal() {
    return (
        <>
            <TextField
                required
                margin="dense"
                id="milestones"
                name='milestones'
                label='Milestones'
                type='text'
                fullWidth
                slotProps={{
                    input: {
                        readOnly: true
                    }
                }}
                onClick={() => {
                    window.alert("Heeloo")
                }}
            />
            <Dialog>
                <Box>
                    <TextField />
                </Box>
                <Box>

                    <Box />
                    <TextField />
                </Box>
                <Box>
                    <TextField />
                    <Box />
                    <TextField />
                </Box>
            </Dialog>
        </>
    )
}