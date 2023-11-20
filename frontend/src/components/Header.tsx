import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import Logo from "./Shared/Logo";

const Header = () => {
  return (
    <AppBar
      sx={{
        bgcolor: "transparent",
        position: "static",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
