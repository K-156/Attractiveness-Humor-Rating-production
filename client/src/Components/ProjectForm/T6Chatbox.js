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

import "./ProjectForm.css";
import AddableNoRangeRoles from "../CustomFormFields/AddableNoRangeRoles";

const T6Chatbox = ({ role }) => {
  const { submitFormData, data, sectionNum } = useAppContext();

  const [formData, setFormData] = useState({
    [role]: {
      instruction: data[sectionNum] ? data[sectionNum][6].instruction : "",
      messages: data[sectionNum] ? data[sectionNum][6].messages : [],
    },
  });
  const [error, setError] = useState({
    messages: false,
  });

  const [messages, setMessages] = useState({});

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "instruction") {
      setFormData((state) => ({
        ...state,
        [role]: {
          ...state[role],
          instruction: value,
        },
      }));
    } else {
      setMessages(value);
      setError({
        messages: false,
      });
    }
  };

  useEffect(() => {
    submitFormData(formData);
  }, [formData]);

  return (
    <Box sx={{ mb: 3 }}>
      <Typography sx={{ color: "#264653" }}>
        Role: <b>{role}</b>
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
                  onChange={handleOnChange}
                  value={formData[role].instruction}
                />
              </Box>
            </Box>
            <Box className="twoColumns">
              <Typography className="variable">Questions</Typography>
              <Box className="secondColumn">
                <AddableNoRangeRoles
                  items={formData[role]["messages"]}
                  error={error["messages"]}
                  setError={setError}
                  errorText="Message added"
                  handleOnChange={handleOnChange}
                  currValue={messages}
                  setFormData={setFormData}
                  variable="messages"
                  role={role}
                />
              </Box>
            </Box>
          </FormControl>
        </CardContent>
      </Card>
    </Box>
  );
};

export default T6Chatbox;
