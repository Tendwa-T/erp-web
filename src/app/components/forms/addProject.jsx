
import { useAdmin } from "@/context/admin/useAdmin";
import { useBudget } from "@/context/budget/useBudget";
import { useProject } from "@/context/projects/useProject";
import { Add } from "@mui/icons-material";
import { Alert, Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Slide, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function AddProject() {
    const [openModal, setOpenModal] = useState(false)
    const { createProject, fetchProjects } = useProject()
    const { budgets, expenses, fetchExpenses, fetchBudgets } = useBudget()
    const { employees, fetchEmployees } = useAdmin()
    const [assignedEmployees, setAssignedEmployees] = useState([])
    const [projMilestones, setProjectMilestones] = useState([])
    const [projStatus, setProjStatus] = useState("Ongoing")
    const toggleModal = () => {
        setOpenModal(!openModal)
    }
    const [snack, setSnack] = useState({
        open: false,
        message: "Default message",
        success: null,
        transition: SlideTransition(),
    });


    function SlideTransition(props) {
        return <Slide {...props} direction="left" />;
    }

    function handleClose() {
        setSnack({
            ...snack,
            open: false,
        });
    }


    useEffect(() => {
        fetchBudgets()
        fetchExpenses()
        fetchEmployees()
    }, [])

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
                            employees: assignedEmployees.map((emp) => emp._id)
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
                        {budgets.map((samp, index) => {

                            return (
                                <MenuItem component={"option"} key={index} value={samp._id}>
                                    {samp.name}
                                </MenuItem>
                            )
                        })}
                    </TextField>
                    <Box sx={{ width: '3em' }} />


                </Box>
                <Box sx={{ display: 'flex', px: 2 }}>
                    <Autocomplete
                        fullWidth
                        multiple
                        id="employees"
                        name='employees'
                        options={employees}
                        getOptionLabel={employee => employee.name}
                        value={assignedEmployees}
                        onChange={(event, newValue) => {
                            setAssignedEmployees(newValue)
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                id="employees"
                                name='employees'
                                label="Assigned Employees"
                                placeholder="Employees"
                            />
                        )}
                    />

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
                        id="expenses"
                        name='expenses'
                        label='Expenses'
                        fullWidth
                        defaultValue=""
                        select
                        slotProps={{
                            select: {
                                native: true
                            }
                        }}
                    >
                        {expenses.map((samp, index) => {
                            return (
                                <MenuItem component={"option"} key={index} value={samp._id}>
                                    {samp.name}
                                </MenuItem>
                            )
                        })}
                    </TextField>


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
            <Snackbar
                open={snack.open}
                onClose={handleClose}
                TransitionComponent={snack.Transition}
                key={"Reg-Snack"}
                autoHideDuration={1200}
            >
                <Alert
                    onClose={handleClose}
                    severity={snack.success ? "success" : "error"}
                >
                    {snack.message}
                </Alert>
            </Snackbar>
        </>
    )
}

