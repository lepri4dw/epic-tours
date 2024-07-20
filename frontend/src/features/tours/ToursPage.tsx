import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Tour} from "../../types";
import {selectTours, selectToursFetching} from "./toursSlice";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {selectUser} from "../users/usersSlice";
import React, {useEffect} from "react";
import {fetchTours} from "./toursThunks";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton, ListItemText,
  Typography
} from "@mui/material";
import TourItem from "./components/TourItem";
import {selectDestinations, selectDestinationsFetching} from "../destiantions/destinationsSlice";
import {fetchDestinations} from "../destiantions/destinationsThunks";

const ToursPage = () => {
  const dispatch = useAppDispatch();
  const tours: Tour[] = useAppSelector(selectTours);
  const loading = useAppSelector(selectToursFetching);
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const location = useLocation();
  const pathname = location.pathname;
  const currentDestination = (new URLSearchParams(location.search)).get('destination');
  const destinations = useAppSelector(selectDestinations);
  const destLoading = useAppSelector(selectDestinationsFetching);

  useEffect(() => {
    window.scrollTo(0, 0); // Прокрутка страницы вверх при изменении маршрута
  }, [location.pathname]);

  useEffect(() => {
    dispatch(fetchTours(currentDestination || undefined));
  }, [dispatch, currentDestination]);

  useEffect(() => {
    dispatch(fetchDestinations());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Box className="section">
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Typography variant="h3" align="center" gutterBottom className="section-title">
              ALL TOURS
            </Typography>
          </Grid>
          {user && user.role === 'admin' && (<Grid item>
            <Button
              variant="contained"
              onClick={() => {
                navigate('/tours/new');
              }}
            >
              Создать
            </Button>
          </Grid>)}
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            {destLoading ?
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress/>
              </Box> :
              <Box>
                <List>
                  <ListItem disablePadding selected={pathname === '/tours' && !currentDestination}>
                    <ListItemButton component={NavLink} to="/tours">
                      <ListItemText primary="All"/>
                    </ListItemButton>
                  </ListItem>
                  {destinations.map((destination) => (
                    <ListItem
                      disablePadding
                      selected={pathname === '/tours' && currentDestination === destination._id}
                      key={destination._id}
                    >
                      <ListItemButton component={NavLink} to={`/tours?destination=${destination._id}`}>
                        <ListItemText primary={destination.name}/>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            }
          </Grid>
          <Grid item xs={12} sm={9}>
            {loading ?
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress/>
              </Box> :
              <Grid container spacing={3}>
                {tours.map(tour => (
                  <Grid item xs={12} md={6}>
                    <TourItem key={tour._id} tour={tour}/>
                  </Grid>
                ))}
              </Grid>
            }
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ToursPage;
