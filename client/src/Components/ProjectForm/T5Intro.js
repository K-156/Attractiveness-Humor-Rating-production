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

import AddableFieldRoles from "../CustomFormFields/AddableFieldRoles";
import AddableNoRangeRoles from "../CustomFormFields/AddableNoRangeRoles";
import "./ProjectForm.css";

const T5Intro = () => {
  const { data, getProject } = useAppContext();
  const createdProjectId = sessionStorage.getItem("createdProjectId");
  const roles = JSON.parse(sessionStorage.getItem("roles"));
  const sectionNum = sessionStorage.getItem("sectionNum");

  useEffect(() => {
    getProject(createdProjectId).then((project) => {
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
    });
  }, []);

  const [formData, setFormData] = useState({});
  const [error, setError] = useState({
    questions: false,
    introductions: false,
  });

  const [qn, setQn] = useState({});
  const [intro, setIntro] = useState({});

  const { submitFormData } = useAppContext();

  useEffect(() => {
    submitFormData(formData);
  }, [formData]);

  return _.map(roles, (aRole) => {
    return (
      <Box sx={{ mb: 3 }}>
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
                    onChange={(event) => {
                      const name = event.target.name;
                      const value = event.target.value;
                      const id = event.target.id;

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
                  <AddableFieldRoles
                    name="questions"
                    items={formData[aRole]?.["questions"]}
                    error={error["questions"]}
                    setError={setError}
                    errorText="Question added"
                    handleOnChange={(event) => {
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

                      if (name === "questions" || name === "introductions") {
                        setError((state) => ({
                          ...state,
                          [name]: false,
                        }));
                      }
                    }}
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
                  <AddableNoRangeRoles
                    items={formData[aRole]?.["introductions"]}
                    error={error["introductions"]}
                    setError={setError}
                    errorText="Introduction added"
                    handleOnChange={(event) => {
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

                      if (name === "questions" || name === "introductions") {
                        setError((state) => ({
                          ...state,
                          [name]: false,
                        }));
                      }
                    }}
                    currValue={intro?.["introductions"]}
                    setFormData={setFormData}
                    variable="introductions"
                    role={aRole}
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
