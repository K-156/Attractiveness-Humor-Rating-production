import { Box, Typography } from "@mui/material";
import _ from "lodash";

import MoreText from "./MoreText";
import "./SummaryCard.css";
import { variableMap } from "../../Utils/templateList";

const OptionsContentRoles = ({ content, handleOnClick }) => {
  return (
    <>
      {_.map(content, (arr, role) => {
        return (
          <Box key={role}>
            <Box className="twoColumns">
              <Typography className="summaryRole">
                {role}
              </Typography>
            </Box>
            {_.map(arr, (options, gender) => {
              if (gender !== "instruction") {
                const displayOutput = _.map(options, (value, key) => {
                  const optionNum = key[key.length - 1];
                  return (
                    <Box key={optionNum}>
                      <Box sx={{ mx: "10px", mt: 2 }}>
                        <Typography
                          className="summaryText"
                          sx={{ fontWeight: "bold" }}
                        >
                          Option {optionNum}
                        </Typography>
                      </Box>
                      {_.map(value, (aValue, aKey) => {
                        return (
                          <Box key={aKey} className="twoColumns">
                            <Typography className="summaryVariable">
                              {variableMap[aKey]}
                            </Typography>
                            {aKey !== "link" &&
                            typeof aValue === "string" &&
                            aValue.length > 100 
                            ? <MoreText
                                handleOnClick={handleOnClick}
                                id={variableMap[aKey]}
                                value={aValue}
                              />
                            : aKey.toLowerCase() === "attributes" ? (
                              <Box>
                                {_.map(aValue, (attribute, index) => {
                                  return (
                                    <Typography
                                      key={index}
                                      className="summaryText"
                                    >
                                      {index + 1}. {attribute["name"]}:{" "}
                                      {attribute["value"]}
                                    </Typography>
                                  );
                                })}
                              </Box>
                            ) : (
                              aKey !== "link" && (
                                <Typography className="summaryText">
                                  {aValue}
                                </Typography>
                              )
                            )}
                          </Box>
                        );
                      })}
                    </Box>
                  );
                });
                return (
                  <Box key={gender}>
                    <Box className="twoColumns">
                      <Typography className="summaryVariable">
                        <b>{gender === "NA" ? "" : `- - - - - ${gender} - - - - -`}</b>
                      </Typography>
                    </Box>
                    {displayOutput}
                  </Box>
                );
              }
            })}
            <Box className="twoColumns">
              <Typography className="summaryVariable">Instruction</Typography>
              {content[role]?.["instruction"] &&
              content[role]["instruction"].length > 100 ? (
                <MoreText
                  handleOnClick={handleOnClick}
                  id="Instruction"
                  value={content[role]?.["instruction"]}
                />
              ) : (
                <Typography className="summaryText">
                  {content[role]?.["instruction"]}
                </Typography>
              )}
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default OptionsContentRoles;
