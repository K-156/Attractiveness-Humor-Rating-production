import { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";

import {
  Box,
  Card,
  CardContent,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { BsDash } from "react-icons/bs";
import _ from "lodash";
import Loading from "../../Components/LoadingAnimation/LoadingAnimation";

import "./ProjectForm.css";

const T2ProfileRating = ({ roles }) => {
  const { submitFormData, getProject } = useAppContext();
  const projId = sessionStorage.getItem("projId");
  const sectionNum = sessionStorage.getItem("sectionNum");
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getProject(projId).then((project) => {
      const data = {};
      _.map(roles, (aRole) => {
        data[aRole] = project.data[sectionNum]
          ? {
              instruction: project.data[sectionNum][2][aRole].instruction,
              range: {
                lower: {
                  number:
                    project.data[sectionNum][2][aRole].range?.lower.number,
                  text: project.data[sectionNum][2][aRole].range?.lower.text,
                },
                upper: {
                  number:
                    project.data[sectionNum][2][aRole].range?.upper.number,
                  text: project.data[sectionNum][2][aRole].range?.upper.text,
                },
              },
            }
          : {
              instruction: "",
              range: {
                lower: { number: "", text: "" },
                upper: { number: "", text: "" },
              },
            };
      });
      setFormData(data);
      setIsLoading(false);
    });
  }, []);

  const handleOnChange = (event, aRole) => {
    const name = event.target.name;
    const value = event.target.value;

    const type = name.includes("lower") ? "lower" : "upper";
    setFormData((state) => ({
      ...state,
      [aRole]: {
        ...state[aRole],
        range: {
          ...formData[aRole]["range"],
          [type]: {
            ...formData[aRole]["range"][type],
            [name.includes("Num") ? "number" : "text"]: value,
          },
        },
      },
    }));
  };

  useEffect(() => {
    submitFormData(formData);
  }, [formData]);

  if (isLoading) {
    return (
      <div className={`background-blue center`}>
        <Loading />
      </div>
    );
  }


  return _.map(roles, (aRole) => {
    return (
      <Box key={aRole} sx={{ mb: 3 }}>
        <Typography sx={{ color: "#264653" }}>
          Role: <b>{aRole}</b>
        </Typography>
        <Card>
          <CardContent className="cardPadding">
            <FormControl>
              <Box className="twoColumns">
                <Typography className="variable">Instruction</Typography>
                <Box className="secondColumn">
                  <TextField
                    size="small"
                    name="instruction"
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    onChange={(event) => {
                      const value = event.target.value;
                      setFormData((state) => ({
                        ...state,
                        [aRole]: {
                          ...state[aRole],
                          instruction: value,
                        },
                      }));
                    }}
                    value={formData[aRole] ? formData[aRole].instruction : ""}
                  />
                </Box>
              </Box>
              <Box className="twoColumns">
                <Typography className="variable">Range</Typography>
                <Box>
                  {_.map(["Lower", "Upper"], (type) => {
                    return (
                      <Box key={type} className="secondColumn" sx={{ mb: 1 }}>
                        <TextField
                          key={`T2-${type}`}
                          size="small"
                          name={`${type.toLowerCase()}Num`}
                          label={`${type}bound`}
                          width="30px"
                          InputProps={{ inputProps: { min: 1 } }}
                          type="number"
                          onChange={(event) => handleOnChange(event, aRole)}
                          value={
                            formData[aRole]
                              ? formData[aRole]["range"][type.toLowerCase()][
                                  "number"
                                ]
                              : 0
                          }
                        />
                        <BsDash
                          size="40px"
                          style={{ marginLeft: "10px", marginRight: "10px" }}
                        />
                        <TextField
                          key={type}
                          size="small"
                          name={`${type.toLowerCase()}Text`}
                          label="Characteristics"
                          fullWidth
                          onChange={(event) => handleOnChange(event, aRole)}
                          value={
                            formData[aRole]
                              ? formData[aRole]["range"][type.toLowerCase()][
                                  "text"
                                ]
                              : ""
                          }
                        />
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </FormControl>
          </CardContent>
        </Card>
      </Box>
    );
  });
};

export default T2ProfileRating;
