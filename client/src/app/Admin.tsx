import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import ROUTES from "./ROUTES";
import CategoryIcon from "@mui/icons-material/Category";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InventoryIcon from "@mui/icons-material/Inventory";
import {
  Box,
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { AppBar, Drawer, DrawerHeader } from "../components/Drawer";
import IconButton from "@mui/material/IconButton";
import { Toolbar, Typography } from "@mui/material/";
import Categories from "../features/admin/categories/Categories";
import Products from "../features/admin/products/Products";

const Admin = (props: any) => {
  const theme = useTheme();
  interface RenderElementResult {
    route: string;
    icon: JSX.Element;
    component: JSX.Element;
  }

  const renderElement = (text: string): RenderElementResult => {
    switch (text) {
      case "Categories":
        return {
          route: ROUTES.categoriesAdmin(),
          icon: <CategoryIcon />,
          component: <Categories />,
        };
      case "Products":
        return {
          route: ROUTES.productsAdmin(),
          icon: <InventoryIcon />,
          component: <Products />,
        };
      default:
        return {
          route: ROUTES.categoriesAdmin(),
          icon: <CategoryIcon />,
          component: <Categories />,
        };
    }
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={drawerOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{
              mr: 5,
              ...(drawerOpen && { display: "none" }),
            }}
            onClick={handleDrawer}
          >
            <MenuIcon />
            <Typography variant="h5" noWrap component="div">
              Menu
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={drawerOpen}>
        <DrawerHeader>
          <IconButton onClick={handleDrawer}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Categories", "Products"].map((item, index) => {
            return (
              <ListItem
                key={index}
                disablePadding
                sx={{ display: "block" }}
                component={NavLink}
                to={renderElement(item).route}
              >
                <ListItemButton
                  sx={{
                    minHeight: 50,
                    justifyContent: drawerOpen ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: drawerOpen ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {renderElement(item).icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item}
                    sx={{ opacity: drawerOpen ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Admin;
