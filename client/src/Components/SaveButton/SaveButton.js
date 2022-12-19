import { Box, Button } from "@mui/material";

const SaveButton = ({ projectType, formData, templateNum }) => {
  const handleSubmit = (formData) => {
    if (projectType === "projData") {
      let data = JSON.parse(localStorage.getItem("projData"))
        ? JSON.parse(localStorage.getItem("projData"))
        : [];
      data.push({ key: templateNum, value: formData });
      localStorage.setItem(projectType, JSON.stringify(data));
    }
  };
  return (
    <Box sx={{ my: 2, display: "flex", justifyContent: "flex-end" }}>
      <Button
        variant="contained"
        sx={{
          background: "#264653",
          "&:hover": { backgroundColor: "#C59D5F" },
          textTransform: "none",
        }}
        onClick={() => {
          //   localStorage.setItem(projectType, JSON.stringify(formData));
          handleSubmit(formData);
        }}
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default SaveButton;
