import { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";

import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";
import Loading from "../../Components/LoadingAnimation/LoadingAnimation";

import "./ProjectForm.css";

const T7General = () => {
  const { submitFormData, getProject } = useAppContext();
  const projId = sessionStorage.getItem("projId");
  const sectionNum = sessionStorage.getItem("sectionNum");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getProject(projId).then((proj) => {
      const { data } = proj;
      setFormData({
        text: data[sectionNum] ? data[sectionNum][7]?.text : "",
        isEnd: data[sectionNum] ? data[sectionNum][7]?.isEnd : true,
      });
      setIsLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  const [formData, setFormData] = useState({});

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "text") {
      setFormData((state) => ({
        ...state,
        [name]: value,
      }));
    } else {
      setFormData((state) => ({
        ...state,
        [name]: value === "Yes",
      }));
    }
  };

  useEffect(() => {
    submitFormData(formData);
    // eslint-disable-next-line
  }, [formData]);

  if (isLoading) {
    return (
      <div className={`background-blue center`}>
        <Loading />
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="cardPadding">
        <FormControl>
          <Box className="twoColumns">
            <Typography className="variable">Text</Typography>
            <Box className="secondColumn">
              <TextField
                size="small"
                name="text"
                fullWidth
                multiline
                minRows={3}
                onChange={handleOnChange}
                value={formData.text}
              />
            </Box>
          </Box>

          <Box className="twoColumns">
            <Typography className="variable" sx={{ pt: "9px" }}>
              Is this the end of the survey?
            </Typography>
            <RadioGroup
              row
              className="secondColumn"
              sx={{ justifyContent: "space-around" }}
              value={formData.isEnd ? "Yes" : "No"}
            >
              {_.map(["Yes", "No"], (option) => {
                return (
                  <FormControlLabel
                    key={option}
                    name="isEnd"
                    value={option}
                    control={<Radio size="small" />}
                    label={option}
                    labelPlacement="start"
                    sx={{ ".MuiFormControlLabel-label": { fontSize: "14px" } }}
                    onChange={handleOnChange}
                  />
                );
              })}
            </RadioGroup>
          </Box>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default T7General;
