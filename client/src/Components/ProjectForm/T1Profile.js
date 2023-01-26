import { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { IoIosArrowForward } from "react-icons/io";
import _ from "lodash";

import "./ProjectForm.css";
import ProfileForm from "./ProfileForm";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const T1Profile = ({ roles, roleDict }) => {
  const { submitFormData, getProject } = useAppContext();
  const projId = sessionStorage.getItem("projId");
  const sectionNum = sessionStorage.getItem("sectionNum");

  const [formData, setFormData] = useState({});
  const [expanded, setExpanded] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProject(projId).then((project) => {
      const { data } = project;
      _.map(roleDict, (aRole) => {
        formatData(data, aRole.role, aRole.isGender);
        formatCategorise(data, aRole.role, aRole.isGender);
      });
      setIsLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  const formatData = (data, aRole) => {
    setFormData((state) => ({
      ...state,
      [aRole]: {
        instruction: data[sectionNum]
          ? data[sectionNum]?.[1][aRole]?.instruction
          : "",
      },
    }));
    setExpanded((state) => ({
      ...state,
      [aRole]: {},
    }));
  };

  const formatCategorise = (data, aRole, isGender) => {
    const genderList = isGender ? ["Male", "Female"] : ["NA"];
    _.map(genderList, (gender) => {
      _.map(_.range(1, 5), (num) => {
        setFormData((state) => ({
          ...state,
          [aRole]: {
            ...state[aRole],
            [gender]: {
              ...state[aRole]?.[gender],
              [num]: {
                optionName: data[sectionNum]
                  ? data[sectionNum]?.[1][aRole]?.[gender][num].optionName
                  : "",
                description: data[sectionNum]
                  ? data[sectionNum]?.[1][aRole]?.[gender][num].description
                  : "",
                img: data[sectionNum]
                  ? data[sectionNum][1][aRole]?.[gender][num].img
                  : null,
                link: null,
                attributes: data[sectionNum]
                  ? data[sectionNum][1][aRole]?.[gender][num].attributes
                  : [],
              },
            },
          },
        }));
        setExpanded((state) => ({
          ...state,
          [aRole]: {
            ...state[aRole],
            [gender]: {
              ...state[aRole][gender],
              [num]: false,
            },
          },
        }));
      });
    });
  };

  useEffect(() => {
    submitFormData(formData);
    // eslint-disable-next-line
  }, [formData]);

  if (isLoading) {
    return (
      <div className={`background-blue center`}>
        <LoadingAnimation />
      </div>
    );
  }

  return _.map(roles, (aRole, index) => {
    return (
      <Box key={aRole} sx={{ mb: 3 }}>
        {aRole.toLowerCase() !== "na" && (
          <Typography sx={{ color: "#264653" }}>
            Role: <b>{aRole}</b>
          </Typography>
        )}
        <Card>
          <CardContent>
            <Box className="twoColumns">
              <Typography className="variable" sx={{ width: "350px" }}>
                Instruction
              </Typography>
              <Box className="secondColumn">
                <TextField
                  size="small"
                  fullWidth
                  multiline
                  minRows={3}
                  maxRows={5}
                  id={aRole}
                  value={formData[aRole]?.instruction}
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
            {_.map(
              roleDict[index]["isGender"] ? ["Male", "Female"] : ["NA"],
              (gender) => {
                return (
                  <Box className="flexColumn" sx={{ m: 1 }} key={gender}>
                    <Typography className="variable">
                      <b>{gender === "NA" ? "" : gender}</b>
                    </Typography>
                    {_.map(_.range(1, 5), (num) => {
                      return (
                        <Accordion
                          disableGutters
                          key={num}
                          onChange={() =>
                            setExpanded((state) => ({
                              ...state,
                              [aRole]: {
                                ...state[aRole],
                                [gender]: {
                                  ...state[aRole][gender],
                                  [num]: !expanded[aRole][gender][num],
                                },
                              },
                            }))
                          }
                        >
                          <AccordionSummary className="accordionSummary">
                            <Typography className="accordionTitle">
                              <IoIosArrowForward
                                style={{
                                  marginRight: 10,
                                  rotate: expanded[aRole][gender][num]
                                    ? "90deg"
                                    : "none",
                                }}
                              />
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
                              sectionNum={sectionNum}
                            />
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                  </Box>
                );
              }
            )}
          </CardContent>
        </Card>
      </Box>
    );
  });
};

export default T1Profile;
