"use client";

import { useUser } from "@/context/user/useUser";
import {
  Alert,
  Box,
  Button,
  Paper,
  Slide,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { NextResponse } from "next/server";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userLogin } = useUser();
  const [snack, setSnack] = useState({
    open: false,
    message: "Default message",
    success: null,
    transition: SlideTransition(),
  });

  function handleSubmit(e) {
    if (e.id == "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleClick(mes, success) {
    setSnack({
      open: true,
      message: mes,
      success,
    });
  }

  function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
  }

  function handleClose() {
    setSnack({
      ...snack,
      open: false,
    });
  }
  async function checkData() {
    try {
      const resBod = await userLogin(email, password);
      console.log(resBod);
      handleClick(resBod.message, resBod.success);
      return NextResponse.json({
        status: resBod.status,
        message: resBod.message,
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: "1em",
          borderRadius: "2em",
        }}
      >
        <Typography variant="h4" fontWeight={"bold"} sx={{ my: "0.5em" }}>
          PulseERP
        </Typography>
        <TextField
          name="email"
          id="email"
          type="email"
          className="border-black fill-black"
          label="Email"
          onBlur={handleEmail}
          sx={{ width: { xs: "10em", md: "20em" } }}
        />
        <Box sx={{ height: "2em" }} />
        <TextField
          name="password"
          id="password"
          type="password"
          onBlur={handleSubmit}
          label="Password"
          sx={{ width: { xs: "10em", md: "20em" } }}
        />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <Button>Cancel</Button>
          <Button onClick={checkData} variant="contained" sx={{ my: "1em" }}>
            Login
          </Button>
        </Box>
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
      </Paper>
    </Box>
  );
}
