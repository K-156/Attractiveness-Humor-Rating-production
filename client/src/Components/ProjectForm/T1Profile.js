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

const T1Profile = ({ role }) => {
  const { submitFormData, isEditing, data, sectionNum } = useAppContext();

  const [expanded, setExpanded] = useState({
    instruction: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });

  const [formData, setFormData] = useState({
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
      img: data[sectionNum] ? data[sectionNum][1][2].img: null,
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
  });

  useEffect(() => {
    submitFormData(formData);
  }, [formData]);

  return (
    <Box sx={{ mb: 3 }}>
      <Typography sx={{ color: "#264653" }}>
        Role: <b>{role}</b>
      </Typography>
      <Accordion
        disableGutters
        expanded={expanded["instruction"]}
        onChange={() =>
          setExpanded((state) => ({
            ...state,
            instruction: !expanded["instruction"],
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
              value={formData.instruction}
              onChange={(event) => {
                setFormData((state) => ({
                  ...state,
                  instruction: event.target.value,
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
            expanded={expanded[num]}
            onChange={() =>
              setExpanded((state) => ({
                ...state,
                [num]: !expanded[num],
              }))
            }
          >
            <AccordionSummary className="accordionSummary">
              <Typography className="accordionTitle">
                {expanded[num] ? (
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
              />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default T1Profile;
