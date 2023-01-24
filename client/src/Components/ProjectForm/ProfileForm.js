
import { Box, TextField, Typography } from "@mui/material";

import "./ProjectForm.css";
import AddableTwoFields from "../CustomFormFields/AddableTwoFields";
import UploadOneFile from "../CustomFormFields/UploadOneFile";

const ProfileForm = ({
  id,
  gender,
  role,
  setFormData,
  formData,
  templateNum,
  sectionNum,
}) => {
  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((state) => ({
      ...state,
      [role]: {
        ...state[role],
        [gender]: {
          ...state[role][gender],
          [id]: {
            ...state[role][gender][id],
            [name]: value,
          },
        },
      },
    }));
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
              helperText={`${
                formData[role][gender][id]
                  ? formData[role][gender][id].optionName.length
                  : 0
              } / 40`}
              onChange={handleOnChange}
              value={
                formData[role][gender][id]
                  ? formData[role][gender][id].optionName
                  : ""
              }
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
              helperText={`${
                formData[role][gender][id]
                  ? formData[role][gender][id].description.length
                  : 0
              } / 200`}
              onChange={handleOnChange}
              value={
                formData[role][gender][id]
                  ? formData[role][gender][id].description
                  : ""
              }
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
              sectionNum={sectionNum}
            />
          </Box>
        </Box>
        <Box className="twoColumns">
          <Typography className="variable">Attributes</Typography>
          <Box className="secondColumn">
            <AddableTwoFields
              id={id}
              items={
                formData[role][gender][id]
                  ? formData[role][gender][id].attributes
                  : []
              }
              formData={formData}
              setFormData={setFormData}
              variable="attributes"
              role={role}
              gender={gender}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileForm;
