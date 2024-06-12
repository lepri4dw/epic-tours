import React, { useEffect } from 'react';
import { selectDestinations, selectDestinationsFetching } from './destinationsSlice';
import {
  Box,
  CircularProgress,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {Destination} from "../../types";
import {fetchDestinations} from "./destinationsThunks";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {apiURL} from "../../constants";

const Destinations: React.FC = () => {
  const dispatch = useAppDispatch();
  const destinations: Destination[] = useAppSelector(selectDestinations);
  const loading = useAppSelector(selectDestinationsFetching);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDestinations());
  }, [dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', height: '100%', padding: 2 }}>
      <Typography variant="h4" gutterBottom style={{textAlign: 'center'}}>
        TOP NOTCH DESTINATIONS
      </Typography>
      <ImageList variant="quilted" cols={2} rowHeight={500} gap={50}>
        {destinations.map((destination) => (
          <ImageListItem
            key={destination._id}
            sx={{
              cursor: 'pointer',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
            onClick={() => navigate('/')}
          >
            <img
              src={`${apiURL + '/' + destination.image}?w=248&fit=crop&auto=format`}
              srcSet={`${apiURL + '/' + destination.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={destination.name}
              loading="lazy"
            />
            <ImageListItemBar
              title={destination.name}
              position="top"
              sx={{
                background: 'rgba(0, 0, 0, 0.5)',
                '& .MuiImageListItemBar-title': {
                  fontWeight: 'bold',
                },
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default Destinations;
