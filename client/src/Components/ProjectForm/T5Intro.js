import { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import _ from "lodash";

import {
  Box,
  Card,
  CardContent,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import Loading from "../../Components/LoadingAnimation/LoadingAnimation";

import AddableFields from "../CustomFormFields/AddableFields";
import AddableNoRange from "../CustomFormFields/AddableNoRange";
import "./ProjectForm.css";

const T5Intro = ({ roles }) => {
  const { getProject, submitFormData } = useAppContext();
  const projId = sessionStorage.getItem("projId");
  const sectionNum = sessionStorage.getItem("sectionNum");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getProject(projId).then((project) => {
      const dictionary = {};
      _.map(roles, (aRole) => {
        dictionary[aRole] = project.data[sectionNum]
          ? {
              instruction: project.data[sectionNum][5][aRole].instruction,
              questions: project.data[sectionNum][5][aRole].questions,
              introductions: project.data[sectionNum][5][aRole].introductions,
            }
          : {
              instruction: "",
              questions: [],
              introductions: [],
            };
      });
      setFormData(dictionary);
      setIsLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  const [formData, setFormData] = useState({});
  const [qn, setQn] = useState({});
  const [intro, setIntro] = useState({});
  const [error, setError] = useState({
    questions: false,
    introductions: false,
  });

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const id = event.target.id;
    if (id === "questions") {
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

    setError((state) => ({
      ...state,
      [name]: false,
    }));
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

  return _.map(roles, (aRole) => {
    return (
      <Box key={aRole} sx={{ mb: 3 }}>
        <Typography sx={{ color: "#264653" }}>
          Role: <b>{aRole}</b>
        </Typography>
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
                    maxRows={5}
                    onChange={(event) => {
                      const value = event.target.value;
                      setFormData((state) => ({
                        ...state,
                        [aRole]: {
                          ...state[aRole],
                          instruction: value,
                        },
                      }));
                    }}
                    value={formData[aRole]?.instruction}
                  />
                </Box>
              </Box>
              <Box className="twoColumns">
                <Typography className="variable">Questions</Typography>
                <Box className="secondColumn">
                  <AddableFields
                    name="questions"
                    items={formData[aRole]?.["questions"]}
                    error={error["questions"]}
                    setError={setError}
                    errorText="Question added"
                    currValue={qn}
                    setFormData={setFormData}
                    variable="questions"
                    role={aRole}
                  />
                </Box>
              </Box>
              <Box className="twoColumns">
                <Box>
                  <Typography className="variable">Introductions</Typography>
                </Box>
                <Box className="secondColumn">
                  <AddableNoRange
                    items={formData[aRole]?.["introductions"]}
                    error={error["introductions"]}
                    setError={setError}
                    errorText="Introduction added"
                    handleOnChange={handleOnChange}
                    currValue={intro?.["introductions"]}
                    setFormData={setFormData}
                    variable="introductions"
                    role={aRole}
                    setIntro={setIntro}
                  />
                </Box>
              </Box>
            </FormControl>
          </CardContent>
        </Card>
      </Box>
    );
  });
};

export default T5Intro;
