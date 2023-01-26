import { useState } from "react";

import { Box, Typography, TextField, Button } from "@mui/material";
import { CgAdd } from "react-icons/cg";
import { BsDash } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoIosSave } from "react-icons/io";
import _ from "lodash";

const AddableFields = ({
  items,
  error,
  setError,
  errorText,
  currValue,
  setFormData,
  variable,
  role,
  setQn,
}) => {
  const [editIndex, setEditIndex] = useState(null);
  const [value, setValue] = useState({
    question: "",
    lowerNum: "",
    lowerText: "",
    upperNum: "",
    upperText: "",
  });

  const onAdd = () => {
    const variableList = [
      _.map(items, (aItem) => {
        return aItem[variable];
      }),
    ];

    if (variableList.includes(currValue[variable])) {
      setError((state) => ({
        ...state,
        [variable]: true,
      }));
    } else {
      setFormData((state) => ({
        ...state,
        [role]: {
          ...state[role],
          [variable]: items?.concat(currValue),
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
    setValue(items[index]);
    setEditIndex(index);
  };

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setQn((state) => ({
      ...state,
      [name]: value,
    }));

    setValue((state) => ({
      ...state,
      [name]: value,
    }));
  };

  console.log(value);
  console.log(editIndex);
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
          value={value["questions"]}
        />
        {editIndex !== null ? (
          <Button
            onClick={() => {
              items[editIndex] = value;
              setEditIndex(null);
            }}
            disabled={
              value["questions"] === "" ||
              value["lowerNum"] === "" ||
              value["lowerText"] === "" ||
              value["upperNum"] === "" ||
              value["upperText"] === ""
            }
            sx={{ color: "#264653" }}
          >
            <IoIosSave size={20} style={{ pointerEvents: "none" }} />
          </Button>
        ) : (
          <Button
            onClick={onAdd}
            disabled={
              value["questions"] === "" ||
              value["lowerNum"] === "" ||
              value["lowerText"] === "" ||
              value["upperNum"] === "" ||
              value["upperText"] === ""
            }
            sx={{ color: "#264653" }}
          >
            <CgAdd size={20} style={{ pointerEvents: "none" }} />
          </Button>
        )}
      </Box>
      <Box>
        {_.map(["Lower", "Upper"], (type) => {
          return (
            <Box key={type} className="secondColumn" sx={{ mt: 1 }}>
              <TextField
                size="small"
                name={`${type.toLowerCase()}Num`}
                label={`${type}bound`}
                width="30px"
                InputProps={{ inputProps: { min: 1 } }}
                type="number"
                onChange={handleOnChange}
                id={variable}
                value={value[`${type.toLowerCase()}Num`]}
              />
              <BsDash
                size="40px"
                style={{ marginLeft: "10px", marginRight: "10px" }}
              />
              <TextField
                size="small"
                name={`${type.toLowerCase()}Text`}
                label="Characteristics"
                fullWidth
                onChange={handleOnChange}
                id={variable}
                value={value[`${type.toLowerCase()}Text`]}
                // InputLabelProps={{
                //   shrink: editIndex !== null && true,
                // }}
              />
            </Box>
          );
        })}
      </Box>
      {
        <Box sx={{ pt: 1, pl: 2, width: "500px"}}>
          {_.map(items, (value, index) => {
            return (
              <Box key={value} className="spaceBetween">
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#264653",
                  }}
                >
                  {index + 1}. {value["questions"]} ({value["lowerNum"]} -{" "}
                  {value["lowerText"]}, {value["upperNum"]} -{" "}
                  {value["upperText"]})
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
            );
          })}
        </Box>
      }
    </Box>
  );
};

export default AddableFields;
