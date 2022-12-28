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

const T2ProfileRating = () => {
  const { submitFormData, data, sectionNum, isEditing } = useAppContext();
  console.log(data[0][2]);

  const [formData, setFormData] = useState({
    instruction: isEditing ? data[sectionNum][2].instruction : "",
    range: {
      lower: {
        number: isEditing ? data[sectionNum][2].range.lower.number : 1,
        text: isEditing ? data[sectionNum][2].range.lower.text : "",
      },
      upper: {
        number: isEditing ? data[sectionNum][2].range.upper.number : 1,
        text: isEditing ? data[sectionNum][2].range.upper.text : "",
      },
    },
  });

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "instruction") {
      setFormData((state) => ({
        ...state,
        instruction: value,
      }));
      return;
    }

    const type = name.includes("lower") ? "lower" : "upper";
    setFormData((state) => ({
      ...state,
      range: {
        ...formData["range"],
        [type]: {
          ...formData["range"][type],
          [name.includes("Num") ? "number" : "text"]: value,
        },
      },
    }));
  };

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
            <Typography className="variable">Range</Typography>
            <Box>
              {_.map(["Lower", "Upper"], (type) => {
                return (
                  <Box className="secondColumn" sx={{ mb: 1 }}>
                    <TextField
                      size="small"
                      name={`${type.toLowerCase()}Num`}
                      label={`${type}bound`}
                      width="30px"
                      InputProps={{ inputProps: { min: 1 } }}
                      type="number"
                      onChange={handleOnChange}
                      value={
                        isEditing &&
                        formData["range"][type.toLowerCase()]["number"]
                      }
                      InputLabelProps={{ shrink: isEditing && true }}
                    />
                    <BsDash
                      size="40px"
                      style={{ marginLeft: "10px", marginRight: "10px" }}
                    />
                    <TextField
                      size="small"
                      name={`${type.toLowerCase()}Text`}
                      label="Characteristics"
                      fullWidth
                      onChange={handleOnChange}
                      value={
                        isEditing &&
                        formData["range"][type.toLowerCase()]["text"]
                      }
                      InputLabelProps={{ shrink: isEditing && true }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default T2ProfileRating;
