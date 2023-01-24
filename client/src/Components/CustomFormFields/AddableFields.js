import { Box, Typography, TextField, Button } from "@mui/material";
import { CgAdd } from "react-icons/cg";
import { BsDash } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import _ from "lodash";

const AddableFields = ({
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
              />
            </Box>
          );
        })}
      </Box>
      {
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
                  {index + 1}. {value["questions"]} ({value["lowerNum"]} -{" "}
                  {value["lowerText"]}, {value["upperNum"]} -{" "}
                  {value["upperText"]})
                </Typography>
                <Button 
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
                  // onClick={}
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
