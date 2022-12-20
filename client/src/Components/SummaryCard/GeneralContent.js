import { 
    Box, 
    Typography
} from "@mui/material";
import _ from "lodash";

import MoreText from "./MoreText";
import "./SummaryCard.css";
import { variableMap } from "../../Utils/templateList";

const GeneralContent = ({ content, handleOnClick }) => {
    return(
        <>
        {_.map(content, (value, key) => {
            return(
                <Box
                    key={key} 
                    className="twoColumns"
                >
                    <Typography className="summaryVariable" >
                        {variableMap[key]}
                    </Typography>
                    { typeof(value) === "string" && value.length > 100 ?
                        <MoreText 
                            handleOnClick={handleOnClick}
                            id={variableMap[key]}
                            value={value}
                        />
                    :   ["roles", "questions", "audio", "introductions", "messageOptions"].includes(key) ? 
                            <Box>
                            { _.map(value, (aValue, index) => {
                                return (
                                    <Typography 
                                        key={index}
                                        className="summaryText"
                                    >   
                                        {index+1}. {aValue}
                                    </Typography>
                                )
                            })  
                            }
                            </Box>                     
                    :   <Typography className="summaryText">                  
                            { key === "duration" ?
                                `${value} mins`
                            : key === "nextButton" ?
                                `${value ? "Yes" : "No"}`
                            : value 
                            }
                        </Typography>
                    }
                </Box>
            )
        })}
        </>
    )
}

export default GeneralContent;