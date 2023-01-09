import { useAppContext } from "../../Context/AppContext";

import { 
    Button, 
    Tooltip 
} from "@mui/material";

import { colorPalette } from "../../Utils/colorPalette";

const Instruction = ({ type }) => {

    const { theme, sectionNum } = useAppContext();

    // const text = sessionStorage.getItem(type);
    const {data, sections} = JSON.parse(localStorage.getItem("data"));
    const role = sessionStorage.getItem("role");

    return(
        <div className="flexStart">
            <Tooltip 
                title={data[sectionNum][sections[sectionNum]][role].instruction}
                placement="bottom-start"
                slotProps= {{
                    tooltip: {
                        sx: {
                            backgroundColor: colorPalette[theme]["primaryLight"], 
                            color: colorPalette[theme]["primary"], 
                            p: 2, 
                            border: `solid 1px ${colorPalette[theme]["primary"]}`, 
                            fontSize: "14px", 
                            textAlign: "center", 
                            maxWidth: 800, 
                            whiteSpace: "pre-line"
                        }
                    }
                }}                
            >
                <Button
                    variant="contained"
                    className={`customButton-${theme}`} 
                    sx={{"&.MuiButton-contained:hover": {
                        background: colorPalette[theme]["primary"]
                    }}}
                >
                    Instruction
                </Button>
            </Tooltip>
        </div>
        
    )
}

export default Instruction;