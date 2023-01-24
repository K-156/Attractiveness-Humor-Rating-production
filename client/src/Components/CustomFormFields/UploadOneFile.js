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
  role,
  gender,
  email,
  sectionNum,
}) => {
  const { uploadFiles } = useAppContext();
  const projId = sessionStorage.getItem("projId");

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let fileLink = "";
  const uploadFile = async (event) => {
    console.log(formData);
    const file = event.target.files;
    if (file !== undefined && file.length > 0) {
      if (email) {
        if (formData["email"] !== "") {
          setError(true);
          return;
        }
        setIsLoading(true);
        fileLink = await uploadFiles(
          `${projId}_projDetails_email.csv`,
          file[0]
        );
        setFormData((state) => ({
          ...state,
          email: file[0].name,
          emailLink: fileLink,
        }));
      } else {
        if (formData[role][gender][id]["img"] !== null) {
          setError(true);
          return;
        }
        setIsLoading(true);
        fileLink = await uploadFiles(
          `${projId}_${sectionNum}_${templateNum}_${id}_${role}_${gender}`,
          file[0]
        );
        setFormData((state) => ({
          ...state,
          [role]: {
            ...state[role],
            [gender]: {
              ...state[role][gender],
              [id]: {
                ...state[role][gender][id],
                img: file[0].name,
                link: fileLink,
              },
            },
          },
        }));
      }
    }
    setIsLoading(false);
  };

  const onDelete = () => {
    setError(false);
    if (email) {
      setFormData((state) => ({
        ...state,
        email: "",
        emailLink: "",
      }));
    } else {
      setFormData((state) => ({
        ...state,
        [role]: {
          ...state[role],
          [gender]: {
            ...state[role][gender],
            [id]: {
              ...state[role][gender][id],
              img: null,
              link: null,
            },
          },
        },
      }));
    }
  };
console.log(typeof error)
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
        {isLoading && <LoadingAnimation size="1rem" marginLeft={"1rem"} />}
      </Box>
      {error && email ? (
        <Alert severity="error" sx={{ width: "350px", mt: 1 }}>
          <AlertTitle sx={{ fontWeight: "bold" }}>Upload Failed</AlertTitle>
          Only <b>ONE</b> csv file allowed. Delete the current file to add new
          file.
        </Alert>
      ):(error &&
        <Alert severity="error">
          <AlertTitle sx={{ fontWeight: "bold" }}>Upload Failed</AlertTitle>
          Only <b>ONE</b> image allowed. Delete the current image to add new
          image.
        </Alert>
      )}
      {email && formData["email"] !== "" ? (
        <Box sx={{ pt: 1, pl: 2, pr: 8 }}>
          <Box key={formData["email"]} className="spaceBetween">
            <Typography
              sx={{
                fontSize: "14px",
                color: "#264653",
              }}
            >
              {formData["email"]}
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
        </Box>
      ) : (
        <Box sx={{ pt: 1, pl: 2, pr: 8 }}>
          {formData[role]?.[gender][id]["img"] && (
            <Box
              key={formData[role][gender][id]["img"]}
              className="spaceBetween"
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#264653",
                }}
              >
                {formData[role][gender][id]["img"]}
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
      )}
    </Box>
  );
};

export default UploadOneFile;
