"use client";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import { useState } from "react";
import SignIn from "./authentication/signin/page";
import SignUp from "./authentication/signup/page";
import { useUser } from "@/context/user/useUser";
import Dashboard from "./dashboard/page";

export default function HomePage() {
  const [tabVal, setTabVal] = useState("1");
  const handleChangeTab = (event, newVal) => {
    setTabVal(newVal);
  };
  const { user } = useUser();

  return (
    <Box>
      {user.token == null ? (
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            typography: "body1",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TabContext value={tabVal}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChangeTab}>
                <Tab label="Sign In" value="1" />
                <Tab label="Sign Up" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <SignIn />
            </TabPanel>
            <TabPanel value="2">
              <SignUp />
            </TabPanel>
          </TabContext>
        </Box>
      ) : (
        <Box>
          <Dashboard />
        </Box>
      )}
    </Box>
  );
}
