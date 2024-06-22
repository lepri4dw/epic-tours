import React, { useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectOneDestination } from '../destinationsSlice';
import { fetchOneDestination, updateDestination} from '../destinationsThunks';
import { DestinationMutation } from '../../../types';
import DestinationForm from './DestinationForm';

const EditDestination: React.FC = () => {
  const dispatch = useAppDispatch();
  const id = (useParams()).id as string;
  const navigate = useNavigate();
  const destination = useAppSelector(selectOneDestination);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneDestination(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (destinationMutation: DestinationMutation) => {
    await dispatch(updateDestination({ id, destination: destinationMutation })).unwrap();
    navigate('/');
  };

  const existingDestination = destination && {
    name: destination.name,
    image: null,
    rows: destination.rows ? destination.rows.toString() : '',
    cols: destination.cols ? destination.cols.toString() : '',
  };

  return (
    <Container maxWidth="md">
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <Typography variant="h4">Редактировать место назначения</Typography>
        </Grid>
        <Grid item xs>
          <DestinationForm onSubmit={onSubmit} existingDestination={existingDestination || undefined} isEdit />
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditDestination;