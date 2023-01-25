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
import _ from "lodash";
import Loading from "../../Components/LoadingAnimation/LoadingAnimation";

import AddableField from "../CustomFormFields/AddableFields";
import UploadFiles from "../CustomFormFields/UploadFiles";
import "./ProjectForm.css";

const T4Audio = ({ roles }) => {
  const { submitFormData, getProject } = useAppContext();
  const projId = sessionStorage.getItem("projId");
  const sectionNum = sessionStorage.getItem("sectionNum");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getProject(projId).then((project) => {
      const data = {};
      _.map(roles, (aRole) => {
        data[aRole] = project.data[sectionNum]
          ? {
              instruction: project.data[sectionNum][4][aRole].instruction,
              ratingInstruction:
                project.data[sectionNum][4][aRole].ratingInstruction,
              questions: project.data[sectionNum][4][aRole].questions,
              audio: project.data[sectionNum][4][aRole].audio,
              audioLink: project.data[sectionNum][4][aRole].audioLink,
            }
          : {
              instruction: "",
              ratingInstruction: "",
              questions: [],
              audio: [],
              audioLink: [],
            };
      });
      setFormData(data);
      setIsLoading(false);
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
                    value={formData[aRole]?.instruction}
                    size="small"
                    name="instruction"
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
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
                <Typography className="variable">Rating Instruction</Typography>
                <Box className="secondColumn">
                  <TextField
                    value={formData[aRole]?.ratingInstruction}
                    size="small"
                    name="ratingInstruction"
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    onChange={(event) => {
                      setFormData((state) => ({
                        ...state,
                        [aRole]: {
                          ...state[aRole],
                          ratingInstruction: event.target.value,
                        },
                      }));
                    }}
                  />
                </Box>
              </Box>
              <Box className="twoColumns">
                <Typography className="variable">Questions</Typography>
                <Box className="secondColumn">
                  <AddableField
                    items={formData[aRole]?.["questions"]}
                    error={error["questions"]}
                    setError={setError}
                    errorText="Question added"
                    handleOnChange={handleOnChange}
                    currValue={qn}
                    setFormData={setFormData}
                    variable="questions"
                    role={aRole}
                    setQn={setQn}
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
                    sectionNum={sectionNum}
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
