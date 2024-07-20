import React, {useEffect} from 'react';
import {
  Grid,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import {styled} from '@mui/system';
import '../../App.css';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Tour} from "../../types";
import {useNavigate} from "react-router-dom";
import {fetchTours} from "./toursThunks";
import {selectTours, selectToursFetching} from "./toursSlice";
import {selectUser} from "../users/usersSlice";
import TourItem from "./components/TourItem";


const CustomButton = styled(Button)({
  marginTop: '20px',
  backgroundColor: '#FF6F61',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#FF3D33',
  },
  fontWeight: 'bold',
});


const Tours = () => {
  const dispatch = useAppDispatch();
  const tours: Tour[] = useAppSelector(selectTours);
  const loading = useAppSelector(selectToursFetching);
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch]);

  return (
    <Box className="section">
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Typography variant="h4" align="center" gutterBottom className="section-title">
            POPULAR TOURS
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
          {tours.slice(0, 3).map(tour => (
            <Grid item xs={12} sm={6} md={4}>
              <TourItem key={tour._id} tour={tour} />
            </Grid>
          ))}
        </Grid>
      }
      <CustomButton variant="contained" className="section-button" onClick={() => navigate('/tours')}>VIEW ALL TOURS</CustomButton>
    </Box>
  );
};

export default Tours;
