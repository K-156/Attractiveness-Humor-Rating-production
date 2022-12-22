import { useState } from "react";
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

import "./ProjectForm.css";
import AddableField from "../CustomFormFields/AddableField";
import UploadFiles from "../CustomFormFields/UploadFiles";

const ProjectDetailsForm = ({ formData, setFormData }) => {

  const [role, setRole] = useState();
  const [error, setError] = useState({
    title: false,
    email: false,
    roles: false,
    duration: false,
  });

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    
    if (name === "duration") {
      setError((state) => ({
        ...state,
        duration: value < 1 ? true : false,
      }));
    }

    if (name === "roles") {
      setRole(value);
      setError((state) => ({
        ...state,
        roles: false,
      }));
    } else {
      setFormData((state) => ({
        ...state,
        [name]: value,
      }));
    }
  }

    return(
        <Card>
            <CardContent sx={{p:2, pl: 10}}>
            <FormControl>
                <Box className="twoColumns">
                    <Typography className="variable">Project title</Typography>
                    <Box className="secondColumn">
                        <TextField 
                            value={formData.title ? formData.title : ""}
                            size="small"
                            fullWidth
                            name="title"
                            onChange={handleOnChange}
                        />
                    </Box>
                </Box>
                <Box className="twoColumns">
                  <Box>
                    <Typography className="variable flexColumn">
                        Theme
                        <Link
                          className="projectLink"
                          to="/projects/samples/themes"
                        >
                          <i>View themes</i>
                        </Link>
                    </Typography>
                  </Box>
                  <Box className="secondColumn">
                    <TextField
                        size="small"
                        fullWidth
                        select
                        name="theme"
                        label="Select theme"
                        defaultValue="green"
                        onChange={handleOnChange}
                      >
                        {_.map(["Blue", "Brown", "Green", "Pink", "Yellow"], (value) => {
                          return (
                            <MenuItem 
                              key={value} 
                              id={value.toLowerCase()} 
                              value={value.toLowerCase()}
                            >
                              {value}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                  </Box>
              </Box>
              <Box className="twoColumns">
                  <Box>
                      <Typography className="variable">Upload Participant Email</Typography>
                      <Typography className="variable-subtitle">(in .csv)</Typography>
                  </Box>
                  <UploadFiles 
                      items={formData["email"]}
                      setFormData={setFormData}
                      variable="email"
                      accept=".csv"
                  />
              </Box>
              <Box className="twoColumns">
                  <Box>
                      <Typography className="variable">Example of the format</Typography>
                      <Typography className="variable-subtitle">(in .csv)</Typography>
                  </Box>
                  <Box className="secondColumn">
                      <img 
                          src={require("../../Assets/emailExample.PNG")}
                          alt="example"
                          style={{width:"300px"}}
                      />  
                  </Box>
              </Box>
              <Box className="twoColumns">
                  <Typography className="variable">Roles</Typography>
                  <AddableField 
                      items={formData["roles"]} 
                      error={error["roles"]}
                      setError={setError}
                      errorText="Role added"
                      handleOnChange={handleOnChange}
                      currValue={role}
                      setFormData={setFormData}
                      variable="roles"
                  />
                  
              </Box>
              <Box className="twoColumns">
                  <Box>
                    <Typography className="variable">Time Duration</Typography>
                    <Typography className="variable-subtitle">(in mins)</Typography>
                  </Box>
                  <Box className="secondColumn">
                      <TextField 
                          value={formData.duration}
                          size="small"
                          fullWidth
                          name="duration"
                          type="number"
                          InputProps={{ inputProps: { min: 1 } }}
                          onChange={handleOnChange}
                          error={error["duration"]}
                          helperText={error["duration"] ? "Must be at least 1" : ""}
                      />
                  </Box>
              </Box>
            </FormControl>
            </CardContent>
        </Card>
    )
}

export default ProjectDetailsForm;
