import { Link, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import _ from "lodash";

import { templates } from "../../Utils/templateList";
import "./ProjectForm.css";

const AddSection = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const onDelete = (index) => {
    if (index === 0) {
      formData.shift();
    } else {
      formData.splice(index, 1);
    }
    setFormData([...formData]);
  };

  return (
    <Card>
      <CardContent sx={{ p: 2, pl: 10 }}>
        <FormControl>
          <Box className="twoColumns">
            <Typography className="variable flexColumn">
              Sections
              <Link
                className="projectLink"
                to="/projects/samples/templates"
              >
                <i>View Templates</i>
              </Link>
            </Typography>
            <Box
              sx={{ 
                display: "flex", 
                flexDirection: "column", 
                width: "400px" 
              }}
            >
              <TextField
                size="small"
                fullWidth
                select
                id="sections"
                label="Select template"
                defaultValue=""
                onChange={(event) => {
                  setFormData(formData.concat(Number(event.target.value)));
                }}
              >
                {_.map(templates, (value, key) => {
                  return (
                    <MenuItem 
                      key={key} 
                      id={key} 
                      value={key}
                    >
                      {value}
                    </MenuItem>
                  );
                })}
              </TextField>
              {formData.length < 1 ? (
                <></>
              ) : (
                <Box sx={{ pt: 1, px: 2 }}>
                  {_.map(formData, (value, index) => {
                    return (
                      <Box
                        key={value}
                        className="spaceBetween"
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "#264653" }}
                        >
                          {index + 1}. {templates[value]}
                        </Typography>
                        <Box>
                          <Button
                            id={index}
                            onClick={() => navigate(`${index + 1}`)}
                            sx={{ minWidth: "40px" }}
                          >
                            <MdEdit
                              size={15}
                              style={{
                                color: "#264653",
                                pointerEvents: "none",
                              }}
                            />
                          </Button>
                          <Button
                            id={index}
                            onClick={() => onDelete(index)}
                            sx={{ minWidth: "40px" }}
                          >
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
                    );
                  })}
                </Box>
              )}
            </Box>
          </Box>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default AddSection;
