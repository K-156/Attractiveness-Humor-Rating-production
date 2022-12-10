import { CircularProgress, Box } from '@mui/material/';

const LoadingAnimation = () => {
    return (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress sx={{color: "#264653"}} />
        </Box>
      );
}

export default LoadingAnimation;