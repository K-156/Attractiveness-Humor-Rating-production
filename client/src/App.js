import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { CssBaseline } from "@mui/material";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Attractive from "./Pages/Attractive/Attractive";
import Audio from "./Pages/Audio/Audio";
import AudioQn from "./Pages/AudioQn/AudioQn";
import Description from "./Pages/Description/Description";
import "./index.css";

function App() {

  return (
    <div id="layout">
      <CssBaseline />
      <Router> 
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/attractive' element={<Attractive />} />
            <Route path='/attractive/:id' element={<Description />} />
          <Route path='/login' element={<Login />} />
          <Route path='/audio' element={<Audio />} />
            <Route path='/audio/q1' element={<AudioQn />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
