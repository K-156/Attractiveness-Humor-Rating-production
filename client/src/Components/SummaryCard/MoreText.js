import { 
    Link,
    Typography
} from "@mui/material";

import "./SummaryCard.css";

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
                    color:"#C59D5F", 
                    fontSize: "14px",
                    cursor:"pointer",
                    textDecorationColor: "#C59D5F", 
                    ml: "2px",
                    "&:hover": {
                        color:"#264653", 
                        textDecorationColor: "#264653", 
                    }
                }}
            >
                More
            </Link>
        </>
    )
}

export default MoreText;