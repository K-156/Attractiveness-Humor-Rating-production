import { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";

import {
  Box,
  Card,
  CardContent,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";

import AddableField from "../CustomFormFields/AddableField";
import AddableNoRange from "../CustomFormFields/AddableNoRange";
import "./ProjectForm.css";

const T5Intro = () => {
  const { data, sectionNum, isEditing } = useAppContext();
  const [formData, setFormData] = useState({
    instruction: data[sectionNum] ? data[sectionNum][5].instruction : "",
    questions: data[sectionNum] ? data[sectionNum][5].questions : [],
    introductions: data[sectionNum] ? data[sectionNum][5].introductions : [],
  });
  const [error, setError] = useState({
    questions: false,
    introductions: false,
  });

  console.log(formData);

  const [qn, setQn] = useState({});
  const [intro, setIntro] = useState({});

  const [currValue, setCurrValue] = useState({
    questions: {},
    introductions: {},
  });

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const id = event.target.id;

    if (name === "instruction") {
      setFormData((state) => ({
        ...state,
        instruction: value,
      }));
    } else if (id === "questions") {
      setQn((state) => ({
        ...state,
        [name]: value,
      }));
    } else {
      setIntro((state) => ({
        ...state,
        [name]: value,
      }));
    }

    if (name === "questions" || name === "introductions") {
      setError((state) => ({
        ...state,
        [name]: false,
      }));
    }
  };

  const { submitFormData } = useAppContext();

  useEffect(() => {
    submitFormData(formData);
  }, [formData]);

  return (
    <Card>
      <CardContent className="cardPadding">
        <FormControl>
          <Box className="twoColumns">
            <Typography className="variable">Instruction</Typography>
            <Box className="secondColumn">
              <TextField
                size="small"
                name="instruction"
                fullWidth
                multiline
                minRows={3}
                onChange={handleOnChange}
                value={formData.instruction}
              />
            </Box>
          </Box>
          <Box className="twoColumns">
            <Typography className="variable">Questions</Typography>
            <Box className="secondColumn">
              <AddableField
                name="questions"
                items={formData["questions"]}
                error={error["questions"]}
                setError={setError}
                errorText="Question added"
                handleOnChange={handleOnChange}
                currValue={qn}
                setFormData={setFormData}
                variable="questions"
              />
            </Box>
          </Box>
          <Box className="twoColumns">
            <Box>
              <Typography className="variable">Introductions</Typography>
            </Box>
            <Box className="secondColumn">
              <AddableNoRange
                items={formData["introductions"]}
                error={error["introductions"]}
                setError={setError}
                errorText="Introduction added"
                handleOnChange={handleOnChange}
                currValue={intro["introductions"]}
                setFormData={setFormData}
                variable="introductions"
              />
            </Box>
          </Box>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default T5Intro;
