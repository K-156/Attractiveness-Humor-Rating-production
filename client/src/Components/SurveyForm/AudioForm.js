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
import _ from "lodash";

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
                {_.map(data, (value) => {
                  return (
                    <Grid 
                      container 
                      key={value["id_"]} 
                      gap={3}
                    >
                      <Grid
                        item
                        xs={7}
                        className="flexEnd"
                      >
                        <Typography sx={{fontSize:"14px"}}>{value["question"]}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <FormControl fullWidth>
                          <TextField
                              required
                              fullWidth
                              select
                              name={String(value["id_"])}
                              label="Rate"
                              defaultValue=""
                              onChange={handleOnChange}
                          >
                              {_.map(_.range(value["lower"]["number"], value["upper"]["number"] + 1), (num) => {
                              return (
                                  <MenuItem 
                                      key={num} 
                                      id={num} 
                                      value={num}
                                  >
                                      {num} 
                                      {num === value["lower"]["number"] ? ` (${value["lower"]["text"]})` :
                                        num === value["upper"]["number"] ? ` (${value["upper"]["text"]})` : "" }
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
