import { useState } from "react";

import { Box, Typography, TextField, Button } from "@mui/material";
import { CgAdd } from "react-icons/cg";
import { IoIosSave } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import _ from "lodash";

const AddableNoRange = ({
  items,
  error,
  setError,
  errorText,
  currValue,
  setFormData,
  variable,
  role,
  setIntro,
  setMessages,
}) => {
  const [editIndex, setEditIndex] = useState(null);
  const [value, setValue] = useState([]);

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

  const onEdit = (index) => {
    setValue((state) => ({
      ...state,
      [variable]: items[index],
    }));
    setEditIndex(index);
  };
  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "introductions") {
      setIntro((state) => ({
        ...state,
        [name]: value,
      }));
    }

    if (name === "messages") {
      setMessages(value);
    }

    setError((state) => ({
      ...state,
      [name]: false,
    }));

    setValue((state) => ({
      ...state,
      [name]: value,
    }));
  };

  console.log(value);
  console.log(items);

  return (
    <Box className="flexColumn">
      <Box className="secondColumn">
        <TextField
          size="small"
          fullWidth
          onChange={handleOnChange}
          error={error}
          helperText={error ? errorText : ""}
          name={variable}
          value={value[variable]}
        />
        {editIndex !== null ? (
          <Button
            onClick={() => {
              items[editIndex] = value[variable];
              setEditIndex(null);
            }}
            disabled={value.length === 0}
            sx={{ color: "#264653" }}
          >
            <IoIosSave size={20} style={{ pointerEvents: "none" }} />
          </Button>
        ) : (
          <Button
            onClick={onAdd}
            disabled={value.length === 0}
            sx={{ color: "#264653" }}
          >
            <CgAdd size={20} style={{ pointerEvents: "none" }} />
          </Button>
        )}
      </Box>
      {items?.length > 0 && (
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
                <Box>
                  <Button
                    sx={{ minWidth: "10px", mx: 1 }}
                    id={index}
                    onClick={() => onDelete(index)}
                  >
                    <RiDeleteBin6Fill
                      size={15}
                      style={{
                        color: "#264653",
                        pointerEvents: "none",
                      }}
                    />
                  </Button>
                  <Button
                    id={index}
                    onClick={() => onEdit(index)}
                    sx={{ minWidth: "10px" }}
                  >
                    <MdModeEditOutline
                      size={15}
                      style={{
                        color: "#264653",
                        pointerEvents: "none",
                      }}
                    />
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default AddableNoRange;
