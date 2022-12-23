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

  const { submitFormData } = useAppContext();

  const [formData, setFormData] = useState({
    instruction: "",
    range: {
      lower: {number: 1, text:""},
      upper: {number: 1, text:""},
    }
  });

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "instruction") {
      setFormData((state) => ({
        ...state,
        instruction: value
      }))
      return
    } 

    const type = name.includes("lower") ? "lower" : "upper";
    setFormData((state) => ({
      ...state,
      range: {
        ...formData["range"],
        [type]: {
          ...formData["range"][type],
          [name.includes("Num") ? "number" : "text"]: value
        }
      }
    }))
  }

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
                  />
              </Box>
          </Box>
          <Box className="twoColumns">
              <Typography className="variable">Range</Typography>
              <Box> 
                {_.map(["Lower", "Upper"], (type) => {
                  return (
                    <Box className="secondColumn" sx={{mb: 1}}>
                      <TextField
                          size="small" 
                          name={`${type.toLowerCase()}Num`}
                          label={`${type}bound`}
                          width="30px"
                          InputProps={{ inputProps: { min: 1}}}
                          type="number"
                          onChange={handleOnChange}
                      />
                      <BsDash 
                        size="40px" 
                        style={{marginLeft:"10px", marginRight:"10px"}}
                      />
                      <TextField
                          size="small" 
                          name={`${type.toLowerCase()}Text`}
                          label="Characteristics"
                          fullWidth
                          onChange={handleOnChange}
                      />
                  </Box>
                  )})
                }              
              </Box>
          </Box>
        </FormControl>
        </CardContent>
    </Card>
  );
};

export default T2ProfileRating;
