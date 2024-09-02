import React, {useState, useEffect} from 'react';
import {Grid, TextField, Typography, IconButton, ImageList, ImageListItem, Button} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TourMutation} from "../../../types";
import FileInput from "../../../components/UI/FileInput/FileInput";
import {selectTourError, selectTourSubmitting} from "../toursSlice";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectDestinations} from "../../destiantions/destinationsSlice";
import {fetchDestinations} from "../../destiantions/destinationsThunks";
import MultipleSelect from "../../../components/MultipleSelect/MultipleSelect";

interface Props {
  onSubmit: (tourMutation: TourMutation) => void;
  existingTour?: TourMutation;
  isEdit?: boolean;
}

const initialState: TourMutation = {
  title: '',
  images: null,
  destinations: [],
  price: '',
  description: '',
  route: null,
  places: '',
  duration: '',
  schedule: [],
};

const TourForm: React.FC<Props> = ({onSubmit, isEdit = false, existingTour = initialState}) => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<TourMutation>(existingTour);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const destinations = useAppSelector(selectDestinations);
  const error = useAppSelector(selectTourError);
  const loading = useAppSelector(selectTourSubmitting);

  useEffect(() => {
    dispatch(fetchDestinations());
  }, [dispatch]);

  useEffect(() => {
    if (existingTour) {
      setState(existingTour);
    }
  }, [existingTour]);

  useEffect(() => {
    if (state.images) {
      const imageUrls = state.images.map((image) => URL.createObjectURL(image));
      setImagePreviews(imageUrls);
    }
  }, [state.images]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = e.target;
    setState((prev) => ({...prev, [name]: value}));
  };

  const onFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;
    setState((prev) => ({
      ...prev,
      images: files ? (prev["images"] ? [...prev["images"], ...Array.from(files)] : Array.from(files)) : null,
    }));
  };

  const onScheduleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const { value, name } = e.target;

    setState((prevState) => {
      const updatedSchedule = [...prevState.schedule];
      updatedSchedule[index] = {
        ...updatedSchedule[index],
        [name]: value,
      };
      return { ...prevState, schedule: updatedSchedule };
    });
  };

  const addDayToSchedule = () => {
    setState((prevState) => ({
      ...prevState,
      schedule: [
        ...prevState.schedule,
        { title: '', description: '', dayNumber: '' },
      ],
    }));
  };

  const removeDayFromSchedule = (index: number) => {
    setState((prevState) => ({
      ...prevState,
      schedule: prevState.schedule.filter((_, idx) => idx !== index),
    }));
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(state);
    setState(initialState);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Grid container direction="column" spacing={2} sx={{mb: 4}}>
        <Grid item xs>
          <TextField
            id="title"
            label="Название"
            value={state.title}
            onChange={onChange}
            name="title"
            required
          />
        </Grid>

        <Grid item xs>
          <MultipleSelect
            label="Места назначения"
            selectedValues={state.destinations}
            onChange={(selectedIds) => setState({...state, destinations: selectedIds})}
            options={destinations}
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="price"
            label="Цена"
            value={state.price}
            onChange={onChange}
            type="number"
            name="price"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="description"
            label="Описание"
            value={state.description}
            onChange={onChange}
            name="description"
            required
            multiline
            rows={4}
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="places"
            label="Места"
            value={state.places}
            onChange={onChange}
            name="places"
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="duration"
            label="Продолжительность в днях"
            value={state.duration}
            onChange={onChange}
            name="duration"
            required type="number"
          />
        </Grid>

        {/*<Grid item xs>*/}
        {/*  <FileInput*/}
        {/*    label="Маршрут"*/}
        {/*    onChange={onFileChange}*/}
        {/*    name="route"*/}
        {/*    errorCheck={getFieldError}*/}
        {/*  />*/}
        {/*</Grid>*/}

        <Grid item xs>
          <FileInput
            label="Фотографии тура"
            onChange={onFilesChange}
            name="images"
            multiple
            errorCheck={getFieldError}
          />
        </Grid>

        <Grid item xs>
          <ImageList sx={{width: 1100, height: 'auto'}} cols={6} rowHeight={164}>
            {imagePreviews.map((img, index) => (
              <ImageListItem key={index}>
                <img src={img} alt={`Preview ${index}`} loading="lazy"/>
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  }}
                  aria-label="Delete"
                  onClick={() => {
                    const newImages = state.images?.filter((_, i) => i !== index) || null;
                    setState((prev) => ({...prev, images: newImages}));
                    const newPreviews = imagePreviews.filter((_, i) => i !== index);
                    setImagePreviews(newPreviews);
                  }}
                >
                  <DeleteIcon/>
                </IconButton>
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>

        <Grid item xs>
          <Typography variant="h6" gutterBottom>
            Расписание
          </Typography>
          {state.schedule.map((item, index) => (
            <Grid key={index} container spacing={2} direction="column" sx={{mb: 2}}>
              <Grid item container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <TextField
                    label="Номер дня"
                    value={item.dayNumber}
                    name="dayNumber"
                    onChange={(e) => onScheduleChange(e, index)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Название дня"
                    value={item.title}
                    name="title"
                    onChange={(e) => onScheduleChange(e, index)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    aria-label="Delete"
                    onClick={() => removeDayFromSchedule(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Описание"
                  value={item.description}
                  name="description"
                  onChange={(e) => onScheduleChange(e, index)}
                  fullWidth
                  multiline
                  rows={4}
                  required
                />
              </Grid>
            </Grid>
          ))}
          <Grid item>
            <Button
              variant="contained"
              onClick={addDayToSchedule}
              sx={{ bgcolor: 'info.dark' }}
            >
              Добавить день в расписание
            </Button>
          </Grid>
        </Grid>

        <Grid item xs>
          <LoadingButton
            loadingIndicator="Загрузка…"
            loading={loading}
            disabled={loading}
            type="submit"
            color="primary"
            variant="contained"
          >
            {isEdit ? 'Сохранить' : 'Отправить'}
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default TourForm;
