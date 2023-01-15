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
import UploadFiles from "../CustomFormFields/UploadFiles";
import "./ProjectForm.css";

const T4Audio = () => {
  const { submitFormData, data, isEditing, getProject } = useAppContext();
  const createdProjectId = sessionStorage.getItem("createdProjectId");
  const roles = JSON.parse(sessionStorage.getItem("roles"));
  const sectionNum = sessionStorage.getItem("sectionNum");

  useEffect(() => {
    getProject(createdProjectId).then((project) => {
      const dictionary = {};
      _.map(roles, (aRole) => {
        dictionary[aRole] = project.data[sectionNum]
          ? {
              instruction: project.data[sectionNum][4][aRole].instruction,
              questions: project.data[sectionNum][4][aRole].questions,
              audio: project.data[sectionNum][4][aRole].audio,
              audioLink: project.data[sectionNum][4][aRole].audioLink,
            }
          : {
              instruction: "",
              questions: [],
              audio: [],
              audioLink: [],
            };
      });
      setFormData(dictionary);
    });
  }, []);

  const [formData, setFormData] = useState({});
  const [error, setError] = useState({ questions: false });
  const [qn, setQn] = useState({});
  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setQn((state) => ({
      ...state,
      [name]: value,
    }));
  };

  useEffect(() => {
    submitFormData(formData);
  }, [formData]);

  console.log(formData);

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
                    value={formData[aRole]?.instruction}
                    size="small"
                    name="instruction"
                    fullWidth
                    multiline
                    minRows={3}
                    onChange={(event) => {
                      setFormData((state) => ({
                        ...state,
                        [aRole]: {
                          ...state[aRole],
                          instruction: event.target.value,
                        },
                      }));
                    }}
                  />
                </Box>
              </Box>
              <Box className="twoColumns">
                <Typography className="variable">Questions</Typography>
                <Box className="secondColumn">
                  <AddableFieldRoles
                    items={formData[aRole]?.["questions"]}
                    error={error["questions"]}
                    setError={setError}
                    errorText="Question added"
                    handleOnChange={handleOnChange}
                    currValue={qn}
                    setFormData={setFormData}
                    variable="questions"
                    role={aRole}
                  />
                </Box>
              </Box>
              <Box className="twoColumns">
                <Box>
                  <Typography className="variable">
                    Upload Audio
                    <br />
                  </Typography>
                  <Typography className="variable-subtitle">
                    (in .mp3)
                  </Typography>
                </Box>
                <Box className="secondColumn">
                  <UploadFiles
                    items={formData[aRole]?.["audio"]}
                    setFormData={setFormData}
                    variable="audio"
                    accept=".mp3"
                    audio={true}
                    templateNum={4}
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

export default T4Audio;
