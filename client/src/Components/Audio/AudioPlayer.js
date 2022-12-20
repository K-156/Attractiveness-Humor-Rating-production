import { useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";

import { 
    Box, 
    Button, 
    Card, 
    Slider, 
    Tooltip, 
    Typography 
} from "@mui/material";
import { 
    AiFillPauseCircle, 
    AiFillPlayCircle 
} from "react-icons/ai";
import { 
    BiFastForward, 
    BiRewind 
} from "react-icons/bi";
import { ColorPalette } from "../../Utils/ColorPalette";

const AudioPlayer = ({ isPlaying, setIsPlaying, audioElem, duration, currentTime}) => {

    const { theme } = useAppContext();

    useEffect(() => {
        isPlaying ? audioElem.current.play() : audioElem.current.pause();
    }, [isPlaying, audioElem])


    const formatTime = (time) => {
        const minutes = Math.floor(time/60);
        const seconds = Math.floor(time % 60);
        
        return  (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
    }

    return(
    <Card sx={{p:2}}>
        <Box className="center">
                <Typography 
                    sx={{
                        fontSize:"14px", 
                        mr: 2
                    }}
                >
                    {formatTime(currentTime)}
                </Typography>
                <Slider 
                    size="small"
                    value={Math.floor(currentTime)}
                    min={0}
                    max={duration}
                    onChange={(event) => audioElem.current.currentTime = event.target.value}
                    sx={{color: ColorPalette[theme]["primary"] }}
                />
                <Typography 
                    sx={{
                        fontSize:"14px", 
                        ml: 2
                    }}
                >
                    {`-${formatTime(duration - currentTime)}`}
                </Typography>
        </Box>
        <Box className="center">
            <Tooltip 
                title="Back 5s" 
                arrow
            >
                <Button
                    onClick={() => audioElem.current.currentTime = 
                            currentTime - 5 < 0 ? 0 : currentTime - 5}
                >
                    <BiRewind 
                        size={30}  
                        color={ColorPalette[theme]["primary"]}
                    />
                </Button>
            </Tooltip>
            <Button
                onClick={() => setIsPlaying(!isPlaying)}                
            >
                { isPlaying 
                    ? <AiFillPauseCircle 
                            size={30} 
                            color={ColorPalette[theme]["primary"]}
                        /> 
                    : <AiFillPlayCircle 
                            size={30} 
                            color={ColorPalette[theme]["primary"]}
                        /> 
                }  
            </Button>
            <Tooltip 
                title="Next 5s" 
                arrow
            >
                <Button
                    onClick={() => audioElem.current.currentTime = 
                                currentTime + 5 > duration ? duration : currentTime + 5}
                >
                    <BiFastForward 
                        size={30} 
                        color={ColorPalette[theme]["primary"]}
                    />                
                </Button>
            </Tooltip>
        </Box>
    </Card>
    )
}

export default AudioPlayer;