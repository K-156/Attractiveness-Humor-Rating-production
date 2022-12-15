import { useState, useRef } from "react";

import AudioPlayer from "./AudioPlayer";
// import recording from "../../Assets/Audio/test.mp3";

const Audio = ({ src }) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioElem = useRef();

    const onPlaying = () => {
        setDuration(audioElem.current.duration);
        setCurrentTime(audioElem.current.currentTime);
    }


    return (
        <div>
            <audio 
                // src={recording}
                src={src}
                ref={audioElem}
                onTimeUpdate={onPlaying}
            />
            <AudioPlayer
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                audioElem={audioElem}
                duration={duration ? duration : 0}
                currentTime={currentTime}
            />
        </div>
    )
}

export default Audio;