import { Alert, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import { CgClose } from "react-icons/cg";

const ErrorAlert = ({ isError, text }) => {

    const [open, setOepn] = useState(isError);

    return(
        <Snackbar
            open={open}
        >   
            <Alert severity="error">
                { text ? text : "Error"}
                <Button
                    sx={{color: "#000000", minWidth:"10px", ml: 2}}
                    onClick={() => setOepn(false)}
                >
                    < CgClose style={{PointerEvent: "none"}}/>
                </Button>
            </Alert>
        </Snackbar>
    )
}

export default ErrorAlert;