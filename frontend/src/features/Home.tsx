import {Box, Button, Container, Typography} from "@mui/material";
import Destinations from "./destiantions/Destinations";
import Tours from "./tours/Tours";
import background from "../assets/images/main-bg.png";
import {styled} from "@mui/system";

const CustomButton = styled(Button)({
  backgroundColor: '#FF6F61',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#FF3D33',
  },
  fontWeight: 'bold',
});

const Home = () => {
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
              fontSize: { xs: '1rem', sm: '3rem', md: '4rem', lg: '5rem', xl: '5rem' },
              mb: 2,
            }}
          >
            Epic Tours your reliable partner <p style={{fontSize: '3rem', margin: '0'}}>to provide you with exceptional service each and every time!</p>
          </Typography>
          <CustomButton variant="contained" size="large">
            View Tours
          </CustomButton>
        </Container>
      </Box>
      <Container>
        <Destinations/>
        <Tours/>
      </Container>
    </>
  )
};

export default Home;