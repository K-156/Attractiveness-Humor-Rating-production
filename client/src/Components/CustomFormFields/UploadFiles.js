import { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import { Box, Button, Typography } from "@mui/material";
import _ from "lodash";
import { MdFileUpload } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const UploadFiles = ({
  items,
  setFormData,
  variable,
  accept,
  audio,
  templateNum,
  style,
  role,
}) => {
  const {
    uploadFiles,
    isEditing,
    editProjectId,
    createdProjectId,
    sectionNum,
  } = useAppContext();
  let fileLink = "";
  const [isLoading, setIsLoading] = useState(false);

  const uploadFile = async (event) => {
    setIsLoading(true);
    if (event.target.files !== undefined) {
      if (audio) {
        fileLink = await uploadFiles(
          isEditing
            ? `${editProjectId}_${sectionNum}_${templateNum}_${items.length}_${role}`
            : `${createdProjectId}_${sectionNum}_${templateNum}_${items.length}_${role}`,
          event.target.files[0]
        );
        setFormData((state) => ({
          ...state,
          [role]: {
            ...state[role],
            [variable]: items.concat(event.target.files[0].name),
            audioLink: [...state[role].audioLink, fileLink],
          },
        }));
      } else {
        fileLink = await uploadFiles(
          isEditing
            ? `${editProjectId}_projDetails_email_${items?.length}.csv`
            : `${createdProjectId}_projDetails_email_${items?.length}.csv`,
          event.target.files[0]
        );
        setFormData((state) => ({
          ...state,
          [variable]: items.concat(event.target.files[0].name),
          emailLink: [...state.emailLink, fileLink],
        }));
      }
    }
    setIsLoading(false);
  };

  const onDelete = (index) => {
    if (index === 0) {
      items.shift();
    } else {
      items.splice(index, 1);
    }
    setFormData((state) => ({
      ...state,
      [role]: {
        ...state[role],
        [variable]: items,
      },
    }));
  };

  return (
    <Box className="flexColumn">
      <Box className="secondColumn" style={style}>
        <Button
          variant="contained"
          className="customButton-green"
          component="label"
        >
          <MdFileUpload size={20} style={{ marginRight: 5 }} />
          Choose file(s) to upload
          <input type="file" accept={accept} hidden onChange={uploadFile} />
        </Button>
        {isLoading && <LoadingAnimation size="1rem" marginLeft={"1rem"} />}
      </Box>

      {items?.length < 1 ? (
        <></>
      ) : (
        <Box
          sx={{
            pt: 1,
            pl: 2,
            pr: 8,
          }}
        >
          {_.map(items, (file, index) => {
            if (file !== undefined) {
              const value = file;
              return (
                <Box key={index + value} className="spaceBetween">
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#264653",
                    }}
                  >
                    {index + 1}. {value}
                  </Typography>
                  <Button id={index} onClick={() => onDelete(index)}>
                    <RiDeleteBin6Fill
                      size={15}
                      style={{
                        color: "#264653",
                        pointerEvents: "none",
                      }}
                    />
                  </Button>
                </Box>
              );
            }
          })}
        </Box>
      )}
    </Box>
  );
};

export default UploadFiles;
