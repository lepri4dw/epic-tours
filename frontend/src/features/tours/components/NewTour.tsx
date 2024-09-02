import React from "react";
import {useAppDispatch} from "../../../app/hooks";
import {useNavigate} from "react-router-dom";
import {TourMutation} from "../../../types";
import {Container} from "@mui/material";
import TourForm from "./TourForm";
import {createTour} from "../toursThunks";

const NewTour: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (mutation: TourMutation) => {
    await dispatch(createTour(mutation)).unwrap();
    navigate('/')
  };

  return (
    <Container>
      <h1>Создать новый тур</h1>
      <TourForm onSubmit={onFormSubmit} />
    </Container>
  );
};

export default NewTour;
