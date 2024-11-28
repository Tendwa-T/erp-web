"use client";

import { useUser } from "@/context/user/useUser";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Slide,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const router = useRouter();
  const [vis, setVis] = useState(false);
  const { userResetPassword } = useUser();
  const [snack, setSnack] = useState({
    open: true,
    message: "Success: Kindly Reset your Password",
    success: true,
    transition: SlideTransition(),
    position: "top-right",
  });

  function handlePass(e) {
    setPassword(e.target.value);
  }
  function handleConfPass(e) {
    setConfPass(e.target.value);
  }

  function verifyPass() {
    if (!password || !confPass) {
      return setSnack({
        ...snack,
        open: true,
        message: "Both Password and Confirm Password must be Provided",
        success: false,
      });
    }
    return true;
  }
  function showPassword() {
    setVis(!vis);
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
      const verify = verifyPass();
      if (!verify) {
        throw Error("An Error with Password Verification");
      }
      const resBod = await userResetPassword(password);
      console.log(resBod);

      handleClick(resBod.message, resBod.success);
      if (resBod.success == true) {
        router.refresh("/");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
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
          p: "3em",
          width: "30em",
          borderRadius: "2em",
        }}
      >
        <Typography variant="h4" fontWeight={"bold"} sx={{ my: "0.5em" }}>
          PulseERP
        </Typography>
        <TextField
          name="password"
          id="password"
          type={vis ? "text" : "password"}
          label="Password"
          onBlur={handlePass}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={showPassword}>
                    {vis ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          fullWidth
        />
        <Box sx={{ height: "2em" }} />
        <TextField
          name="confpass"
          id="confpass"
          type={vis ? "text" : "password"}
          onBlur={handleConfPass}
          label="Confirm Password"
          fullWidth
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={showPassword}>
                    {vis ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
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
