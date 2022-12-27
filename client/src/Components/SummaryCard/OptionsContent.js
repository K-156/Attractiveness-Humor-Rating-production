import { Box, getCardHeaderUtilityClass, Typography } from "@mui/material";
import _ from "lodash";

import MoreText from "./MoreText";
import "./SummaryCard.css";
import { variableMap } from "../../Utils/templateList";

const OptionsContent = ({ content, handleOnClick, header }) => {
  const instructionText = content["instruction"];
  const characteristicsText = content["characteristics"];
  
  const optionContent = Object.fromEntries(
    ["option1", "option2", "option3", "option4"].map((key, index) => {
      return [key, content[index + 1]];
    })
  );

  return (
    <>
      <Box className="twoColumns">
        <Typography className="summaryVariable">Instruction</Typography>
        {instructionText && instructionText.length > 100 ? (
          <MoreText
            handleOnClick={handleOnClick}
            id="Instruction"
            value={instructionText}
          />
        ) : (
          <Typography className="summaryText">{instructionText}</Typography>
        )}
      </Box>
      {content["characteristics"] && (
        <Box className="twoColumns">
          <Typography className="summaryVariable">Characteristics</Typography>
          <Box>
            <Typography className="summaryText">
              Lowerbound: {characteristicsText["lowerbound"]}
            </Typography>
            <Typography className="summaryText">
              Upperbound: {characteristicsText["upperbound"]}
            </Typography>
          </Box>
        </Box>
      )}
      {header.toLowerCase().includes("template 1") &&
        _.map(optionContent, (value, key) => {
          const optionNum = key[key.length - 1];
          return (
            <Box key={key}>
              <Box sx={{ mx: "10px", mt: 2 }}>
                <Typography className="summaryText" sx={{ fontWeight: "bold" }}>
                  Option {optionNum}
                </Typography>
              </Box>
              {_.map(value, (aValue, aKey) => {
                return (
                  <Box key={aKey} className="twoColumns">
                    {aKey !== "link" && (
                      <Typography className="summaryVariable">
                        {variableMap[aKey]}
                      </Typography>
                    )}
                    {typeof aValue === "string" && aValue.length > 100 ? (
                      <MoreText
                        handleOnClick={handleOnClick}
                        id={variableMap[aKey]}
                        value={aValue}
                      />
                    ) : aKey.toLowerCase() === "attributes" ? (
                      <Box>
                        {_.map(aValue, (attribute, index) => {
                          return (
                            <Typography key={index} className="summaryText">
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
        })}
    </>
  );
};

export default OptionsContent;
