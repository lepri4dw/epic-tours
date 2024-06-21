import React, {useState} from 'react';
import {Grid, TextField} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {DestinationMutation} from "../../../types";
import {useAppSelector} from "../../../app/hooks";
import {selectDestinationError, selectDestinationSubmitting} from "../destinationsSlice";
import FileInput from "../../../components/UI/FileInput/FileInput";

interface Props {
  onSubmit: (destinationMutation: DestinationMutation) => void;
  existingDestination?: DestinationMutation;
  isEdit?: boolean;
}

const initialState: DestinationMutation = {
  name: '',
  image: null,
  rows: '',
  cols: '',
};

const DestinationForm: React.FC<Props> = ({
                                            onSubmit,
                                            isEdit,
                                            existingDestination = initialState,
                                          }) => {
  const submitting = useAppSelector(selectDestinationSubmitting);
  const error = useAppSelector(selectDestinationError);
  const [state, setState] = useState<DestinationMutation>(existingDestination);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(state);
    setState(initialState);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState((prev) => ({...prev, [name]: value}));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    setState((prev) => ({
      ...prev,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="name"
            name="name"
            label="Название"
            value={state.name}
            onChange={onChange}
            required
            disabled={submitting}
            error={Boolean(getFieldError('name'))}
            helperText={getFieldError('name')}
          />
        </Grid>
        <Grid item xs>
          <FileInput
            onChange={onFileChange}
            errorCheck={getFieldError}
            name="image"
            label="Загрузите изображение"
          />
        </Grid>
        <Grid item container spacing={2} xs>
          <Grid item xs={6}>
            <TextField
              id="rows"
              name="rows"
              label="Ряды"
              value={state.rows}
              type="number"
              inputProps={{min: 1, max: 10}}
              onChange={onChange}
              disabled={submitting}
              error={Boolean(getFieldError('rows'))}
              helperText={getFieldError('rows')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="cols"
              name="cols"
              label="Столбцы"
              type="number"
              inputProps={{min: 1, max: 10}}
              value={state.cols}
              onChange={onChange}
              disabled={submitting}
              error={Boolean(getFieldError('cols'))}
              helperText={getFieldError('cols')}
            />
          </Grid>
        </Grid>
        <Grid item xs>
          <LoadingButton
            loadingIndicator="Loading…"
            loading={submitting}
            disabled={submitting}
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

export default DestinationForm;
