import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";

import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { colorPalette } from "../../Utils/colorPalette";
import Loading from "../../Components/LoadingAnimation/LoadingAnimation";
import links from "../../Utils/links";

const Details = () => {
  const navigate = useNavigate();
  const { updateUser, user, getProject, theme, activeProjectId, isLoading, nextSection, sectionNum } =
    useAppContext();



  const detailList = ["Sex", "Age", "Ethnicity"];
  
  const { data } = JSON.parse(localStorage.getItem("data"));

  const { path } = links.find((link) => link.id == Object.keys(data[sectionNum])[0]);

  const [formData, setFormData] = useState({
    sex: "",
    age: "",
    ethnicity: "",
  });
  const [toSubmit, setToSubmit] = useState(false);
  const [ageError, setAgeError] = useState(false);

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
    navigate(path);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={`backgroundImage-${theme} center`}>
      <script>{(document.title = "Personal Details")}</script>
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
    </div>
  );
};

export default Details;
