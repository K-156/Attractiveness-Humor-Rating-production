import { Alert, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import { CgClose } from "react-icons/cg";

const SuccessAlert = ({ isSuccess, text }) => {

    const [open, setOepn] = useState(isSuccess);

    return(
        <Snackbar
            open={open}
        >   
            <Alert severity="success">
                { text ? text : "Changes saved" }
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

export default SuccessAlert;