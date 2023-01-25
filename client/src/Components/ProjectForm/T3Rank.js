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
import _ from "lodash";

import "./ProjectForm.css";

const T3Rank = ({ roles }) => {
  const { submitFormData, getProject, isEditing } = useAppContext();
  const projId = sessionStorage.getItem("projId");
  const sectionNum = sessionStorage.getItem("sectionNum");

  useEffect(() => {
    getProject(projId).then((project) => {
      console.log(project.data[sectionNum]);
      const data = {};
      _.map(roles, (aRole) => {
        data[aRole] = {
          instruction: project.data[sectionNum]
            ? project.data[sectionNum][3][aRole].instruction
            : "",
          characteristics: {
            lowerbound: project.data[sectionNum]
              ? project.data[sectionNum][3][aRole].characteristics?.lowerbound
              : "",
            upperbound: project.data[sectionNum]
              ? project.data[sectionNum][3][aRole].characteristics?.upperbound
              : "",
          },
        };
      });
      console.log(data);
      setFormData(data);
    });
  }, []);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    submitFormData(formData);
  }, [formData]);

  console.log(isEditing);

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
                    value={formData[aRole]?.instruction}
                  />
                </Box>
              </Box>
              <Box className="twoColumns">
                <Typography className="variable">Characteristics</Typography>
                <Box
                  className="secondColumn"
                  sx={{ justifyContent: "space-between" }}
                >
                  {_.map(["Lowerbound", "Upperbound"], (type) => {
                    console.log(
                      formData[aRole]?.["characteristics"][type.toLowerCase()]
                    );
                    return (
                      <TextField
                        key={type}
                        size="small"
                        name={type.toLowerCase()}
                        label={type}
                        onChange={(event) => {
                          const name = event.target.name;
                          const value = event.target.value;
                          setFormData((state) => ({
                            ...state,
                            [aRole]: {
                              ...state[aRole],
                              characteristics: {
                                ...formData[aRole]["characteristics"],
                                [name]: value,
                              },
                            },
                          }));
                        }}
                        sx={{ width: "180px" }}
                        value={
                          formData[aRole]?.["characteristics"][
                            type.toLowerCase()
                          ]
                        }
                        InputLabelProps={{
                          shrink:
                            formData[aRole]?.["characteristics"][
                              type.toLowerCase()
                            ] !== "" && true,
                        }}
                      />
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
export default T3Rank;
