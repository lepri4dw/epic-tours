import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Tour} from "../../types";
import {selectTours, selectToursFetching} from "./toursSlice";
import {useNavigate} from "react-router-dom";
import {selectUser} from "../users/usersSlice";
import React, {useEffect} from "react";
import {fetchTours} from "./toursThunks";
import {Box, Button, CircularProgress, Container, Grid, Typography} from "@mui/material";
import TourItem from "./components/TourItem";

const ToursPage = () => {
  const dispatch = useAppDispatch();
  const tours: Tour[] = useAppSelector(selectTours);
  const loading = useAppSelector(selectToursFetching);
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchTours());
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
        {loading ?
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress/>
          </Box> :
          <Grid container spacing={3}>
            {tours.map(tour => (
              <TourItem key={tour._id} tour={tour} />
            ))}
          </Grid>
        }
      </Box>
    </Container>
  );
};

export default ToursPage;
