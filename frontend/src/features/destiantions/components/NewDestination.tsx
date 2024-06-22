import React from 'react';
import DestinationForm from './DestinationForm';
import {DestinationMutation} from "../../../types";
import {useAppDispatch} from "../../../app/hooks";
import {createDestination} from "../destinationsThunks";
import {useNavigate} from "react-router-dom";
import {Container} from "@mui/material";
import {cleanError} from "../destinationsSlice";

const NewDestination: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (mutation: DestinationMutation) => {
    await dispatch(createDestination(mutation)).unwrap();
    dispatch(cleanError());
    navigate('/')
  };

  return (
    <Container>
      <h1>Создать новое напhавление</h1>
      <DestinationForm onSubmit={onFormSubmit} />
    </Container>
  );
};

export default NewDestination;
