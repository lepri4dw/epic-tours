import React from 'react';
import { Container, Grid, Typography, Card, CardMedia, CardContent, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import '../../App.css';
import { AccessTime, People, LocationOn } from '@mui/icons-material';
import Destinations from "../destiantions/Destinations";

const CustomButton = styled(Button)({
  marginTop: '20px',
  backgroundColor: '#FF6F61',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#FF3D33',
  },
  fontWeight: 'bold',
});

const CustomCard = styled(Card)({
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.3s ease',
  position: 'relative',
  '&:hover': {
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
});


const PriceTag = styled(Box)({
  position: 'absolute',
  top: '16px',
  right: '16px',
  backgroundColor: '#FF6F61',
  color: '#fff',
  padding: '4px 8px',
  borderRadius: '4px',
  fontWeight: 'bold',
});

const InfoBox = styled(Box)({
  position: 'absolute',
  bottom: '16px',
  left: '16px',
  right: '16px',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: '#fff',
  padding: '8px',
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});


// const PopularDestination = () => {
//   return (
//     <Container className="section">
//       <Typography variant="h4" align="center" gutterBottom className="section-title">
//         TOP NOTCH DESTINATION
//       </Typography>
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card className="card">
//             <CardMedia
//               component="img"
//               alt="Disney Land"
//               height="200"
//               image="path_to_disney_land_image"
//             />
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="div">
//                 Disney Land
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Thailand
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card className="card">
//             <CardMedia
//               component="img"
//               alt="Besseggen Ridge"
//               height="200"
//               image="path_to_besseggen_ridge_image"
//             />
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="div">
//                 Besseggen Ridge
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Norway
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card className="card">
//             <CardMedia
//               component="img"
//               alt="Oxolotan City"
//               height="200"
//               image="path_to_oxolotan_city_image"
//             />
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="div">
//                 Oxolotan City
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 New Zealand
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card className="card">
//             <CardMedia
//               component="img"
//               alt="Marina Bay Sand"
//               height="200"
//               image="path_to_marina_bay_sand_image"
//             />
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="div">
//                 Marina Bay Sand
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Singapore
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//       <CustomButton variant="contained" className="section-button">MORE DESTINATION</CustomButton>
//     </Container>
//   );
// };

const PopularPackages = () => {
  return (
    <Container className="section">
      <Typography variant="h4" align="center" gutterBottom className="section-title">
        POPULAR PACKAGES
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <CustomCard className="card">
            <CardMedia
              component="img"
              alt="Sunset view"
              height="200"
              image="path_to_sunset_view_image"
            />
            <PriceTag>$1,900 / per person</PriceTag>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Sunset view of beautiful lakeside resident
              </Typography>
              <InfoBox>
                <Box display="flex" alignItems="center">
                  <AccessTime fontSize="small" />
                  <Typography variant="body2" color="inherit" marginLeft={1}>
                    7D/6N
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <People fontSize="small" />
                  <Typography variant="body2" color="inherit" marginLeft={1}>
                    5 People
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <LocationOn fontSize="small" />
                  <Typography variant="body2" color="inherit" marginLeft={1}>
                    Malaysia
                  </Typography>
                </Box>
              </InfoBox>
              <Typography variant="body2" color="text.secondary" marginTop={2}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit luctus nec ullam. Ut elit tellus, luctus nec ullam elit tellus.
              </Typography>
            </CardContent>
          </CustomCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="card">
            <CardMedia
              component="img"
              alt="Natural beauty"
              height="200"
              image="path_to_natural_beauty_image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Sunset view of beautiful lakeside resident
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <AccessTime fontSize="small" />
                  <Typography variant="body2" color="text.secondary" marginLeft={1}>
                    7D/6N
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <People fontSize="small" />
                  <Typography variant="body2" color="text.secondary" marginLeft={1}>
                    5 People
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <LocationOn fontSize="small" />
                  <Typography variant="body2" color="text.secondary" marginLeft={1}>
                    Malaysia
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" marginTop={2}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit luctus nec ullam. Ut elit tellus, luctus nec ullam elit tellus.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="card">
            <CardMedia
              component="img"
              alt="Water city of Portugal"
              height="200"
              image="path_to_water_city_image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Sunset view of beautiful lakeside resident
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <AccessTime fontSize="small" />
                  <Typography variant="body2" color="text.secondary" marginLeft={1}>
                    7D/6N
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <People fontSize="small" />
                  <Typography variant="body2" color="text.secondary" marginLeft={1}>
                    5 People
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <LocationOn fontSize="small" />
                  <Typography variant="body2" color="text.secondary" marginLeft={1}>
                    Malaysia
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" marginTop={2}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit luctus nec ullam. Ut elit tellus, luctus nec ullam elit tellus.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <CustomButton variant="contained" className="section-button">VIEW ALL PACKAGES</CustomButton>
    </Container>
  );
};

const Tours = () => {
  return (
    <div>
      <Destinations/>
      <PopularPackages />
    </div>
  );
};

export default Tours;
