
import { useBudget } from "@/context/budget/useBudget";
import { useProject } from "@/context/projects/useProject";
import { useUser } from "@/context/user/useUser";
import { Add } from "@mui/icons-material";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Slide, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function AddExpense() {
    const [openModal, setOpenModal] = useState(false)
    const { projects, fetchProjects } = useProject()
    const { createExpense, fetchExpenses } = useBudget()
    const { user } = useUser()
    const toggleModal = () => {
        setOpenModal(!openModal)
    }

    useEffect(() => {
        fetchProjects()
    }, [])


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


    return (
        <>
            <Button
                onClick={toggleModal}
                variant="contained"
                sx={{ borderRadius: 2 }}
            >
                <Add />
                Add Expense
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
                        const {
                            name,
                            department,
                            description,
                            category,
                            amount,
                            date,
                            projectID,
                            status,
                        } = formJson;

                        const exp = await createExpense({
                            name: `EXP-${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}-${name.replace(/\s+/g, '-')}`,
                            description,
                            department,
                            category,
                            amount,
                            date,
                            projectID,
                            status,
                            createdBy: user.userID
                        })
                        if (exp.success === false) {
                            setSnack({
                                open: true,
                                message: exp.message,
                                success: false,
                            })
                            return
                        } else {
                            setSnack({
                                open: true,
                                message: exp.message,
                                success: true,
                            })
                            toggleModal()
                        }
                        await fetchExpenses()
                        return exp
                    },
                }}
            >

                <DialogTitle variant="h4" textAlign={'center'}>
                    Add an Expense
                </DialogTitle>
                <DialogContent>
                    <DialogContentText textAlign={'center'}>
                        Use this form to enter data for a new Expense
                    </DialogContentText>
                </DialogContent>
                <Box sx={{ display: 'flex', px: 2, }}>
                    <TextField
                        required
                        margin="dense"
                        id="name"
                        name='name'
                        label='Expense Name'
                        type='text'
                        fullWidth
                        helperText="Must be Unique to This Expense"
                    />
                </Box>
                <Box sx={{ display: 'flex', px: 2 }}>
                    <TextField
                        required
                        margin="dense"
                        id="description"
                        name='description'
                        label='Expense Description'
                        type='text'
                        multiline
                        fullWidth

                    />
                </Box>
                <Box sx={{ display: 'flex', px: 2 }}>
                    <TextField
                        required
                        margin="dense"
                        id="department"
                        name='department'
                        label='Budget Department'
                        fullWidth
                        defaultValue=""
                        type='text'
                    />
                    <Box sx={{ width: '3em' }} />
                    <TextField
                        required
                        margin="dense"
                        id="category"
                        name='category'
                        label='Expense Category'
                        fullWidth
                        defaultValue=""
                        type='text'
                    />

                </Box>
                <Box sx={{ display: 'flex', px: 2 }}>
                    <TextField
                        required
                        margin="dense"
                        id="amount"
                        name='amount'
                        label='Amount'
                        type='number'
                        fullWidth
                    />
                    <Box sx={{ width: '3em' }} />
                    <TextField
                        required
                        margin="dense"
                        id="date"
                        name='date'
                        label='Date'
                        type='date'
                        fullWidth
                        slotProps={{
                            inputLabel: {
                                shrink: true
                            }
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', px: 2 }}>
                    <TextField
                        required
                        margin="dense"
                        id="status"
                        name='status'
                        label='Status'
                        type='text'
                        fullWidth
                    />
                    <Box sx={{ width: '3em' }} />
                    <TextField
                        required
                        margin="dense"
                        id="projectID"
                        name='projectID'
                        label='Project ID'
                        select
                        fullWidth>
                        {projects.map((project) => (
                            <MenuItem key={project._id} value={project._id}>
                                {project.name}
                            </MenuItem>
                        ))}
                    </TextField>
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
                TransitionComponent={snack.transition}
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

