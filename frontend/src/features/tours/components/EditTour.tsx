import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useNavigate, useParams} from "react-router-dom";
import {Container, Grid, Typography} from "@mui/material";
import {selectOneTour} from "../toursSlice";
import {fetchOneTour, updateTour} from "../toursThunks";
import {TourMutation} from "../../../types";
import TourForm from "./TourForm";
import {apiURL} from "../../../constants";

const EditTour = () => {
  const dispatch = useAppDispatch();
  const id = (useParams()).id as string;
  const navigate = useNavigate();
  const tour = useAppSelector(selectOneTour);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
    if (id) {
      void dispatch(fetchOneTour(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (tour && tour.images) {
      const fetchImages = async () => {
        const files = await Promise.all(
          tour.images.map(async (image: string) => {
            const response = await fetch(`${apiURL}/${image}`);
            const blob = await response.blob();
            return new File([blob], image.split('/').pop() || 'image.jpg', { type: blob.type });
          })
        );
        setImageFiles(files);
      };
      fetchImages();
    }
  }, [tour]);

  const onSubmit = async (tourMutation: TourMutation) => {
    await dispatch(updateTour({id, tour: tourMutation})).unwrap();
    navigate(`/tours/${id}`);
  };

  const existingTour = tour && {
    title: tour.title,
    images: imageFiles,
    destinations: tour.destinations.map(dest => dest._id),
    price: tour.price.toString(),
    description: tour.description,
    places: tour.places,
    route: null,
    duration: tour.duration.toString(),
    schedule: tour.schedule.map(item => {
      return {
        title: item.title,
        description: item.description,
        dayNumber: item.dayNumber.toString(),
      }
    })
  }

  return (
    <Container maxWidth="md">
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <Typography variant="h4">Редактировать объявление</Typography>
        </Grid>
        <Grid item xs>
          <TourForm onSubmit={onSubmit} existingTour={existingTour || undefined} isEdit/>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditTour;