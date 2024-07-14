import {Box, Button, Container, Grid, Typography, useMediaQuery} from "@mui/material";
import Destinations from "./destiantions/Destinations";
import Tours from "./tours/Tours";
import background from "../assets/images/main-bg.png";
import {styled} from "@mui/system";
import {useNavigate} from "react-router-dom";
import React from "react";
import Partners from "../components/UI/Partners";

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
        <img
          src={background}
          alt="Background"
          style={{
            position: 'absolute',
            top: '-70px',
            left: '0',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        />
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
        {/*<FeedbackForm/>*/}
      </Container>
    </>
  )
};

export default Home;