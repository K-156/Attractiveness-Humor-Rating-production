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
import { BsDash } from "react-icons/bs";
import _ from "lodash";
import "./ProjectForm.css";

const T2ProfileRating = ({ role }) => {
  const { submitFormData, data, sectionNum, isEditing } = useAppContext();

  const [formData, setFormData] = useState({
    [role]: {
      instruction: data[sectionNum] ? data[sectionNum]?.[2].instruction : "",
      range: {
        lower: {
          number: data[sectionNum]
            ? data[sectionNum]?.[2].range.lower.number
            : "",
          text: data[sectionNum] ? data[sectionNum]?.[2].range.lower.text : "",
        },
        upper: {
          number: data[sectionNum]
            ? data[sectionNum]?.[2].range.upper.number
            : "",
          text: data[sectionNum] ? data[sectionNum]?.[2].range.upper.text : "",
        },
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
      return;
    }

    const type = name.includes("lower") ? "lower" : "upper";
    setFormData((state) => ({
      ...state,
      [role]:{
        ...state[role],
        range: {
          ...formData[role]["range"],
          [type]: {
            ...formData[role]["range"][type],
            [name.includes("Num") ? "number" : "text"]: value,
          },
        },
      }
    }));
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
              <Typography className="variable">Range</Typography>
              <Box>
                {_.map(["Lower", "Upper"], (type) => {
                  return (
                    <Box className="secondColumn" sx={{ mb: 1 }}>
                      <TextField
                        key={`T2-${type}`}
                        size="small"
                        name={`${type.toLowerCase()}Num`}
                        label={`${type}bound`}
                        width="30px"
                        InputProps={{ inputProps: { min: 1 } }}
                        type="number"
                        onChange={handleOnChange}
                        value={formData[role]["range"][type.toLowerCase()]["number"]}
                        InputLabelProps={{
                          shrink:
                            (isEditing ||
                              formData[role]["range"][type.toLowerCase()][
                                "number"
                              ]) &&
                            true,
                        }}
                      />
                      <BsDash
                        size="40px"
                        style={{ marginLeft: "10px", marginRight: "10px" }}
                      />
                      <TextField
                        key={type}
                        size="small"
                        name={`${type.toLowerCase()}Text`}
                        label="Characteristics"
                        fullWidth
                        onChange={handleOnChange}
                        value={formData[role]["range"][type.toLowerCase()]["text"]}
                        InputLabelProps={{
                          shrink:
                            (isEditing ||
                              formData[role]["range"][type.toLowerCase()]["text"] !==
                                "") &&
                            true,
                        }}
                      />
                    </Box>
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

export default T2ProfileRating;
