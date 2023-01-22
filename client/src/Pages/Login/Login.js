import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";

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
import { colorPalette } from "../../Utils/colorPalette";

const Login = () => {
  const navigate = useNavigate();
  const { theme, loginUser, user } = useAppContext();
  const [isValid, setIsValid] = useState(true);
  const [formData, setFormData] = useState({ otp: "" });
  const [error, setError] = useState({ otp: false });

  const handleOnChange = (event) => {
    setIsValid(true);
    setFormData((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
    setError((state) => ({
      ...state,
      [event.target.name]: false,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (formData.otp === "") {
      setError((state) => ({ ...state, otp: true }));
      setTimeout(() => {
        setError({ otp: false });
      }, 3000);
      return;
    }

    await loginUser(formData).then((userData) => {
      if (!userData) {
        setIsValid(false);
        setTimeout(() => {
          setIsValid(true);
        }, 3000);
      }
    });
  };

  useEffect(() => {
    if (user?.role === "participant") {
      navigate("/consent");
    }
  }, [user, navigate]);

  return (
    <div className={`backgroundImage-${theme}`}>
      <script>{(document.title = "Login")}</script>
      <Box pt={3} pl={3}>
        <PrevButton isSurvey={true} text="Back" link="/" />
        <Grid container className="centerPadding" sx={{ mt: 3 }} gap={2}>
          <Grid item xs={5} px={2}>
            <Card sx={{ px: 1, py: 2, mt: 4 }}>
              <CardContent className="flexColumn center">
                <Typography
                  variant="h5"
                  className="formCardHeader"
                  sx={{ color: colorPalette[theme]["primary"] }}
                >
                  LOGIN
                </Typography>
                <FormControl sx={{ width: "80%", my: 2 }}>
                  <FormGroup>
                    <TextField
                      required
                      error={error.otp}
                      helperText={
                        error.otp ? "Enter your one-time password" : ""
                      }
                      name="otp"
                      label="Enter login code"
                      onChange={handleOnChange}
                    />
                  </FormGroup>
                </FormControl>
                {isValid ? (
                  <Box height="30px"></Box>
                ) : (
                  <Alert severity="error" sx={{ mb: 2, width: "80%" }}>
                    Invalid code
                  </Alert>
                )}
                <Button
                  variant="contained"
                  type="submit"
                  className={`customButton-${theme}`}
                  onClick={handleOnSubmit}
                >
                  Submit
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={5} px={2}>
            <Box className="center">
              <img
                src={require(`../../Assets/Theme/${theme}/login.svg`)}
                style={{ width: "100%" }}
                alt="background"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Login;
