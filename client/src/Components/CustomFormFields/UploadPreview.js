import { useState, memo } from "react";
import { useAppContext } from "../../Context/AppContext";

import { Alert, AlertTitle, Box, Button, Typography } from "@mui/material";
import { MdFileUpload } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import _ from "lodash";

import HomeSample from "./HomeSample";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const UploadPreview = ({ setFormData, formData }) => {
  const { uploadFiles } = useAppContext();
  const projId = sessionStorage.getItem("projId");
  let fileLink = "";

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const uploadFile = async (event) => {
    const file = event.target.files;
    if (file !== undefined && file.length !== 0) {
      if (formData["graphic"] !== null) {
        setError(true);
        return;
      }
      setIsLoading(true);
      fileLink = await uploadFiles(`${projId}_projDetails_graphic`, file[0]);
      setFormData((state) => ({
        ...state,
        graphic: file[0].name,
        graphicLink: fileLink,
      }));
    }
    setIsLoading(false);
  };
  const onDelete = () => {
    setError(false);
    setFormData((state) => ({
      ...state,
      graphic: null,
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
          <input type="file" accept=".svg, .png" hidden onChange={uploadFile} />
        </Button>
        {isLoading && <LoadingAnimation size="1rem" marginLeft={"1rem"} />}
      </Box>
      {error && (
        <Alert severity="error" sx={{ width: "480px", mt: 1 }}>
          <AlertTitle sx={{ fontWeight: "bold" }}>Upload Failed</AlertTitle>
          Only <b>ONE</b> image allowed. Delete the current image to add new
          image.
        </Alert>
      )}
      <Box sx={{ pt: 1, pl: 2, pr: 8 }}>
        {formData["graphic"] && (
          <Box key={formData["graphic"]["name"]} className="spaceBetween">
            <Typography
              sx={{
                fontSize: "14px",
                color: "#264653",
              }}
            >
              {formData["graphic"]}
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
      {formData["graphic"] && (
        <Box sx={{ width: "480px", height: "300px" }}>
          <HomeSample
            theme={formData["theme"]}
            title={formData["title"]}
            description={formData["description"]}
            roleList={_.map(formData["roles"], (role) => role["role"])}
            graphic={formData.graphicLink}
          />
        </Box>
      )}
    </Box>
  );
};

export default memo(UploadPreview);
