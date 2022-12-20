import { 
    Link,
    Typography
} from "@mui/material";

import "./SummaryCard.css";
import { colorPalette } from "../../Utils/colorPalette";

const MoreText = ({ handleOnClick, id, value}) => {
    return(
        <>
            <Typography className="summaryText">
                {value.substring(0,100)}...
            </Typography>
            <Link
                onClick={(event) => handleOnClick(event, value)}
                value={value}
                id={id}
                sx={{
                    color:colorPalette["green"]["secondary"], 
                    fontSize: "14px",
                    cursor:"pointer",
                    textDecorationColor: colorPalette["green"]["secondary"], 
                    ml: "2px",
                    "&:hover": {
                        color:colorPalette["green"]["primary"], 
                        textDecorationColor: colorPalette["green"]["primary"], 
                    }
                }}
            >
                More
            </Link>
        </>
    )
}

export default MoreText;