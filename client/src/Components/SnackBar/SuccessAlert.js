import { Alert, Button, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";

const SuccessAlert = ({ isSuccess, setIsSuccess, text }) => {

    return(
        <Snackbar
            open={isSuccess}
            autoHideDuration={6000}
            onClose={(event, reason) => {  
                reason === "timeout" && setIsSuccess(false)
            }}
        >   
            <Alert severity="success">
                { text ? text : "Changes saved" }
                <Button
                    sx={{color: "#000000", minWidth:"10px", ml: 2}}
                    onClick={() => setIsSuccess(false)}
                >
                    < CgClose style={{PointerEvent: "none"}}/>
                </Button>
            </Alert>
        </Snackbar>
    )
}

export default SuccessAlert;