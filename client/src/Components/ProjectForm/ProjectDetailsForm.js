import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";

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
    const id = event.target.id;
    const value = event.target.value;
    
    if (id === "duration") {
      setError((state) => ({
        ...state,
        duration: value < 1 ? true : false,
      }));
    }

    if (id === "roles") {
      setRole(value);
      setError((state) => ({
        ...state,
        roles: false,
      }));
    } else {
      setFormData((state) => ({
        ...state,
        [id]: value,
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
                            value={formData.title}
                            size="small"
                            fullWidth
                            id="title"
                            onChange={handleOnChange}
                        />
                    </Box>
                </Box>
                <Box className="twoColumns">
                    <Box>
                        <Typography className="variable">Upload Participant Email</Typography>
                        <Typography variant="subtitle2" className="variable"><i>(in .csv)</i></Typography>
                    </Box>
                    <UploadFiles 
                        items={formData["email"]}
                        setFormData={setFormData}
                        variable="email"
                        accept=".csv"
                    />
                </Box>
                <Box sx={{display:"flex", m:"15px"}}>
                    <Box>
                        <Typography className="variable">Example of the format</Typography>
                        <Typography variant="subtitle2" className="variable"><i>(in .csv)</i></Typography>
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
                    <Typography className="variable">Time Duration (in mins)</Typography>
                    <Box className="secondColumn">
                        <TextField 
                            value={formData.duration}
                            size="small"
                            fullWidth
                            id="duration"
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
