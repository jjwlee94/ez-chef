import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import LogoutButton from "./LogoutButton";
import {
  Avatar,
  Box,
  ClickAwayListener,
  Divider,
  Drawer,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import navbarList from "../../helpers/navbarList";
import MuiAppBar from "@mui/material/AppBar";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../docs/logo.png";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Nav = ({ user, username }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [tooltip, setTooltip] = useState(false);

  const navigate = useNavigate();

  const handleTooltipClose = () => {
    setTooltip(false);
  };

  const handleTooltipOpen = () => {
    setTooltip(true);
  };

  const navigateHome = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const replaceString = (str) => {
    return str.replaceAll(" ", "+").replaceAll(",", "+");
  };

  const showSearch = () => {
    if (!search) {
      return;
    }
    navigate(`/api/search/results/${replaceString(search)}`);
    window.location.reload();
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <AppBar position="fixed" open={open} style={{ background: "#f5f5f5" }}>
      <Box
        sx={{
          // p: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
        }}>
        <Grid sx={{ display: "flex", flexDirection: "row", width: 160 }}>
          <Toolbar>
            <Tooltip title="Your Menu">
              <IconButton
                aria-label="open drawer"
                onClick={toggleOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}>
                {user && (
                  <Avatar sx={{ width: 35, height: 35 }}>
                    {username.charAt(0)}
                  </Avatar>
                )}
                {!user && <Avatar sx={{ width: 35, height: 35 }}></Avatar>}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Grid>
        <Grid sx={{ display: "flex", flexDirection: "row" }}>
          <img src={Image} alt="logo" height={35} onClick={navigateHome} />
        </Grid>
        <Grid sx={{ display: "flex", flexDirection: "row" }}>
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              width: 160,
              fontSize: 18,
            }}
            placeholder="Search for Recipes"
            inputProps={{ "aria-label": "search recipes" }}
            value={search}
            onChange={handleChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                showSearch();
              }
            }}
          />
          {search && (
            <IconButton
              onClick={showSearch}
              sx={{ p: "10px" }}
              aria-label="search">
              <SearchIcon />
            </IconButton>
          )}
          {!search && (
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <Tooltip
                title={
                  <Typography fontSize={18} textAlign="center">
                    Please enter an ingredient or keyword!
                  </Typography>
                }
                onClose={handleTooltipClose}
                open={tooltip}>
                <IconButton
                  onClick={handleTooltipOpen}
                  sx={{ p: "10px" }}
                  aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Tooltip>
            </ClickAwayListener>
          )}
        </Grid>
      </Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          backgroundColor: "#b7b7a4",
        }}
        variant="persistent"
        anchor="left"
        open={open}>
        <DrawerHeader
          sx={{
            backgroundColor: "#b7b7a4",
          }}>
          <IconButton onClick={toggleOpen}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{
            backgroundColor: "#b7b7a4",
            height: "100%",
          }}>
          <ListItem
            sx={{
              "&:hover": {
                backgroundColor: "#6b705c",
              },
            }}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <Link
              to="/"
              onClick={toggleOpen}
              style={{ textDecoration: "none" }}>
              <ListItemText
                primary="Home"
                primaryTypographyProps={{ fontSize: "17px" }}
                sx={{
                  color: "white",
                }}
              />
            </Link>
          </ListItem>
          <ListItem
            sx={{
              "&:hover": {
                backgroundColor: "#6b705c",
              },
            }}>
            <ListItemIcon>
              <BrunchDiningIcon />
            </ListItemIcon>
            <Link
              to="/about"
              onClick={toggleOpen}
              style={{ textDecoration: "none" }}>
              <ListItemText
                primary="About Us"
                primaryTypographyProps={{ fontSize: "17px" }}
                sx={{
                  color: "white",
                }}
              />
            </Link>
          </ListItem>

          {user &&
            navbarList.map((item, index) => {
              return (
                <ListItem
                  key={index}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#6b705c",
                    },
                  }}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <Link
                    to={item.path}
                    onClick={toggleOpen}
                    style={{ textDecoration: "none" }}>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: "17px" }}
                      primary={item.desc}
                      sx={{
                        color: "white",
                      }}
                    />
                  </Link>
                </ListItem>
              );
            })}

          {!user && (
            <List>
              <ListItem
                sx={{
                  "&:hover": {
                    backgroundColor: "#6b705c",
                  },
                }}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <Link
                  to="/register"
                  onClick={toggleOpen}
                  style={{ textDecoration: "none" }}>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "17px" }}
                    primary="Sign Up"
                    sx={{
                      color: "white",
                    }}
                  />
                </Link>
              </ListItem>
              <ListItem
                sx={{
                  "&:hover": {
                    backgroundColor: "#6b705c",
                  },
                }}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <Link
                  to="/login"
                  onClick={toggleOpen}
                  style={{ textDecoration: "none" }}>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "17px" }}
                    primary="Login"
                    sx={{
                      color: "white",
                    }}
                  />
                </Link>
              </ListItem>
            </List>
          )}
          {user && (
            <ListItem>
              <LogoutButton />
            </ListItem>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Nav;
