import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  let history = useHistory();
  const logoutUser = () => {
    localStorage.clear();
    window.location.reload();
  };

  if (hasHiddenAuthButtons) {
    return (
      <Box className="header">
        <Box className="header-title">
          <Link to="/">
            <img src="logo_light.svg" alt="QKart-icon"></img>
          </Link>
        </Box>
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => {
            history.push("/");
          }}
        >
          Back to explore
        </Button>
      </Box>
    );
  }
  return (
    <Box className="header">
      <Box className="header-title">
        <Link to="/">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Link>
      </Box>
      {children}
      <Stack direction="row" alignItems="center" spacing={2}>
        {localStorage.getItem("token") ? (
          <>
            <Avatar alt={localStorage.getItem("username")} src="avatar.png" />
            <p>{localStorage.getItem("username")}</p>
            <Button onClick={logoutUser}>LOGOUT</Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                history.push("/login");
              }}
            >
              LOGIN
            </Button>
            <Button
              className="button"
              variant="contained"
              onClick={() => {
                history.push("/register");
              }}
            >
              REGISTER
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Header;
