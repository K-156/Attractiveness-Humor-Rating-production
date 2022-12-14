import { Button, Tooltip } from "@mui/material";

const Instruction = ({ type }) => {

    // const text = sessionStorage.getItem(type);
    const data = JSON.parse(localStorage.getItem("data"));

    return(
        <div display="flex" justifycontent="flex-start">
            <Tooltip 
                // title={data[`${type}Instruc`]}
                placement="bottom-start"
                slotProps= {{
                    tooltip: {
                        sx: {
                            backgroundColor: "#D7E5EB", 
                            color: "#264653", 
                            p: 2, 
                            border: "solid 1px #264653", 
                            fontSize: "12px", 
                            textAlign: "center", 
                            maxWidth: 800, 
                            whiteSpace: "pre-line"
                        }
                    }
                }}                
            >
                <Button
                    variant="contained"
                    sx={{background: "#264653", textTransform: "none", '&:hover': {backgroundColor:"#264653"}}}            
                >
                    Instruction
                </Button>
            </Tooltip>
        </div>
        
    )
}

export default Instruction;