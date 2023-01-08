import { Box, Typography } from "@mui/material";
import _ from "lodash";

import MoreText from "./MoreText";
import "./SummaryCard.css";
import { variableMap } from "../../Utils/templateList";

const GeneralContentRoles = ({ content, handleOnClick }) => {
  return (
    <>
      {_.map(content, (arr, role) => {
        const displayOutput = _.map(arr, (value, key) => {
          return (
            <Box key={key} className="twoColumns">
              <Typography className="summaryVariable">
                {variableMap[key]}
              </Typography>
              {typeof value === "string" &&
              value.length > 100 &&
              key !== "graphicLink" ? (
                <MoreText
                  handleOnClick={handleOnClick}
                  id={variableMap[key]}
                  value={value}
                />
              ) : [
                  "roles",
                  "questions",
                  "audio",
                  "introductions",
                  "messages",
                  "email",
                  "range",
                  "audioLink",
                ].includes(key) ? (
                <Box>
                  {_.map(value, (aValue, index) => {
                    if (key === "range") {
                      return (
                        <Typography key={key} className="rangeText">
                          {`${index} bound: ${aValue.number} represents ${aValue.text}`}
                        </Typography>
                      );
                    } else if (key === "questions") {
                      return (
                        <Typography
                          key={key}
                          sx={{
                            fontSize: "14px",
                            color: "#264653",
                          }}
                        >
                          {index + 1}. {aValue["questions"]} (
                          {aValue["lowerNum"]} -{aValue["lowerText"]},{" "}
                          {aValue["upperNum"]} -{aValue["upperText"]})
                        </Typography>
                      );
                    } else {
                      return (
                        key !== "audioLink" && (
                          <Typography key={key} className="summaryText">
                            {index + 1}. {aValue}
                          </Typography>
                        )
                      );
                    }
                  })}
                </Box>
              ) : (
                !key.includes("Link") && (
                  <Typography className="summaryText">{value}</Typography>
                )
              )}
            </Box>
          );
        });
        return (
          <>
            {
              <Box className="twoColumns">
                <Typography className="summaryHeader">{role}</Typography>
              </Box>
            }
            {displayOutput}
          </>
        );
      })}
    </>
  );
};

export default GeneralContentRoles;