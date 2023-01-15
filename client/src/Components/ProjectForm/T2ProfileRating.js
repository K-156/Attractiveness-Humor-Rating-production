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
import "./ProjectForm.css";

const T2ProfileRating = () => {
  const { submitFormData, isEditing, getProject } = useAppContext();
  const createdProjectId = sessionStorage.getItem("createdProjectId");
  const roles = JSON.parse(sessionStorage.getItem("roles"));
  const sectionNum = sessionStorage.getItem("sectionNum");

  useEffect(() => {
    getProject(createdProjectId).then((project) => {
      const dictionary = {};
      _.map(roles, (aRole) => {
        dictionary[aRole] = project.data[sectionNum]
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
      setFormData(dictionary);
    });
  }, []);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    submitFormData(formData);
  }, [formData]);

  console.log(formData);

  return _.map(roles, (aRole) => {
    return (
      <Box sx={{ mb: 3 }}>
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
                    value={formData[aRole]?.instruction}
                  />
                </Box>
              </Box>
              <Box className="twoColumns">
                <Typography className="variable">Range</Typography>
                <Box>
                  {_.map(["Lower", "Upper"], (type) => {
                    return (
                      <Box className="secondColumn" sx={{ mb: 1 }}>
                        <TextField
                          key={`T2-${type}`}
                          size="small"
                          name={`${type.toLowerCase()}Num`}
                          label={`${type}bound`}
                          width="30px"
                          InputProps={{ inputProps: { min: 1 } }}
                          type="number"
                          onChange={(event) => {
                            const name = event.target.name;
                            const value = event.target.value;

                            const type = name.includes("lower")
                              ? "lower"
                              : "upper";
                            setFormData((state) => ({
                              ...state,
                              [aRole]: {
                                ...state[aRole],
                                range: {
                                  ...formData[aRole]["range"],
                                  [type]: {
                                    ...formData[aRole]["range"][type],
                                    [name.includes("Num") ? "number" : "text"]:
                                      value,
                                  },
                                },
                              },
                            }));
                          }}
                          value={
                            formData[aRole]?.["range"][type.toLowerCase()][
                              "number"
                            ]
                          }
                          InputLabelProps={{
                            shrink:
                              (isEditing ||
                                formData[aRole]?.["range"][type.toLowerCase()][
                                  "number"
                                ]) &&
                              true,
                          }}
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
                          onChange={(event) => {
                            const name = event.target.name;
                            const value = event.target.value;

                            const type = name.includes("lower")
                              ? "lower"
                              : "upper";
                            setFormData((state) => ({
                              ...state,
                              [aRole]: {
                                ...state[aRole],
                                range: {
                                  ...formData[aRole]["range"],
                                  [type]: {
                                    ...formData[aRole]["range"][type],
                                    [name.includes("Num") ? "number" : "text"]:
                                      value,
                                  },
                                },
                              },
                            }));
                          }}
                          value={
                            formData[aRole]?.["range"][type.toLowerCase()]["text"]
                          }
                          InputLabelProps={{
                            shrink:
                              (isEditing ||
                                formData[aRole]?.["range"][type.toLowerCase()][
                                  "text"
                                ] !== "") &&
                              true,
                          }}
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
