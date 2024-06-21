import React, {useEffect} from 'react';
import {selectDestinations, selectDestinationsFetching} from './destinationsSlice';
import {
  Box,
  CircularProgress,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {fetchDestinations} from "./destinationsThunks";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {apiURL} from "../../constants";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const Destinations: React.FC = () => {
  const dispatch = useAppDispatch();
  const destinations = useAppSelector(selectDestinations);
  const loading = useAppSelector(selectDestinationsFetching);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDestinations());
  }, [dispatch]);

  return (
    <Box sx={{width: '100%', height: '100%', padding: 2}}>
      <Typography variant="h4" gutterBottom style={{textAlign: 'center'}} className="section-title">
        TOP NOTCH DESTINATIONS
      </Typography>
      {loading ?
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress/>
        </Box> :
      <ImageList sx={{margin: '0 auto', padding: '10px 30px'}} variant="quilted" cols={3} rowHeight={315} gap={30}>
        {destinations.map((destination) => (
          <ImageListItem
            key={destination._id}
            sx={{
              cursor: 'pointer',
              border: '10px solid white',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              transition: 'transform 0.5s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
                background: 'rgba(0, 0, 0, 0.5)',
              },
            }}
            cols={destination.cols || 1}
            rows={destination.rows || 1}
            onClick={() => navigate('/')}
          >
            <img
              src={`${apiURL + '/' + destination.image}`}
              alt={destination.name}
              loading="lazy"
            />
            <ImageListItemBar
              title={destination.name}
              subtitle={`${destination.tourCount} Tours`}
              actionIcon={
                <LocationOnOutlinedIcon
                  sx={{color: 'white', marginRight: 2, fontSize: '2.5rem', marginBottom: '20px'}}/>
              }
              sx={{
                background: 'inherit',
                textAlign: 'right',
                '& .MuiImageListItemBar-title': {
                  fontSize: '2.5rem',
                  padding: '15px 0',
                },
                '& .MuiImageListItemBar-subtitle': {
                  fontSize: '1.5rem',
                },
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>}
    </Box>
  );
};

export default Destinations;
