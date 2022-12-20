import { useAppContext } from '../../Context/AppContext';

import { CircularProgress, Box } from '@mui/material/';

import { colorPalette } from '../../Utils/colorPalette';

const LoadingAnimation = ({ isSurvey }) => {

  const { theme } = useAppContext();

    return (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress 
            sx={{
              color: colorPalette[isSurvey ? theme : "green"]["primary"],
              m:"3rem auto"
            }} 
          />
        </Box>
      );
}

export default LoadingAnimation;