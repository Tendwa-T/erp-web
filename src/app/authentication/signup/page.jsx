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
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userRegister } = useUser();
  const [snack, setSnack] = useState({
    open: false,
    Transition: SlideTransition,
    message: "Default Message",
    success: true,
  });

  const router = useRouter();

  function handleName(e) {
    setName(e.target.value);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePass(e) {
    setPassword(e.target.value);
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

  async function submitData() {
    try {
      const resBod = await userRegister(name, email, password);

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
          name="name"
          id="name"
          type="text"
          label="Full Name"
          onBlur={handleName}
          sx={{ width: { xs: "10em", md: "20em" } }}
        />
        <Box sx={{ height: "2em" }} />
        <TextField
          name="email"
          id="email"
          type="email"
          label="Email"
          onBlur={handleEmail}
          sx={{ width: { xs: "10em", md: "20em" } }}
        />
        <Box sx={{ height: "2em" }} />

        <TextField
          name="password"
          id="password"
          type="password"
          onBlur={handlePass}
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
          <Button onClick={submitData} variant="contained" sx={{ my: "1em" }}>
            Login
          </Button>
        </Box>
        <Button onClick={() => router.refresh()}>
          Already have an Account?
        </Button>
      </Paper>
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
    </Box>
  );
}
