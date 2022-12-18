import { CircularProgress, Box } from '@mui/material/';

const LoadingAnimation = ({center}) => {
    return (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress sx={{color: "#264653",margin:"3rem auto"}} />
        </Box>
      );
}

export default LoadingAnimation;