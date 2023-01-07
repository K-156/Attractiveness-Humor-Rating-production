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

import "./ProjectForm.css";

const T3Rank = ({ role }) => {
  const { submitFormData, data, sectionNum, isEditing } = useAppContext();

  const [expanded, setExpanded] = useState({
    instruction: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });

  const [formData, setFormData] = useState({
    [role]: {
      instruction: data[sectionNum] ? data[sectionNum]?.[3].instruction : "",
      characteristics: {
        lowerbound: data[sectionNum]
          ? data[sectionNum]?.[3].characteristics.lowerbound
          : "",
        upperbound: data[sectionNum]
          ? data[sectionNum]?.[3].characteristics.upperbound
          : "",
      },
    },
  });

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "instruction") {
      setFormData((state) => ({
        ...state,
        [role]:{
          ...state[role],
          instruction: value,
        }
      }));
    } else {
      setFormData((state) => ({
        ...state,
        [role]: {
          ...state[role],
          characteristics: {
            ...formData[role]["characteristics"],
            [name]: value,
          },
        },
      }));
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
              <Typography className="variable">Characteristics</Typography>
              <Box
                className="secondColumn"
                sx={{ justifyContent: "space-between" }}
              >
                {_.map(["Lowerbound", "Upperbound"], (type) => {
                  return (
                    <TextField
                      key={type}
                      size="small"
                      name={type.toLowerCase()}
                      label={type}
                      onChange={handleOnChange}
                      sx={{ width: "180px" }}
                      value={
                        formData[role]["characteristics"][type.toLowerCase()]
                      }
                      InputLabelProps={{
                        shrink:
                          (isEditing ||
                            formData[role]["characteristics"][
                              type.toLowerCase()
                            ] !== "") &&
                          true,
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          </FormControl>
        </CardContent>
      </Card>
    </Box>
  );
};

export default T3Rank;
