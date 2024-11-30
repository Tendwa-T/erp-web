
import { useBudget } from "@/context/budget/useBudget";
import { Add } from "@mui/icons-material";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Slide, Snackbar, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function AddBudget() {
    const [openModal, setOpenModal] = useState(false)
    const { createBudget, fetchBudgets } = useBudget()
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


    return (
        <>
            <Button
                onClick={toggleModal}
                variant="contained"
                sx={{ borderRadius: 2 }}
            >
                <Add />
                Add Budget
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
                            description,
                            department,
                            category,
                            allocatedAmount,
                            spentAmount,
                            startDate,
                            endDate,
                            status,
                        } = formJson;
                        const bud = await createBudget({
                            name: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}-${name.replace(/\s+/g, '-')}`,
                            description,
                            department,
                            category,
                            allocatedAmount,
                            spentAmount,
                            startDate,
                            endDate,
                            status,
                        })
                        if (bud.success === false) {
                            setSnack({
                                open: true,
                                message: bud.message,
                                success: false,
                            })
                            return
                        } else {
                            setSnack({
                                open: true,
                                message: bud.message,
                                success: true,
                            })
                            toggleModal()
                        }
                        await fetchBudgets()
                        return bud
                    },
                }}
            >

                <DialogTitle variant="h4" textAlign={'center'}>
                    Add a Budget
                </DialogTitle>
                <DialogContent>
                    <DialogContentText textAlign={'center'}>
                        Use this form to enter data for a new Budget
                    </DialogContentText>
                </DialogContent>
                <Box sx={{ display: 'flex', px: 2, }}>
                    <TextField
                        required
                        margin="dense"
                        id="name"
                        name='name'
                        label='Budget Name'
                        type='text'
                        fullWidth
                        helperText="Must be Unique to This Budget"
                    />
                </Box>
                <Box sx={{ display: 'flex', px: 2 }}>
                    <TextField
                        required
                        margin="dense"
                        id="description"
                        name='description'
                        label='Budget Description'
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
                        label='Budget Category'
                        fullWidth
                        defaultValue=""
                        type='text'
                    />

                </Box>
                <Box sx={{ display: 'flex', px: 2 }}>
                    <TextField
                        required
                        margin="dense"
                        id="allocatedAmount"
                        name='allocatedAmount'
                        label='Allocated Amount'
                        type='number'
                        fullWidth
                    />
                    <Box sx={{ width: '3em' }} />
                    <TextField
                        margin="dense"
                        id="spentAmount"
                        name='spentAmount'
                        label='Spent Amount'
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

