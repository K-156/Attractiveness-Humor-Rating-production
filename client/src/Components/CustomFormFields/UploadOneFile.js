import { useState } from "react";
import { useAppContext } from "../../Context/AppContext";

import { Alert, AlertTitle, Box, Button, Typography } from "@mui/material";
import { MdFileUpload } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";


const UploadOneFile = ({
  id,
  setFormData,
  formData,
  accept,
  templateNum,
}) => {
  const {
    uploadFiles,
    isEditing,
    createdProjectId,
    editProjectId,
    sectionNum,
    isLoading
  } = useAppContext();

  const [error, setError] = useState(false);
  let fileLink = "";

  console.log(isLoading)

  const uploadFile = async (event) => {
    if (event.target.files !== undefined) {
      if (formData[id]["img"] !== null) {
        setError(true);
        return;
      }

      fileLink = await uploadFiles(
        isEditing
          ? `${editProjectId}_${sectionNum}_${templateNum}_${id}`
          : `${createdProjectId}_${sectionNum}_${templateNum}_${id}`,
        event.target.files[0]
      );

      setFormData((state) => ({
        ...state,
        [id]: {
          ...formData[id],
          img: event.target.files[0].name,
          link: fileLink,
        },
      }));
    }
  };

  const onDelete = () => {
    setError(false);
    setFormData((state) => ({
      ...state,
      [id]: {
        ...formData[id],
        img: null,
        link: null,
      },
    }));
  };

  return (
    <Box className="flexColumn">
      <Box className="secondColumn">
        <Button
          variant="contained"
          className="customButton-green"
          component="label"
        >
          <MdFileUpload size={20} style={{ marginRight: 5 }} />
          Choose a file to upload
          <input type="file" accept={accept} hidden onChange={uploadFile} />
        </Button>
        {isLoading && <LoadingAnimation size="1rem" marginLeft={"1rem"}/>}
      </Box>
      {error && (
        <Alert severity="error">
          <AlertTitle sx={{ fontWeight: "bold" }}>Upload Failed</AlertTitle>
          Only <b>ONE</b> image allowed. Delete the current image to add new
          image.
        </Alert>
      )}
      <Box sx={{ pt: 1, pl: 2, pr: 8 }}>
        {formData[id]["img"] && (
          <Box key={formData[id]["img"]} className="spaceBetween">
            <Typography
              sx={{
                fontSize: "14px",
                color: "#264653",
              }}
            >
              {formData[id]["img"]}
            </Typography>
            <Button onClick={onDelete}>
              <RiDeleteBin6Fill
                size={15}
                style={{
                  color: "#264653",
                  pointerEvents: "none",
                }}
              />
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UploadOneFile;
