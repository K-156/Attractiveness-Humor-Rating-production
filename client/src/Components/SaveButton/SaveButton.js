import { Box, Button } from "@mui/material";

const SaveButton = ({ projectType, formData, templateNum }) => {
  const handleSubmit = (formData) => {
    if (projectType === "projData") {
      let data = JSON.parse(localStorage.getItem("projData"))
        ? JSON.parse(localStorage.getItem("projData"))
        : [];
      let dict = {};
      dict[templateNum] = formData;
      data.push(dict);
      localStorage.setItem(projectType, JSON.stringify(data));
    } else {
      localStorage.setItem(projectType, JSON.stringify(formData));
    }
  };
  return (
    <Box sx={{ my: 2, display: "flex", justifyContent: "flex-end" }}>
      <Button
        variant="contained"
        className="customButton"
        onClick={() => {
          handleSubmit(formData);
        }}
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default SaveButton;
