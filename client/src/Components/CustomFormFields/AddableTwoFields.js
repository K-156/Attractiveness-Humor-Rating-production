import { useState, useEffect, useCallback } from "react";

import { Box, Typography, TextField, Button } from "@mui/material";
import { CgAdd } from "react-icons/cg";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import _ from "lodash";

const AddableTwoFields = ({
  id,
  items,
  setFormData,
  variable,
  role,
  gender
}) => {
  const [error, setError] = useState(false);
  const [currValue, setCurrValue] = useState({
    name: "", value: ""
  }); 
  const [editIndex, setEditIndex] = useState(null); 
  const [, updateState] = useState();

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value; 
    
    setCurrValue((state) => ({
      ...state, 
      [name]:value
    }));
    setError(false)
  }

  const onAdd = () => {
    if (items.includes(currValue)) {
      setError(true);
    } else {
      setFormData((state) => ({
        ...state,
        [role]: {
          ...state[role],
          [gender]: {
            ...state[role][gender],
            [id]: {
              ...state[role][gender][id],
              [variable]: items.concat(currValue),
            },
          }
        },
      }));
    }
  };

  const forceUpdate = useCallback(() => updateState({}), []);
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
        [gender]: {
          ...state[role][gender],
          [id]: {
            ...state[role][gender][id],
            [variable]: items,
          },
        }
      },
    }));
    forceUpdate();
  };

  const onEdit = (index) => {
    setCurrValue(items[index]);
    setEditIndex(index);
    setError(false)
  }

  useEffect(() => {
    setFormData((state) => ({
      ...state,
      [role]: {
        ...state[role],
        [gender]: {
          ...state[role][gender],
          [id]: {
            ...state[role][gender][id],
            [variable]: items,
          },
        }
      },
    }));
    // eslint-disable-next-line
  }, [items])


  return (
    <Box className="flexColumn">
      <Box className="secondColumn">
        <TextField
          name="name"
          label="Name"
          size="small"
          value={currValue["name"]}
          onChange={handleOnChange}
          error={error}
          helperText={error ? "Name-value added" : ""}
          sx={{ width: "180px", mr: "20px" }}
        />
        <TextField
          name="value"
          label="Value"
          size="small"
          value={currValue["value"]}
          onChange={handleOnChange}
          error={error}
          helperText={error ? "Name-value added" : ""}
          sx={{ width: "180px" }}
        />
        { editIndex !== null
        ? <Button 
            onClick={() => {
              items[editIndex] = currValue;
              setEditIndex(null);
              setCurrValue({name: "", value: ""});
            }}
            sx={{color: "#264653"}}
          >
            <IoIosSave
              size={20}
              style={{pointerEvents: "none"}}
            />
          </Button> 
        : <Button onClick={onAdd}>
            <CgAdd
              size={20}
              style={{
                color: "#264653",
                pointerEvents: "none",
              }}
            />
          </Button>
        }
      </Box>
      {items?.length > 0 &&
        <Box sx={{ pt: 1, pl: 2, width: "500px" }}>
          {_.map(items, (aItem, index) => {
            return (
              <Box 
                key={aItem.name + aItem.value} 
                className="spaceBetween"
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#264653",
                  }}
                >
                  {index + 1}. {aItem.name}: {aItem.value}
                </Typography>
                <Box>
                  <Button 
                    id={index} 
                    onClick={() => onDelete(index)}
                    sx={{minWidth: "10px", mx: 1}}
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
                      sx={{minWidth: "10px"}}
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
      }
    </Box>
  );
};

export default AddableTwoFields;
