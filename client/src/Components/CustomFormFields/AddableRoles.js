import { useState, useEffect } from "react";

import { 
  Box, 
  Typography, 
  TextField, 
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { CgAdd } from "react-icons/cg";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import _ from "lodash";

const AddableRoles = ({ items, error, setError, errorText, setFormData }) => {

  const [currValue, setCurrValue] = useState({
    role: "", isGender: null
  });
  const [editIndex, setEditIndex] = useState(null);

  const onAdd = () => {
    const roles = items.filter((aItem) => (
      aItem["role"].toLowerCase() === currValue["role"].toLowerCase()
    ))
    if (roles.length !== 0) {
      setError((state) => ({
        ...state,
        roles: true,
      }));
    } else {      
      setFormData((state) => ({
        ...state,
        roles: items.concat(currValue),
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
      roles: items,
    }));
  };
  
  const onEdit = (index) => {
    setCurrValue(items[index]);
    setEditIndex(index);
  }


  useEffect(() => {
    setFormData((state) => ({
      ...state, 
      roles: items
    })) 
  }, [items])


  return (
    <Box className="flexColumn">
      <Box className="secondColumn">
        <TextField
          size="small"
          fullWidth
          error={error}
          helperText={error ? errorText : ""}
          id="roles"
          value={currValue["role"]}
          onChange={(event) => {
            setError((state) => ({
              ...state, 
              roles: false
            }))
            setCurrValue((state) => ({
              ...state, 
              role: event.target.value
            }))
          }}
        />
        { editIndex !== null
        ?  <Button 
            onClick={() => {
              items[editIndex] = currValue;
              setEditIndex(null);
              setCurrValue( {role: "", isGender: null })
            }}
            disabled={currValue["isGender"] === null || currValue["role"] === ""}
            sx={{color: "#264653"}}
          >
            <IoIosSave
              size={20}
              style={{pointerEvents: "none"}}
            />
          </Button> 
        : <Button 
            onClick={onAdd}
            disabled={currValue["isGender"] === null || currValue["role"] === ""}
            sx={{color: "#264653"}}
          >
            <CgAdd
              size={20}
              style={{pointerEvents: "none"}}
            />
          </Button>
        }
      </Box>
      <Box>
      <Typography className="variable" sx={{ fontSize:"14px", pt:"9px", width:"350px"}}>
          Are the profiles for this role categorised into genders?
      </Typography>
      <RadioGroup
        row
        className="secondColumn"
        value={currValue["isGender"] === null ? null : currValue["isGender"] ? "Yes" : "No"}
        sx={{ justifyContent: "space-around" }}
      >
          {_.map(["Yes", "No"], (option) => {
            return (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio size="small" />}
                label={option}
                labelPlacement="start"
                name="isGender"
                sx={{ ".MuiFormControlLabel-label": { fontSize: "14px", color: "#264653"} }}
                onChange={(event) => {
                  setCurrValue((state) => ({
                    ...state, 
                    isGender: event.target.value === "Yes"
                  }))
                }}
              />
            );
          })}
        </RadioGroup>
      </Box>
      {items.length > 0 &&
        <Box sx={{ pt: 1, pl: 2, width: "500px"}}>
          {_.map(items, (aItem, index) => {
            return (
              <Box
                key={aItem["role"]}
                className="spaceBetween"
              >
                <Typography 
                  sx={{
                    fontSize:"14px",
                    color: "#264653"
                  }}
                >
                  {index + 1}. {aItem["role"]} ({aItem["isGender"] ? "Yes" : "No"}) 
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
                        pointerEvents: "none" 
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

export default AddableRoles;

