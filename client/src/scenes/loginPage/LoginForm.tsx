import { EditOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import FlexBetween from "../../components/FlexBetween";
import { setLogin } from "../../state";
import { IValuesLogin, IValuesRegister } from "./LoginForm.types";

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesLogin: IValuesLogin = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const login = async (
    values: IValuesRegister | IValuesLogin,
    onSubmitProps: any
  ) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();

    if (loggedIn) {
      dispatch(setLogin({ user: loggedIn.user, token: loggedIn.token }));
      setPageType("login");
      navigate("/home");
    }
  };

  const handleFormSubmit = async (
    values: IValuesRegister | IValuesLogin,
    onSubmitProps: any
  ) => {
    await login(values as IValuesLogin, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr)"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
            />
          </Box>

          {/**Buttons */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                // color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              LOGIN
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
