"use client";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import { useState } from "react";
import SignIn from "./authentication/signin/page";
import { useUser } from "@/context/user/useUser";
import Dashboard from "./dashboard/admin/page";
import ResetPassword from "./authentication/resetPass/page";
import AdminDashboard from "./dashboard/admin/page";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [tabVal, setTabVal] = useState("1");
  const handleChangeTab = (event, newVal) => {
    setTabVal(newVal);
  };
  const { user } = useUser();

  return (
    <>
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
              </TabList>
            </Box>
            <TabPanel value="1">
              <SignIn />
            </TabPanel>
          </TabContext>
        </Box>
      ) : user.resetRequired ? (
        () => router.push("authentication/resetPass")
      ) : user.role === "employee" ? (
        <Box>
          <Typography>UserPage </Typography>
        </Box>
      ) : (
        <Box>
          <AdminDashboard />
        </Box>
      )}
    </>
  );
}
