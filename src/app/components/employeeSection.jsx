"use client";

import { useUser } from "@/context/user/useUser";

import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import AddEmployee from "./forms/addEmployee";
import { useEffect, useState } from "react";
import { useAdmin } from "@/context/admin/useAdmin";
import { Delete, ExpandMore } from "@mui/icons-material";

export default function AdminEmployeeSection() {
  const { user } = useUser();
  const { employees, fetchEmployees, deleteEmployee } = useAdmin()
  const [pageEmployees, setPageEmployees] = useState(employees)


  let ksh = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KSH",
  });


  useEffect(() => {
    if (user.role === 'admin') {
      fetchEmployees()
    }
  }, [pageEmployees])


  return (
    <Box sx={{ display: "flex", flexDirection: "column", mt: '1em' }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box>
            <Typography variant="h4">Employees</Typography>
            <Typography variant="caption">Get to view the current Employees.</Typography>
          </Box>

        </AccordionSummary>
        <AccordionDetails>
          <Paper sx={{ padding: 2, borderRadius: 2 }}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              {user.role === "admin" && <AddEmployee />}
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Full Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Department</TableCell>
                    <TableCell align="center">Role</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((row, index) => {
                    return (
                      <TableRow key={row.userID} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component={'th'} scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.department}</TableCell>
                        <TableCell align="center">{row.role}</TableCell>
                        <TableCell align="center"><Chip label={row.status} color={row.status === "active" ? "success" : "error"} /></TableCell>
                        <TableCell align="center"> <Box>
                          <IconButton color="error" onClick={async () => {
                            await deleteEmployee(row.userID)
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

