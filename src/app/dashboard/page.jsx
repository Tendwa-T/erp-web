"use client";

import { useUser } from "@/context/user/useUser";
import {
  AttachMoney,
  Home,
  People,
  Person,
  Settings,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";

export default function Dashboard() {
  const drawerWidth = 240;
  const [selectedItem, setSelectedItem] = useState(0);
  const { user } = useUser();
  const items = {
    0: "Dashboard",
    1: "Finance",
    2: "Human Resource",
    3: "User",
    4: "Settings",
  };

  const handleListItemClick = (event, index) => {
    setSelectedItem(index);
  };

  const sec2 = [
    {
      text: "Finance",
      icon: <AttachMoney />,
    },
    {
      text: "Human Resource",
      icon: <People />,
    },
  ];

  const sec3 = [
    {
      text: "User",
      icon: <Person />,
    },
    {
      text: "Settings",
      icon: <Settings />,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {selectedItem == 0
              ? "Dashboard"
              : selectedItem == 1
                ? "Finance"
                : selectedItem == 2
                  ? "Human Resource"
                  : selectedItem == 3
                    ? "User"
                    : "Settings"}
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
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
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
                  selected={selectedItem == index + 3}
                  onClick={(event) => handleListItemClick(event, index + 3)}
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
        <Box padding={2}>
          <Typography> Welcome {user.name}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
