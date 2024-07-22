import {Box, Button, Container, Typography} from "@mui/material";
import Destinations from "../../features/destiantions/Destinations";
import Tours from "../../features/tours/Tours";
import {styled} from "@mui/system";
import {useNavigate} from "react-router-dom";
import React from "react";
import Partners from "../UI/Partners";
import backgroundVideoMP4 from '../../assets/videos/background.mp4';
import backgroundVideoWEBM from '../../assets/videos/background.webm';
import backgroundVideoFLV from '../../assets/videos/background.flv';
import backgroundVideoOGV from '../../assets/videos/background.ogv';
import background from '../../assets/images/main-bg.png';


const CustomButton = styled(Button)({
  backgroundColor: '#FF6F61',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#FF3D33',
  },
  fontWeight: 'bold',
});

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{position: 'relative', height: '85vh'}}>
        <video style={{
                 position: 'absolute',
                 top: '-70px',
                 left: '0',
                 width: '100%',
                 height: '100%',
                 objectFit: 'cover',
                 zIndex: -1,
               }} autoPlay loop muted poster={background}>
          <source src={backgroundVideoMP4} type="video/mp4; codecs=&quot;theora, vorbis&quot;" />
          <source src={backgroundVideoWEBM} type="video/webm; codecs=&quot;vp8, vorbis&quot;" />
          <source src={backgroundVideoOGV} type="video/ogg; codecs=&quot;theora, vorbis&quot;" />
          <object data={backgroundVideoMP4}>
            <embed src={backgroundVideoFLV}/>
          </object>
        </video>
        <Container
          maxWidth="xl"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: '#fff',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '5rem', xl: '5rem' },
              mb: 2,
            }}
          >
            Epic Tours your reliable partner <Typography sx={{fontSize: { xs: '20px', sm: '2rem', md: '2rem', lg: '2rem', xl: '3rem' } , margin: '0'}}>to provide you with exceptional service each and every time!</Typography>
          </Typography>
          <CustomButton variant="contained" size="large" onClick={() => navigate('/tours')}>
            View Tours
          </CustomButton>
        </Container>
      </Box>
      <Container>
        <Partners/>
        <Destinations/>
        <Tours/>
      </Container>
    </>
  )
};

export default Home;