import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";

const AudioForm = ({ ques, setRating, isWritten }) => {
  const [error, setError] = useState({});
  const [listen, setListen] = useState(false);

  const handleOnChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;

    if (value < 1 || value > 9) {
      setError((state) => ({ ...state, [id]: true }));
      return;
    } else {
      setError((state) => ({ ...state, [id]: false }));
    }

    setRating((state) => ({
      ...state,
      [id]: event.target.value,
    }));
  };

  return (
    <>
      {!listen && !isWritten ? (
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="center">
              <FormControl>
                <FormLabel sx={{ color: "#000000", fontSize: "14px" }}>
                  I have finished listening to the recording
                </FormLabel>
                <RadioGroup row sx={{ justifyContent: "center" }}>
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
                {_.map(ques, (value, key) => {
                  return (
                    <Grid container key={key} gap={3}>
                      <Grid
                        item
                        xs={7}
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        <Typography variant="subtitle2">{value}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <FormControl fullWidth>
                          <TextField
                            required
                            id={String(key)}
                            label="Rate"
                            type="number"
                            InputProps={{ inputProps: { min: 1, max: 9 } }}
                            onChange={handleOnChange}
                            error={
                              error[key] !== undefined ? error[key] : false
                            }
                            helperText={
                              error[key] !== undefined && error[key]
                                ? "Rating out of range"
                                : ""
                            }
                          />
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
