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

import "./ProjectForm.css";
import AddableNoRangeRoles from "../CustomFormFields/AddableNoRangeRoles";

const T6Chatbox = ({ roles }) => {
  const { submitFormData, data, sectionNum } = useAppContext();

  const dictionary = {};

  _.map(roles, (aRole) => {
    dictionary[aRole] = data[sectionNum]
      ? {
          instruction: data[sectionNum][6][aRole].instruction,
          messages: data[sectionNum][6][aRole].messages ,
        }
      : {
          instruction:  "",
          messages:  [],
        };
  });

  const [formData, setFormData] = useState(dictionary);
  const [error, setError] = useState({
    messages: false,
  });

  const [messages, setMessages] = useState({});

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
                    value={formData[aRole].instruction}
                  />
                </Box>
              </Box>
              <Box className="twoColumns">
                <Typography className="variable">Questions</Typography>
                <Box className="secondColumn">
                  <AddableNoRangeRoles
                    items={formData[aRole]["messages"]}
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
