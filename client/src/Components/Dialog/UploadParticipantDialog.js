import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import UploadOneFile from "../CustomFormFields/UploadOneFile";
import NextButton from "../NavButton/NextButton";

const UploadParticipantDialog = ({
  open,
  setOpen,
  formData,
  setFormData,
  handleUpload,
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle
        className="center"
        sx={{ fontWeight: "bold", fontSize: "16px" }}
      >
        Add Participants
      </DialogTitle>
      <DialogContent>
        <Box className="twoColumns">
          <Box sx={{ width: "200px" }}>
            <Typography className="variable">
              Upload participant email
            </Typography>
            <Typography className="variable-subtitle">(in .csv)</Typography>
          </Box>
          <UploadOneFile
            formData={formData}
            setFormData={setFormData}
            variable="email"
            accept=".csv"
            style={{ width: "350px" }}
            email={true}
          />
        </Box>
        <Box className="twoColumns">
          <Box sx={{ width: "200px" }}>
            <Typography className="variable">Example of the format</Typography>
            <Typography className="variable-subtitle">(in .csv)</Typography>
          </Box>
          <Box className="secondColumn">
            <img
              src={require("../../Assets/emailExample.PNG")}
              alt="example"
              style={{ width: "230px" }}
            />
          </Box>
        </Box>
        <Box className="spaceBetween" sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            className="customButton-green"
            sx={{
              px: 2,
              color: "#264653",
              borderColor: "#264653",
              textTransform: "none",
            }}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <NextButton
            variant="contained"
            className="customButton-green"
            sx={{ px: 3 }}
            projectType={"emailList"}
            data={formData}
            text={"Save"}
            open={open}
            setOpen={setOpen}
            handleUpload={handleUpload}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UploadParticipantDialog;
