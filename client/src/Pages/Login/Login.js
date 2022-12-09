import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import PrevButton from "../../Components/NavButton/PrevButton";
import { ReactComponent as LoginImage } from "../../Assets/login.svg";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { setupUser } = useAppContext();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: false, password: false });
  const handleOnChange = (event) => {
    setFormData((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
    setError((state) => ({
      ...state,
      [event.target.name]: false,
    }));
  };

  console.log(formData);

  const handleOnSubmit = () => {
    if (formData.email === "") {
      setError((state) => ({ ...state, email: false }));
    }
    if (formData.password === "") {
      setError((state) => ({ ...state, password: false }));
    }
    setupUser({ formData, endPoint: "login" });
    sessionStorage.getItem("role") === "admin"
      ? navigate("/overview")
      : navigate("/details");
  };

  const [isValid, setIsValid] = useState(true);

  return (
    <div>
      <script>{(document.title = "Login")}</script>
      <PrevButton text="Back" link="" />
      <Grid container className="center" gap={2}>
        <Grid item xs={5} px={2}>
          <Card sx={{ px: 1, py: 2, mt: 4 }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  letterSpacing: "5px",
                  fontWeight: "bolder",
                  color: "#264653",
                  mb: 3,
                  mt: 1,
                }}
              >
                LOGIN
              </Typography>
              <FormControl sx={{ width: "80%", my: 2 }}>
                <FormGroup>
                  <TextField
                    required
                    error={error.email}
                    helperText={error.email ? "Enter your email" : ""}
                    type="email"
                    name="email"
                    label="Email"
                    sx={{ mb: 4 }}
                    onChange={handleOnChange}
                  />
                  <TextField
                    required
                    error={error.password}
                    helperText={error.email ? "Enter your password" : ""}
                    name="password"
                    label="Password"
                    type="password"
                    onChange={handleOnChange}
                  />
                </FormGroup>
              </FormControl>
              {isValid ? (
                <Box height="30px"></Box>
              ) : (
                <Alert severity="error" sx={{ mb: 2, width: "80%" }}>
                  Invalid email or password
                </Alert>
              )}
              <Button
                type="submit"
                sx={{
                  background: "#264653",
                  color: "#FFFFFF",
                  "&:hover": { backgroundColor: "#C59D5F" },
                }}
                onClick={handleOnSubmit}
              >
                Submit
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={5} px={2}>
          <LoginImage width="100%" height="0%" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
