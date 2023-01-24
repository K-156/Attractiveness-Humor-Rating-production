import { 
    Autocomplete, 
    Box, 
    Button,
    TextField 
} from "@mui/material";

const SearchBar = ({ handleSearch, handleSearchChange, projectId, options}) => {
    return(
        <Box sx={{ display: "flex" }}>
            <Autocomplete
                options={options}
                sx={{ width: 250, mr: 3 }}
                value={projectId}
                renderInput={(params) => (
                    <TextField {...params} label="Project" size="small" />
                )}
                onChange={handleSearchChange}
                isOptionEqualToValue={(option, value) => option === value}
            />
            <Button
                variant="contained"
                className="customButton-green"
                sx={{ px: 3 }}
                onClick={handleSearch}
            >
                Search
            </Button>
        </Box>
    )
}

export default SearchBar;