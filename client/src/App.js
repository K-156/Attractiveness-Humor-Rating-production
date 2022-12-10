import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { CssBaseline } from "@mui/material";

import "./index.css";
import { AppContext } from "./Context/AppContext";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Profiles from "./Pages/Attractive/Profiles";
import Audio from "./Pages/Audio/AudioInstruction";
import AudioRate from "./Pages/Audio/AudioRate";
import Description from "./Pages/Attractive/Description";
import Complete from "./Pages/Complete/Complete";
import Overview from "./Pages/Overview/Overview";
import DashboardLayout from "./Layout/DashboardLayout";
import SurveyLayout from "./Layout/SurveyLayout";
import Details from "./Pages/Details/Details";
import AttractiveInstruction from "./Pages/Attractive/AttractiveInstruction";
import AttractiveRate from "./Pages/Attractive/AttractiveRate";
import Rank from "./Pages/Attractive/Rank";
import ChatInstruction from "./Pages/Chat/ChatInstruction";
import ProtectedRoute from "./Pages/ProtectedRoute/ProtectedRoute";
import Chat from "./Pages/Chat/Chat";


function App() {
  const [open, setOpen] = useState(true);

  return (
    <div id="app">
      <CssBaseline />
      {/* <AppContext.Provider value={{ open, setOpen }}> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/details" element={<Details />} />
          <Route element={<SurveyLayout />}>
            <Route path="/attractive" element={<AttractiveInstruction />} />
            <Route path="/attractive/profile" element={<Profiles />} />
            <Route path="/attractive/profile/:id" element={<Description />} />
            <Route path="/attractive/rate" element={<AttractiveRate />} />
            <Route path="/attractive/rank" element={<Rank />} />
            <Route path="/audio-instruction" element={<Audio />} />
            <Route
              path="/audio/q1"
              element={
                <AudioRate
                  key="audioQ1"
                  title="1"
                  link="audio/q2"
                  isWritten={false}
                />
              }
            />
            <Route
              path="/audio/q2"
              element={
                <AudioRate
                  key="audioQ2"
                  title="2"
                  link="chat-instruction"
                  isWritten={false}
                />
              }
            />
            <Route path="/intro-instruction" element={<Audio />} />
            <Route
              path="/intro/q1"
              element={
                <AudioRate
                  key="writtenQ1"
                  title="1"
                  link="intro/q2"
                  isWritten={true}
                />
              }
            />
            <Route
              path="/intro/q2"
              element={
                <AudioRate
                  key="writtenQ2"
                  title="2"
                  link="chat-instruction"
                  isWritten={true}
                />
              }
            />
            <Route path="/chat-instruction" element={<ChatInstruction />} />
            <Route path='/attractive' element={<AttractiveInstruction />} />
            <Route path='/chat-instruction' element={<ChatInstruction />} />
            <Route
              path="/chat/q1"
              element={
                <Chat
                  key="chatQ1"
                  title="1"
                  link="chat/q2"
                />
              }
            />
             <Route
              path="/chat/q2"
              element={
                <Chat
                  key="chatQ2"
                  title="2"
                  link="complete"
                />
              }
            />
          </Route>
          <Route path="/complete" element={<Complete />} />

          <Route element={<DashboardLayout />}>
            <Route path="/overview" element={<Overview />} />

            {/* FOR TESTING */}
            <Route path="/test" element={<Overview />} />
          </Route>
        </Routes>
      </Router>
      {/* </AppContext.Provider> */}
    </div>
  );
}

export default App;
