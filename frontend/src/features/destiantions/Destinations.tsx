import React, {useEffect} from 'react';
import {selectDestinationDeleting, selectDestinations, selectDestinationsFetching} from './destinationsSlice';
import {
  Box, Button,
  CircularProgress, Grid, IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography, useMediaQuery, useTheme
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {deleteDestination, fetchDestinations} from "./destinationsThunks";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {apiURL} from "../../constants";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DeleteIcon from "@mui/icons-material/Delete";
import {selectUser} from "../users/usersSlice";
import EditIcon from "@mui/icons-material/Edit";

const Destinations: React.FC = () => {
  const dispatch = useAppDispatch();
  const destinations = useAppSelector(selectDestinations);
  const loading = useAppSelector(selectDestinationsFetching);
  const navigate = useNavigate();
  const deleteLoading = useAppSelector(selectDestinationDeleting);
  const user = useAppSelector(selectUser);

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    event.stopPropagation();
    event.preventDefault();
    if (window.confirm('Подтвердите удаление этого объявления')) {
      await dispatch(deleteDestination(id));
      dispatch(fetchDestinations());
    }
  }

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    event.stopPropagation();
    event.preventDefault();
    navigate(`/destinations/edit/${id}`)
  }

  useEffect(() => {
    dispatch(fetchDestinations());
  }, [dispatch]);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

  let cols = 1;
  if (isXs) cols = 1;
  else if (isSm || isMd) cols = 2;
  else if (isLg) cols = 3;

  let gap;
  if (isXs) gap = 10;
  else if (isSm) gap = 15;
  else if (isMd) gap = 20;
  else if (isLg) gap = 25;


  return (
    <Box sx={{width: '100%', height: '100%', padding: 2, mt: 5}}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Typography variant="h4" gutterBottom style={{textAlign: 'center'}} className="section-title">
            TOP NOTCH DESTINATIONS
          </Typography>
        </Grid>
        {user && user.role === 'admin' && (<Grid item>
          <Button
            variant="contained"
            onClick={() => {
              navigate('/destinations/new');
            }}
          >
            Создать
          </Button>
        </Grid>)}
      </Grid>
      {loading ?
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress/>
        </Box> :
        <ImageList
          sx={{
            margin: '0 auto',
            padding: {xs: '10px 0px', sm: '10px 0px', lg: '10px 20px', xl: '10px 30px'},
            width: '100%',

          }}
          cols={cols}
          variant="quilted"
          rowHeight={315}
          gap={gap}
        >
          {destinations.map((destination) => (
            <ImageListItem
              key={destination._id}
              sx={{
                cursor: 'pointer',
                border: '10px solid white',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                transition: 'transform 0.5s ease-in-out',
                position: 'relative',
                '&:hover': {
                  transform: 'scale(1.05)',
                  background: 'rgba(0, 0, 0, 0.5)',
                },
              }}
              cols={cols !== 1 ? destination.cols || 1 : 1}
              rows={cols !== 1 ? destination.rows || 1 : 1}
              onClick={() => navigate('/')}
            >
              {user && user.role === 'admin' && (
                <Grid container spacing={2} style={{position: 'absolute', top: '10px', left: '10px', zIndex: 10}}>
                  <Grid item>
                    <IconButton
                      disabled={deleteLoading ? deleteLoading === destination._id : false}
                      onClick={(event) => handleDelete(event, destination._id)}
                    >
                      <DeleteIcon sx={{color: '#fff'}}/>
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={(event) => handleEdit(event, destination._id)}
                    >
                      <EditIcon sx={{color: '#fff'}}/>
                    </IconButton>
                  </Grid>
                </Grid>
              )}
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
                    fontSize: {xs: '26px', lg: '40px'},
                    padding: '15px 0',
                  },
                  '& .MuiImageListItemBar-subtitle': {
                    fontSize: {xs: '16px', lg: '24px'},
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
