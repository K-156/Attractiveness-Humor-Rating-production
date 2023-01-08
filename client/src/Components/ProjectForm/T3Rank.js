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
  const { submitFormData, data, sectionNum, isEditing } = useAppContext();

  const objects = {
    instruction: data[sectionNum] ? data[sectionNum]?.[3].instruction : "",
    characteristics: {
      lowerbound: data[sectionNum]
        ? data[sectionNum]?.[3].characteristics.lowerbound
        : "",
      upperbound: data[sectionNum]
        ? data[sectionNum]?.[3].characteristics.upperbound
        : "",
    },
  };

  const dictionary = {};

  _.map(roles, (aRole) => {
    dictionary[aRole] = objects;
  });

  const [formData, setFormData] = useState(dictionary);

  console.log(formData);

  useEffect(() => {
    submitFormData(formData);
  }, [formData]);

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
                    value={formData[aRole].instruction}
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
                          formData[aRole]["characteristics"][type.toLowerCase()]
                        }
                        InputLabelProps={{
                          shrink:
                            (isEditing ||
                              formData[aRole]["characteristics"][
                                type.toLowerCase()
                              ] !== "") &&
                            true,
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
