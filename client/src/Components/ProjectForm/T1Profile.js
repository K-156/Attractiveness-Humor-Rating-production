import { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { IoIosArrowForward } from "react-icons/io";
import _ from "lodash";

import "./ProjectForm.css";
import ProfileForm from "./ProfileForm";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const T1Profile = () => {

  const { submitFormData, data, getProject, sectionNum } = useAppContext();
  const projId = sessionStorage.getItem("projId")
  const rolesList = JSON.parse(sessionStorage.getItem("roles"));
  let roles = [];
  rolesList.forEach((dict) => {
    roles.push(dict["role"])
  })

  const [formData, setFormData] = useState({});
  const [expanded, setExpanded] = useState({});
  const [isCategorise, setIsCategorise] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  

  useEffect(() => {
    getProject(projId)
    formatData(data);
    setIsLoading(false)
  }, [])

  const formatData = (data) => {
    _.map(roles, (aRole) => {
      setFormData((state) => ({
        ...state, 
        [aRole]: {
          instruction: data[sectionNum] ? data[sectionNum]?.[1][aRole].instruction : ""
        }
      }))
      setExpanded((state) => ({
        ...state, 
        [aRole]: {}
      }))
      if (data.length > 0) {
        formatCategorise(aRole, data[sectionNum]?.[1][aRole].includes("Male"));
      }
    })
  }

  const formatCategorise = (aRole, isCategorise) => {
    const genderList = isCategorise ? ["Male", "Female"] : ["NA"];
    _.map(genderList, (gender) =>{
      _.map(_.range(1, 5), (num) => {
        setFormData((state) => ({
          ...state, 
          [aRole]: {
            ...state[aRole], 
            [gender]: {
              ...state[aRole][gender], 
              [num]: {
                optionName: data[sectionNum] ? data[sectionNum]?.[1][aRole][num].optionName : "",
                description: data[sectionNum] ? data[sectionNum]?.[1][aRole][num].description : "", 
                img: data[sectionNum] ? data[sectionNum][1][aRole][num].img : null,
                link: null,
                attributes: data[sectionNum]
                  ? data[sectionNum][1][aRole][num].attributes
                  : [],
              }
            }
        }}))

        setExpanded((state) => ({
          ...state, 
          [aRole]: {
            ...state[aRole], 
            [gender]: {
              ...state[aRole][gender],
              [num]: false
            }
          }
        }))        
    })
  })}

  const handleOnChange = (event, aRole) => {
      const value = event.target.value === "Yes"
      setIsCategorise((state) => ({
        ...state, 
        [aRole]: value
      }))
      formatCategorise(aRole, value);
  }

  useEffect(() => {
    submitFormData(formData);
  }, [formData]);

  if (isLoading) {
    return <LoadingAnimation />
  }

  return _.map(roles, (aRole) => {
    return(
      <Box key={aRole} sx={{mb: 3}}>
        {aRole.toLowerCase() !== "na" && 
          <Typography sx={{color: "#264653"}}>
            Role: <b>{aRole}</b>
          </Typography>
        }
        <Card>
        <CardContent>
          <Box className="twoColumns">
            <Typography className="variable" sx={{width:"350px"}}>Instruction</Typography>
            <Box className="secondColumn">
              <TextField
                size="small"
                fullWidth
                multiline
                minRows={3}
                maxRows={3}
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
          </Box>
          <Box className="twoColumns">
            <Typography className="variable" sx={{ pt: "9px", width: "350px"}}>
              Are the profiles categorised into genders?
            </Typography>
            <RadioGroup
              row
              className="secondColumn"
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
                    sx={{ ".MuiFormControlLabel-label": { fontSize: "14px", color: "#264653"} }}
                    onChange={(event) => handleOnChange(event, aRole)}
                  />
                );
              })}
            </RadioGroup>
          </Box>
          { isCategorise[aRole] === undefined ? <></>
          : _.map(isCategorise[aRole] ? ["Male", "Female"] : ["NA"], (gender) => {
            return(
              <Box className="flexColumn" sx={{m: 1}} key={gender}>
                <Typography className="variable"><b>{gender === "NA" ? "" : gender}</b></Typography>
                {_.map(_.range(1, 5), (num) => {
                  return(
                    <Accordion
                      disableGutters
                      onChange={() => 
                        setExpanded((state) => ({
                          ...state, 
                          [aRole]: {
                            ...state[aRole],
                            [gender]: {
                              ...state[aRole][gender],
                              [num]: !expanded[aRole][gender][num]
                            }
                          }
                        }))
                      }
                    >
                    <AccordionSummary className="accordionSummary">
                      <Typography className="accordionTitle">
                        <IoIosArrowForward style={{ marginRight: 10 }} />
                        OPTION {num}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ProfileForm
                        id={num}
                        gender={gender}
                        role={aRole}
                        formData={formData}
                        setFormData={setFormData}
                        templateNum={1}
                      />
                    </AccordionDetails>
                  </Accordion>
                )})
                }
              </Box>
            )})
          }        
          </CardContent>
        </Card>
      </Box>
    )
  })
}

export default T1Profile;