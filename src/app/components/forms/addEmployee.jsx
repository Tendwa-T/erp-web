import { useAdmin } from "@/context/admin/useAdmin";
import { Add } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function AddEmployee() {
    const [openModal, setOpenModal] = useState(false)
    const { admin, createEmployee, fetchEmployees } = useAdmin()
    const toggleModal = () => {
        setOpenModal(!openModal)
    }


    return (
        <>
            <Button
                onClick={toggleModal}
                variant="contained"
                sx={{ borderRadius: 2 }}
            >
                <Add />
                Add Employee
            </Button>
            <Dialog
                open={openModal}
                onClose={toggleModal}
                PaperProps={{
                    component: 'form',
                    onSubmit: async (event) => {
                        event.preventDefault()
                        const formData = new FormData(event.currentTarget)
                        const formJson = Object.fromEntries(formData.entries())
                        const { name, email, phone, department, role, salary } = formJson;
                        const emp = await createEmployee({ name, email, phone, department, role, salary })
                        setOpenModal(false);
                        await fetchEmployees()
                        return emp
                    },
                }}
            >

                <DialogTitle>
                    Add an Employee
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Use this form to enter data for the new employee
                    </DialogContentText>
                </DialogContent>
                <Box sx={{ display: 'flex', px: 2 }}>
                    <TextField
                        required
                        margin="dense"
                        id="name"
                        name='name'
                        label='Full Name'
                        type='text'
                        fullWidth
                        variant="standard"
                    />
                </Box>
                <Box sx={{ display: 'flex', p: 2 }}>

                    <TextField
                        required
                        margin="dense"
                        id="email"
                        name='email'
                        label='Email address'
                        type='text'
                        fullWidth
                        variant="standard"
                    />
                    <Box sx={{ width: '3em' }} />
                    <TextField
                        required
                        margin="dense"
                        id="phone"
                        name='phone'
                        label='Phone Number'
                        type='tel'
                        fullWidth
                        variant="standard"
                    />
                </Box>
                <Box sx={{ display: 'flex', p: 2 }}>
                    <TextField
                        required
                        margin="dense"
                        id="department"
                        name='department'
                        label='Department'
                        type='text'
                        fullWidth
                        variant="standard"
                    />
                    <Box sx={{ width: '3em' }} />
                    <TextField
                        required
                        margin="dense"
                        id="role"
                        name='role'
                        label='Role'
                        type='text'
                        fullWidth
                        variant="standard"
                    />
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
                        variant="standard"
                    />
                </Box>
                <DialogActions>
                    <Button variant="outlined"
                        onClick={toggleModal}
                    >Cancel</Button>
                    <Button variant="contained" type="submit">Add</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}