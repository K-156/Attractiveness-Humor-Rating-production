import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import _, { mapValues } from "lodash";

const AudioForm = ({ data, setRating, isWritten }) => {

  const [listen, setListen] = useState(false);

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;


    setRating((state) => ({
      ...state,
      [name]: value
    }));
  };

  let arr = [];

  for (const [key, value] of Object.entries(data)) {
    arr.push(value)
  }

  return (
    <>
      {!listen && !isWritten ? (
        <Card>
          <CardContent sx={{p:"24px"}} >
            <Box className="center">
              <FormControl>
                <FormLabel 
                  sx={{ 
                    color: "#000000", 
                    fontSize: "14px",
                    "&.Mui-focused": {
                      color:"#000000"
                    }
                  }}
                >
                  I have finished listening to the recording
                </FormLabel>
                <RadioGroup 
                  row 
                  sx={{ justifyContent: "center" }}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio size="small" />}
                    label="Yes"
                    labelPlacement="start"
                    sx={{ ".MuiFormControlLabel-label": { fontSize: "14px" } }}
                    onChange={() => setListen(true)}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardContent>
              <Grid container gap={1}>
                {_.map(arr, (value, index) => {
                  return (
                    <Grid 
                      container 
                      key={index} 
                      gap={3}
                    >
                      <Grid
                        item
                        xs={7}
                        className="flexEnd"
                      >
                        <Typography sx={{fontSize:"14px"}}>{value["questions"]}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <FormControl fullWidth>
                          <TextField
                              required
                              fullWidth
                              select
                              name={index}
                              label="Rate"
                              defaultValue=""
                              onChange={handleOnChange}
                          >
                              {_.map(_.range(Number(value["lowerNum"]), Number(value["upperNum"]) + 1), (num) => {
                              return (
                                  <MenuItem 
                                      key={num} 
                                      id={num} 
                                      value={num}
                                  >
                                      {num} 
                                      {num === Number(value["lowerNum"]) ? ` (${value["lowerText"]})` :
                                        num === Number(value["upperNum"]) ? ` (${value["upperText"]})` : "" }
                                  </MenuItem>
                              );
                              })}
                          </TextField>
                        </FormControl>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

export default AudioForm;
