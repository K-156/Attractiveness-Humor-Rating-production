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

import "./ProjectForm.css";
import AddableNoRange from "../CustomFormFields/AddableNoRange";

const T6Chatbox = ({ roles }) => {
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
              instruction: project.data[sectionNum][6][aRole]?.instruction,
              messages: project.data[sectionNum][6][aRole]?.messages,
            }
          : {
              instruction: "",
              messages: [],
            };
      });
      setFormData(data);
      setIsLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  const [formData, setFormData] = useState({});
  const [error, setError] = useState({
    messages: false,
  });

  const [messages, setMessages] = useState({});

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
                <Typography className="variable">Messages</Typography>
                <Box className="secondColumn">
                  <AddableNoRange
                    items={formData[aRole]?.["messages"]}
                    error={error["messages"]}
                    setError={setError}
                    errorText="Message added"
                    handleOnChange={(event) => {
                      const value = event.target.value;
                      setMessages(value);
                      setError({
                        messages: false,
                      });
                    }}
                    currValue={messages}
                    setFormData={setFormData}
                    variable="messages"
                    role={aRole}
                    setMessages={setMessages}
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

export default T6Chatbox;
