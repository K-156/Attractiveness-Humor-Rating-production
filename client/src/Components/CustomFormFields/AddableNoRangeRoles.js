import { Box, Typography, TextField, Button } from "@mui/material";
import { CgAdd } from "react-icons/cg";
import { RiDeleteBin6Fill } from "react-icons/ri";
import _ from "lodash";

const AddableNoRangeRoles = ({
  items,
  error,
  setError,
  errorText,
  handleOnChange,
  currValue,
  setFormData,
  variable,
  role,
}) => {
  const onAdd = () => {
    if (items.includes(currValue)) {
      setError((state) => ({
        ...state,
        [variable]: true,
      }));
    } else {
      setFormData((state) => ({
        ...state,
        [role]: {
          ...state[role],
          [variable]: items.concat(currValue),
        },
      }));
    }
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
      <Box className="secondColumn">
        <TextField
          size="small"
          fullWidth
          onChange={handleOnChange}
          error={error}
          helperText={error ? errorText : ""}
          id={variable}
          name={variable}
        />
        <Button onClick={onAdd}>
          <CgAdd
            size={20}
            style={{
              color: "#264653",
              pointerEvents: "none",
            }}
          />
        </Button>
      </Box>
      {items?.length < 1 ? (
        <></>
      ) : (
        <Box sx={{ pt: 1, pl: 2 }}>
          {_.map(items, (value, index) => {
            return (
              <Box key={value} className="spaceBetween">
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
          })}
        </Box>
      )}
    </Box>
  );
};

export default AddableNoRangeRoles;
