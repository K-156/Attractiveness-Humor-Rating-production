import { useState } from "react";

import { Box, TextField, Typography } from "@mui/material";

import "./ProjectForm.css";
import AddableTwoField from "../CustomFormFields/AddableTwoField";
import UploadOneFile from "../CustomFormFields/UploadOneFile";

const ProfileForm = ({ id, setFormData, formData, templateNum }) => {
  console.log(formData)
  const [error, setError] = useState(false);
  const [textLimit, setTextLimit] = useState({
    optionName: 0,
    description: 0,
  });

  const [attribute, setAttribute] = useState();
  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "optionName" || name === "description") {
      setFormData((state) => ({
        ...state,
        [id]: {
          ...formData[id],
          [name]: value,
        },
      }));

      setTextLimit((state) => ({
        ...state,
        [name]: value.length,
      }));
    } else {
      setAttribute((state) => ({
        ...state,
        [name]: value,
      }));
      setError(false);
    }
  };

  return (
    <Box>
      <Box>
        <Box className="twoColumns">
          <Typography className="variable">Name</Typography>
          <Box className="secondColumn">
            <TextField
              name="optionName"
              size="small"
              fullWidth
              inputProps={{ maxLength: 40 }}
              helperText={`${textLimit["optionName"]} / 40`}
              onChange={handleOnChange}
              value={formData[id].optionName}
            />
          </Box>
        </Box>
        <Box className="twoColumns">
          <Typography className="variable">Description</Typography>
          <Box className="secondColumn">
            <TextField
              name="description"
              size="small"
              fullWidth
              multiline
              minRows={3}
              inputProps={{ maxLength: 200 }}
              helperText={`${textLimit["description"]} / 200`}
              onChange={handleOnChange}
              value={formData[id].description}
            />
          </Box>
        </Box>
        <Box className="twoColumns">
          <Box>
            <Typography className="variable">
              Upload Image
              <br />
            </Typography>
            <Typography className="variable-subtitle">
              (in .jpg, .jpeg, .png)
            </Typography>
          </Box>
          <Box className="secondColumn">
            <UploadOneFile
              id={id}
              setFormData={setFormData}
              formData={formData}
              accept=".png, .jpg, .jpeg"
              templateNum={templateNum}
            />
            
          </Box>
        </Box>
        <Box className="twoColumns">
          <Typography className="variable">Attributes</Typography>
          <Box className="secondColumn">
            <AddableTwoField
              id={id}
              items={formData[id]["attributes"]}
              formData={formData}
              handleOnChange={handleOnChange}
              setFormData={setFormData}
              variable="attributes"
              currValue={attribute}
              error={error}
              setError={setError}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileForm;
