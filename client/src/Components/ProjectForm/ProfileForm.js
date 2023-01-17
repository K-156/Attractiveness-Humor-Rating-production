import { useState } from "react";

import { Box, TextField, Typography } from "@mui/material";

import "./ProjectForm.css";
import AddableTwoFieldRoles from "../CustomFormFields/AddableTwoFieldRoles";
import UploadOneFile from "../CustomFormFields/UploadOneFile";

const ProfileFormCopy = ({ id, gender, role, setFormData, formData, templateNum }) => {
  // console.log(id, role)
  // console.log(formData[role][id])

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
        [role]: {
          ...state[role],
          [gender]: {
            ...state[role][gender], 
            [id]: {
              ...formData[role][gender][id],
              [name]: value,
            },
          }
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
              value={formData[role][gender][id] ? formData[role][gender][id].optionName : ""}
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
              value={formData[role][gender][id] ? formData[role][gender][id].description : ""}
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
              role={role}
              gender={gender}
            />
          </Box>
        </Box>
        <Box className="twoColumns">
          <Typography className="variable">Attributes</Typography>
          <Box className="secondColumn">
            <AddableTwoFieldRoles
              id={id}
              items={formData[role][gender][id] ? formData[role][gender][id].attributes : []}
              formData={formData}
              handleOnChange={handleOnChange}
              setFormData={setFormData}
              variable="attributes"
              currValue={attribute}
              error={error}
              setError={setError}
              role={role}
              gender={gender}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileFormCopy;
