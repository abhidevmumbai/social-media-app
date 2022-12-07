import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Navbar from "../navbar";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-widt: 1000px)");
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  return (
    <Box>
      <Box
        width="100%"
        bgcolor={theme.palette.background.paper}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Sociopedia
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        bgcolor={theme.palette.background.paper}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ mb: "1.5rem" }}
          color="primary"
        >
          Welcome to Sociopedia, the Social Media for Socipaths!
        </Typography>
      </Box>
      {pageType === "login" ? <LoginForm /> : <RegisterForm />}
      <Typography
        onClick={() => {
          setPageType(isLogin ? "register" : "login");
        }}
        sx={{
          textDecoration: "underline",
          // color: palette.primary.main,0
          "&:hover": {
            cursor: "pointer",
            // color: palette.primary.light,
          },
        }}
      >
        {isLogin
          ? "Don't have an account? Sign Up here."
          : "Already have an account? Login here."}
      </Typography>
    </Box>
  );
};

export default LoginPage;
