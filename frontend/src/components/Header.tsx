import { AppBar, Toolbar } from "@mui/material";
import Logo from "./Shared/Logo";
import { UseAuth } from "../context/AuthContext";
import NavigationLink from "./Shared/NavigationLink";

const Header = () => {
  const auth = UseAuth();
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
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="#00fffc"
                text="Go To Chat"
                textColor="black"
                to="/chat"
              />
              <NavigationLink
                bg="#51538f"
                text="Logout"
                textColor="white"
                to="/"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#00fffc"
                text="Login"
                textColor="black"
                to="/login"
              />
              <NavigationLink
                bg="#51538f"
                text="Signup"
                textColor="white"
                to="/signup"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
