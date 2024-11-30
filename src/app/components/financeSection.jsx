"use client";

import { Delete, Edit, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Chip, IconButton, Paper, Slide, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useUser } from "@/context/user/useUser";
import { useBudget } from "@/context/budget/useBudget";
import { useEffect, useState } from "react";
import AddBudget from "./forms/addBudget";
import AddExpense from "./forms/addExpense";

export default function AdminFinanceSection() {
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

    function AdminBudgetSection() {
        const { user } = useUser();
        // TODO: Implement Budget Context
        const { budgets, fetchBudgets, deleteBudget } = useBudget();
        const [pageData, setPageData] = useState(budgets)

        let ksh = new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KSH",
        });


        useEffect(() => {
            if (user.role === 'admin') {
                fetchBudgets()
            }
        }, [pageData])
        return (
            <Box sx={{ display: "flex", flexDirection: "column", my: '1em' }}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Box>
                            <Typography variant="h4">Budgets</Typography>
                            <Typography variant="caption">Get to view the current Budgets in The system.</Typography>
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
                                <Typography variant="h6">Budget List</Typography>
                                {user.role === "admin" && <AddBudget />}
                            </Box>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="center">Department</TableCell>
                                            <TableCell align="center">Category</TableCell>
                                            <TableCell align="center">Allocated Amount</TableCell>
                                            <TableCell align="center">Spent Amount</TableCell>
                                            <TableCell align="center">Start Date</TableCell>
                                            <TableCell align="center">End Date</TableCell>
                                            <TableCell align="center">Status</TableCell>
                                            <TableCell align="center">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {budgets.map((row, index) => {
                                            return (
                                                <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell component={'th'} scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="center">{row.department}</TableCell>
                                                    <TableCell align="center">{row.category}</TableCell>
                                                    <TableCell align="center">{ksh.format(row.allocatedAmount)}</TableCell>
                                                    <TableCell align="center">{ksh.format(row.spentAmount)}</TableCell>
                                                    <TableCell align="center">{row.startDate.split('T')[0]}</TableCell>
                                                    <TableCell align="center">{row.endDate.split('T')[0]}</TableCell>
                                                    <TableCell align="center">{row.status}</TableCell>
                                                    <TableCell align="center"> <Box sx={{ display: 'flex' }}>
                                                        <IconButton onClick={async () => {
                                                            await deleteBudget(row._id)
                                                        }}>
                                                            <Delete />
                                                        </IconButton>
                                                        <IconButton>
                                                            <Edit />
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
        )
    }

    function AdminExpenseSection() {
        const { user } = useUser();
        const { expenses, fetchExpenses } = useBudget();
        const [pageData, setPageData] = useState(expenses)

        let ksh = new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KSH",
        });

        useEffect(() => {
            if (user.role === 'admin') {
                fetchExpenses()
            }
        }, [pageData])

        return (
            <Box sx={{ display: "flex", flexDirection: "column", my: '1em' }}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Box>
                            <Typography variant="h4">Expenses</Typography>
                            <Typography variant="caption">Get to view the current Expenses in The system.</Typography>
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
                                <Typography variant="h6">Expense List</Typography>
                                {user.role === "admin" && <AddExpense />}
                            </Box>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="center">Budget</TableCell>
                                            <TableCell align="center">Category</TableCell>
                                            <TableCell align="center">Amount</TableCell>
                                            <TableCell align="center">Date</TableCell>
                                            <TableCell align="center">Status</TableCell>
                                            <TableCell align="center">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {expenses.map((row, index) => {
                                            return (
                                                <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell component={'th'} scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="center">{row.budgetID.name}</TableCell>
                                                    <TableCell align="center">{row.category}</TableCell>
                                                    <TableCell align="center">{ksh.format(row.amount)}</TableCell>
                                                    <TableCell align="center">{row.date.split('T')[0]}</TableCell>
                                                    <TableCell align="center">{row.status}</TableCell>
                                                    <TableCell align="center"> <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <IconButton>
                                                            <Delete />
                                                        </IconButton>
                                                        <IconButton>
                                                            <Edit />
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
        )

    }

    return (
        <>
            <AdminBudgetSection />
            <AdminExpenseSection />
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

