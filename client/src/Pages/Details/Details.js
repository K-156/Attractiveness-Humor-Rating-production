import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";

import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormGroup,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";
import axios from "axios";

import { colorPalette } from "../../Utils/colorPalette";
import Loading from "../../Components/LoadingAnimation/LoadingAnimation";
import links from "../../Utils/links";

const Details = () => {
  const navigate = useNavigate();
  const {
    updateUser,
    user,
    theme,
    activeProjectId,
    setActiveProject,
    getProject,
    sections,
  } = useAppContext();

  const detailList = ["Sex", "Age", "Ethnicity"];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setActiveProject();
    if (activeProjectId !== "") {
      getProject(activeProjectId).then(() => {
        setIsLoading(false);
      });
    }
    // eslint-disable-next-line
  }, [activeProjectId]);

  const [formData, setFormData] = useState({
    sex: "",
    age: "",
    ethnicity: "",
    IPAddress: null,
    start: null,
  });

  const [toSubmit, setToSubmit] = useState(false);
  const [ageError, setAgeError] = useState(false);

  useEffect(() => {
    getIPStartTime();
  }, []);

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "age" && parseInt(value) < 1) {
      setAgeError(true);
      return;
    } else {
      setAgeError(false);
    }

    setFormData((state) => ({
      ...state,
      [name]: value,
    }));

    if (!Object.values(formData).includes("")) {
      setToSubmit(true);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    updateUser({ currentUser: { ...user, formData }, id: user._id });
    updateUser({
      currentUser: { ...user, surveyRole: localStorage.getItem("role") },
      id: user._id,
    }).then(() => {
      localStorage.removeItem("role");
    });
    localStorage.setItem("sectionNum", 0);
    navigate(links.find((link) => link.id === sections[0]).path);
  };

  const getIPStartTime = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    const currentTime = new Date();
    setFormData((state) => ({
      ...state,
      IPAddress: res.data.IPv4,
      start: currentTime.toISOString(),
    }));
  };

  return (
    <div className={`backgroundImage-${theme} center`}>
      <script>{(document.title = "Personal Details")}</script>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Card
            className="absoluteCenter"
            sx={{
              px: 1,
              py: 2,
              width: "500px",
            }}
          >
            <CardContent className="flexColumn center">
              <Typography
                variant="h5"
                className="formCardHeader"
                sx={{ color: colorPalette[theme]["primary"] }}
              >
                Fill in your details
              </Typography>
              <FormControl sx={{ width: "80%", my: 2 }}>
                <FormGroup>
                  {_.map(detailList, (detail) => {
                    if (detail === "Sex") {
                      return (
                        <TextField
                          select
                          required
                          key={detail}
                          name="sex"
                          label="Sex"
                          value={formData.sex}
                          onChange={handleOnChange}
                          sx={{ my: 1 }}
                        >
                          <MenuItem id="female" value="female">
                            Female
                          </MenuItem>
                          <MenuItem id="male" value="male">
                            Male
                          </MenuItem>
                        </TextField>
                      );
                    }
                    return (
                      <TextField
                        required
                        key={detail}
                        name={detail.toLowerCase()}
                        label={detail}
                        type={detail === "Age" ? "number" : "text"}
                        sx={{ my: 1 }}
                        InputProps={{ inputProps: { min: 1 } }}
                        onChange={handleOnChange}
                        error={detail === "Age" ? ageError : false}
                        helperText={
                          detail === "Age" && ageError
                            ? "Age must be at least 1"
                            : ""
                        }
                      />
                    );
                  })}
                </FormGroup>
              </FormControl>
              <Button
                disabled={!toSubmit}
                type="submit"
                variant="contained"
                className={`customButton-${theme}`}
                sx={{
                  width: "80%",
                  mt: 2,
                }}
                onClick={handleOnSubmit}
              >
                Submit
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Details;
