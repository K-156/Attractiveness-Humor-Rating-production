import { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import _ from "lodash";

import "./ProjectForm.css";
import ProfileForm from "./ProfileForm";

const T1Profile = ({ roles }) => {
  const { submitFormData, data, sectionNum } = useAppContext();

  const objects = {
    instruction: data[sectionNum]?.[1].instruction,
    1: {
      optionName: data[sectionNum]?.[1][1].optionName,
      description: data[sectionNum]?.[1][1].description,
      img: data[sectionNum] ? data[sectionNum][1][1].img : null,
      link: null,
      attributes: data[sectionNum] ? data[sectionNum][1][1].attributes : [],
    },
    2: {
      optionName: data[sectionNum]?.[1][2].optionName,
      description: data[sectionNum]?.[1][2].description,
      img: data[sectionNum] ? data[sectionNum][1][2].img : null,
      link: null,
      attributes: data[sectionNum] ? data[sectionNum][1][2].attributes : [],
    },
    3: {
      optionName: data[sectionNum]?.[1][3].optionName,
      description: data[sectionNum]?.[1][3].description,
      img: data[sectionNum] ? data[sectionNum][1][3].img : null,
      link: null,
      attributes: data[sectionNum] ? data[sectionNum][1][3].attributes : [],
    },
    4: {
      optionName: data[0]?.[1][4].optionName,
      description: data[0]?.[1][4].description,
      img: data[sectionNum] ? data[sectionNum][1][4].img : null,
      link: null,
      attributes: data[sectionNum] ? data[sectionNum][1][4].attributes : [],
    },
  };

  const objects2 = {
    instruction: false,
    1: false,
    2: false,
    3: false,
    4: false,
  };

  const dictionary = {};
  const dictionary2 = {};

  _.map(roles, (aRole) => {
    dictionary[aRole] = objects;
    dictionary2[aRole] = objects2;
  });

  console.log(dictionary2);

  const [expanded, setExpanded] = useState(dictionary2);

  const [formData, setFormData] = useState(dictionary);

  console.log(formData);

  useEffect(() => {
    submitFormData(formData);
  }, [formData]);

  console.log(formData);
  console.log(expanded);

  return _.map(roles, (aRole) => {
    return (
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ color: "#264653" }}>
          Role: <b>{aRole}</b>
        </Typography>
        <Accordion
          disableGutters
          expanded={expanded[aRole]["instruction"]}
          onChange={() =>
            setExpanded((state) => ({
              ...state,
              [aRole]: {
                ...state[aRole],
                instruction: !expanded[aRole]["instruction"],
              },
            }))
          }
        >
          <AccordionSummary className="accordionSummary">
            <Typography className="accordionTitle">
              {expanded["instruction"] ? (
                <IoIosArrowForward style={{ marginRight: 10 }} />
              ) : (
                <IoIosArrowDown style={{ marginRight: 10 }} />
              )}
              INSTRUCTION
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="twoColumns">
            <Typography className="variable">Instruction</Typography>
            <Box className="secondColumn">
              <TextField
                size="small"
                fullWidth
                multiline
                minRows={3}
                value={formData[aRole].instruction}
                onChange={(event) => {
                  setFormData((state) => ({
                    ...state,
                    [aRole]: {
                      ...state[aRole],
                      instruction: event.target.value,
                    },
                  }));
                }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
        {_.map(_.range(1, 5), (num) => {
          return (
            <Accordion
              disableGutters
              key={num}
              expanded={expanded[aRole][num]}
              onChange={() =>
                setExpanded((state) => ({
                  ...state,
                  [aRole]: {
                    ...state[aRole],
                    [num]: !expanded[aRole][num],
                  },
                }))
              }
            >
              <AccordionSummary className="accordionSummary">
                <Typography className="accordionTitle">
                  {expanded[aRole][num] ? (
                    <IoIosArrowForward style={{ marginRight: 10 }} />
                  ) : (
                    <IoIosArrowDown style={{ marginRight: 10 }} />
                  )}
                  OPTION {num}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ProfileForm
                  id={num}
                  setFormData={setFormData}
                  formData={formData}
                  templateNum={1}
                  role={aRole}
                />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    );
  });
};

export default T1Profile;
