import React, {useEffect} from 'react';
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  CircularProgress,
  CardActionArea
} from '@mui/material';
import {styled} from '@mui/system';
import '../../App.css';
import {AccessTime, LocationOn} from '@mui/icons-material';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Tour} from "../../types";
import {useNavigate} from "react-router-dom";
import {fetchTours} from "./toursThunks";
import {apiURL} from "../../constants";
import {selectTours, selectToursFetching} from "./toursSlice";

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
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.3s ease',
  position: 'relative',
  '&:hover': {
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  overflow: 'hidden'
});

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

const PriceTag = styled(Box)({
  position: 'absolute',
  top: '20px',
  right: '0',
  backgroundColor: '#FF6F61',
  color: '#fff',
  padding: '8px 12px',
  fontSize: '18px'
});

const InfoBox = styled(Box)({
  position: 'absolute',
  top: '185px',
  right: '16px',
  left: '16px',
  backgroundColor: '#0190BE',
  color: '#fff',
  padding: '8px',
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const Description = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 6,
  WebkitBoxOrient: 'vertical',
  whiteSpace: 'normal',
});

const Tours = () => {
  const dispatch = useAppDispatch();
  const tours: Tour[] = useAppSelector(selectTours);
  const loading = useAppSelector(selectToursFetching);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch]);

  return (
    <Box className="section">
      <Typography variant="h4" align="center" gutterBottom className="section-title">
        POPULAR TOURS
      </Typography>
      {loading ?
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress/>
        </Box> :
        <Grid container spacing={3}>
          {tours.map(tour => (
            <Grid item xs={12} sm={6} md={4}>
              <CustomCard className="card" onClick={() => navigate(`/tours/${tour._id}`)}>
                <CardActionArea>
                  <ImageCardMedia
                    title={tour.title}
                    image={`${apiURL + '/' + tour.images[0]}`}
                  />
                  <PriceTag>${tour.price} / <span style={{fontSize: '14px'}}>per person</span></PriceTag>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{marginTop: '16px'}}>
                      {tour.title}
                    </Typography>
                    <InfoBox>
                      <Box display="flex" alignItems="center" sx={{flexShrink: 0, marginRight: '10px'}}>
                        <AccessTime fontSize="small"/>
                        <Typography variant="body2" color="inherit" marginLeft={1}>
                          {tour.duration}D/{tour.duration - 1}N
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" sx={{flex: '1 1 0', overflow: 'hidden'}}>
                        <LocationOn fontSize="small"/>
                        <Typography variant="body2" color="inherit" marginLeft={1}
                                    sx={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                          {tour.destinations.map(destination => destination.name).join(', ')}
                        </Typography>
                      </Box>
                    </InfoBox>
                    <Description variant="body2" color="text.secondary" marginTop={2}>
                      {tour.description}
                    </Description>
                  </CardContent>
                </CardActionArea>
              </CustomCard>
            </Grid>
          ))}
        </Grid>
      }
      <CustomButton variant="contained" className="section-button">VIEW ALL TOURS</CustomButton>
    </Box>
  );
};

export default Tours;
