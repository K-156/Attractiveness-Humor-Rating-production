import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  Typography,
} from "@mui/material";
import moment from "moment";
import { FiClock } from "react-icons/fi";
import { HiArrowLeft } from "react-icons/hi";
import { colorPalette } from "../../Utils/colorPalette";

const durationMin = localStorage.getItem("duration");

const Timer = () => {
  const { theme, user, removeUserFromLocalStorage } = useAppContext();

  const Ref = useRef(null);
  const navigate = useNavigate();
  const [timer, setTimer] = useState("00:00:00");
  const [isWarning, setIsWarning] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  let duration = { hour: 0, min: 0, inSec: 0 };

  useEffect(() => {
    duration = formatDuration(remainingTime / 60000);
    clearTimer(getDeadTime());
  }, []);

  const expirationTime = durationMin;
  let otpTimestamp = user.startTime; // Timestamp when the OTP was generated

  // Calculate the time remaining
  let remainingTime =
    user.role === "admin"
      ? durationMin * 60000
      : durationMin * 60000 - (moment(Date.now()) - moment(otpTimestamp));

  // Timer function that checks for expired OTPs
  setInterval(() => {
    // Check if the OTP has expired
    if (moment(Date.now()) - moment(otpTimestamp) > expirationTime * 60000) {
      // Kick out the participant
      setIsAlert(true);
    }
    if (isAlert === true) {
      removeUserFromLocalStorage();
      navigate("/");
    }
  }, 5000);

  const formatDuration = (duration) => {
    const hour = Math.floor(duration / 60);
    const min = Math.floor(duration % 60);
    const inSec = duration * 60;

    return { hour: hour, min: min, inSec: inSec };
  };

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);

    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }

    if (hours === 0 && minutes === 1 && seconds === 0) {
      setIsWarning(true);
    } else if (hours === 0 && minutes === 0 && seconds === 0) {
      // setIsAlert(true);
    }
  };

  const clearTimer = (e) => {
    setTimer(
      (duration.hour > 9 ? duration.hour : "0" + duration.hour) +
        ":" +
        (duration.min > 9 ? duration.min : "0" + duration.min) +
        ":" +
        "00"
    );

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + duration.inSec);
    return deadline;
  };

  return (
    <>
      <Typography
        className="center"
        sx={{
          color: isWarning ? "#F47070" : colorPalette[theme]?.["secondary"],
          mb: 1,
          fontSize: "14px",
        }}
      >
        <FiClock style={{ marginRight: "15px" }} />
        {timer}
      </Typography>
      <Dialog open={isAlert}>
        <Alert severity="error" sx={{ px: 3, pt: 2 }}>
          <AlertTitle>
            <b>Time's up!</b>
          </AlertTitle>
          Thank you for taking your time to complete the survey.
          <br />
          Your responses have been saved.
          <br />
        </Alert>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "rgb(253, 237, 237)",
            pt: 1,
            pb: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#ef5350",
              "&:hover": { backgroundColor: "#915b5a" },
            }}
            onClick={() => navigate("/")}
          >
            <HiArrowLeft style={{ marginRight: "10px" }} />
            Return to homepage
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default Timer;
