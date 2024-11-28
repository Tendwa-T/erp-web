"use client";

import { useUser } from "@/context/user/useUser";
import {
  AttachMoney,
  ChevronLeft,
  ChevronRight,
  Home,
  Menu as MenuIcon,
  People,
  Person,
  Work,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import UserPage from "../../components/userSection";
import EmployeeSection from "../../components/employeeSection";
import AdminEmployeeSection from "../../components/employeeSection";
import { useAdmin } from "@/context/admin/useAdmin";
import AdminProjectSection from "@/app/components/projectSection";

export default function AdminDashboard() {
  const drawerWidth = 240;
  const theme = useTheme()
  const [selectedItem, setSelectedItem] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false)
  const { admin } = useAdmin()
  const items = {
    0: "Dashboard",
    1: "Finance",
    2: "Human Resource",
    3: "Projects",
    4: "User",
  };

  const handleListItemClick = (event, index) => {
    setSelectedItem(index);
  };

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  const sec2 = [
    {
      text: "Finance",
      icon: <AttachMoney />,
    },
    {
      text: "Human Resource",
      icon: <People />,
    },
    {
      text: "Projects",
      icon: <Work />
    }
  ];

  const sec3 = [
    {
      text: "User",
      icon: <Person />,

    },
  ];

  return (
    <Box sx={{ display: "flex", maxWidth: '100vw' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: openDrawer ? `calc(100% - ${drawerWidth}px)` : '100%' }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open Drawer"
            onClick={handleDrawer}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              openDrawer && { display: 'none' }
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ width: '0.5em' }} />
          <Typography variant="h5" noWrap component="div">
            {selectedItem == 0
              ? "Dashboard"
              : selectedItem == 1
                ? "Finance"
                : selectedItem == 2
                  ? "Human Resource"
                  : selectedItem == 3
                    ? "Projects"
                    : selectedItem == 4 && "User"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        onClose={handleDrawer}
        variant="temporary"
        anchor="left"
        open={openDrawer}
      >
        <Toolbar>
          <IconButton onClick={handleDrawer}>
            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
          <Box sx={{ width: '1em' }} />
          <Typography>PulseERP</Typography>
        </Toolbar>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedItem === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          {sec2.map((obj, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                selected={selectedItem === index + 1}
                onClick={(event) => handleListItemClick(event, index + 1)}
              >
                <ListItemIcon>{obj.icon}</ListItemIcon>
                <ListItemText primary={obj.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            flexDirection: "column-reverse",
            flexGrow: 1,
          }}
        >
          <List>
            {sec3.map((obj, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  selected={selectedItem == index + 4}
                  onClick={(event) => handleListItemClick(event, index + 4)}
                >
                  <ListItemIcon>{obj.icon}</ListItemIcon>
                  <ListItemText primary={obj.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box>
        <Toolbar />
        <Box padding={2} sx={{ display: 'flex', flexDirection: 'column', width: '100vw ', }}>
          {admin && (<Typography>
            Admin is {admin.name}
          </Typography>)}

          {selectedItem == 2 && (
            <>
              <AdminEmployeeSection />
              <AdminProjectSection />
            </>
          )}
          {selectedItem == 4 && <UserPage />}
        </Box>
      </Box>
    </Box>
  );
}
