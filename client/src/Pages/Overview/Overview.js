import { useState } from "react";

import { 
    Autocomplete, 
    Box, 
    Button,
    TextField
} from "@mui/material";
import _ from "lodash";

import OverviewTable from "../../Components/Tables/OverviewTable";

const options = ["123","345","567","891"]

const Overview = () => {

    const [projectId, setProjectId] = useState(options[0]);

    const handleOnClick = () => {
        // filter according to project id
    }

    return(
    <div>
        <script>
            { document.title = "Overview" }
        </script>
        <Box
            sx={{display: "flex"}}
        >
            <Autocomplete
                options={options}
                sx={{width: 250, mr: 3}}
                value={projectId}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        label="Project ID" 
                        size="small"
                    />
                }
                onChange={(event, value)=>{
                    if (value) {
                        setProjectId(value)
                    }
                }}
            />
            <Button
                variant="contained"
                className="customButton-green"
                sx={{px: 3}}
                onClick={handleOnClick}
            >
                Search
            </Button>
        </Box>
        <OverviewTable 
            data={data}
            projectId={projectId}
        />
        
    
    </div>
)
}


export default Overview;

const data = [
    {  
        id_: 1,
        option1_rank: 7, 
        option2_rank: 8, 
        option3_rank: 5, 
        option4_rank: 8, 
        best_q1: 8, 
        best_q2: 2, 
        best_q3: 5,
        best_q4: 3, 
        best_q5: 2,
    }, 
    {   
        id_: 2,
        option1_rank: 4, 
        option2_rank: 2, 
        option3_rank: 1, 
        option4_rank: 7, 
        best_q1: 5, 
        best_q2: 3, 
        best_q3: 2,
        best_q4: 7, 
        best_q5: 8,
    },
    {   
        id_: 3,
        option1_rank: 4, 
        option2_rank: 2, 
        option3_rank: 1, 
        option4_rank: 7, 
        best_q1: 5, 
        best_q2: 3, 
        best_q3: 2,
        best_q4: 7, 
        best_q5: 8,
    },
    {   
        id_: 4,
        option1_rank: 7, 
        option2_rank: 8, 
        option3_rank: 5, 
        option4_rank: 8, 
        best_q1: 8, 
        best_q2: 2, 
        best_q3: 5,
        best_q4: 3, 
        best_q5: 2,
    }, 
    {   
        id_: 5,
        option1_rank: 4, 
        option2_rank: 2, 
        option3_rank: 1, 
        option4_rank: 7, 
        best_q1: 5, 
        best_q2: 3, 
        best_q3: 2,
        best_q4: 7, 
        best_q5: 8,
    },
]

