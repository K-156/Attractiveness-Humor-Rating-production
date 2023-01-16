import { useState } from "react"
import { Link } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  FormControl,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";

import { templates } from "../../Utils/templateList";
import "./ProjectForm.css";
import ReorderList from "../ReorderList/ReorderList";

const AddSection = ({ formData, setFormData }) => {

  const [error, setError] = useState({
    profile: false, rank: false
  })

  const onDelete = (index) => {

    const value = formData[index];  
    if (value === 1 || value === 3) {
      const findNext = formData.indexOf(value, index + 1) 
      const valueList = value === 1 ? [2,3,4,5,6] : [4,5,6];
      const nextValue = formData.slice(index + 1, findNext === -1 ? formData.length : findNext);
      const filteredArray = nextValue.filter(value => valueList.includes(value));
      const beforeValues = formData.slice(0, index)
      if (filteredArray.length > 0 && !beforeValues.includes(value)) {
        setError({profile: value === 1, rank: value === 3 });
            return;
      }
    }
   
    if (index === 0) {
      formData.shift();
    } else {
      formData.splice(index, 1);
    }
    setFormData([...formData]);
    setError({rank: false, profile: false});
  };

  const handleAddSection = (event) => {
    const value = event.target.value;
    if (value >= 2 && value <= 6 && !formData.includes(1)) {
      setError({profile: true, rank: false})
    } else if (value >= 4 && value <= 6 && !formData.includes(3)) {
      setError({profile:false, rank: true})
    } else {
      setError({profile: false, rank: false})
      setFormData(formData.concat(Number(value)));
    }   
  }

  return (
    <Card>
      <CardContent sx={{ p: 2, pl: 10 }}>
        <FormControl>
          <Box className="twoColumns">
            <Typography className="variable flexColumn">
              Sections
              <Link
                className="projectLink"
                to="/projects/samples/templates"
              >
                <i>View Templates</i>
              </Link>
            </Typography>
            <Box
              sx={{ 
                display: "flex", 
                flexDirection: "column", 
                width: "400px" 
              }}
            >
              <TextField
                size="small"
                fullWidth
                select
                id="sections"
                label="Select template"
                value=""
                InputLabelProps={{shrink:false}}
                onChange={handleAddSection}
              >
                {_.map(templates, (value, key) => {
                  return (
                    <MenuItem 
                      key={key} 
                      id={key} 
                      value={key}
                    >
                      {value}
                    </MenuItem>
                  );
                })}
              </TextField>
              <ReorderList 
                formData={formData}
                setFormData={setFormData}
                onDelete={onDelete}
                error={error}
                setError={setError}
              />
            </Box>
          </Box>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default AddSection;
