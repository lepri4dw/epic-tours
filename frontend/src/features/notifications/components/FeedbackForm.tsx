import React, {useState} from 'react';
import {
  Alert, Box,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import {borderRadius} from '../../../styles';
import {INotification} from '../../../types';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {createNotification} from '../notificationsThunks';
import {
  selectCreateNotificationError,
  selectNotificationCreating,
} from '../notificationsSlice';
import {AccessTime, LocationOn, Phone} from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";

const inputStyle = {
  background: '#fff',
  borderColor: '#fff',
  margin: 0,
  borderRadius: '5px',
};

const FeedbackForm = () => {
  const dispatch = useAppDispatch();
  const notificationCreating = useAppSelector(selectNotificationCreating);
  const error = useAppSelector(selectCreateNotificationError);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<INotification>({
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  });
  const [phoneError, setPhoneError] = useState('');

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = e.target;
    setState((prevState) => {
      return {...prevState, [name]: value};
    });
  };

  const isValidPhone = (phone: string) => {
    if (phone) {
      const phoneRegex = /^(\+996)?\d{9}$/;
      return phoneRegex.test(phone);
    } else {
      return true;
    }
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidPhone(state.phoneNumber)) {
      setPhoneError('Неверный формат телефона');
      return;
    }

    const result = await dispatch(createNotification(state));

    if (result.meta.requestStatus === 'fulfilled') {
      handleClick();
    }

    setState({
      name: '',
      email: '',
      phoneNumber: '',
      message: '',
    });
    setPhoneError('');
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const phoneNumberPattern = '^+996\\d{9}$';

  return (
    <Grid
      container
      style={{background: '#c7efcf', borderRadius, padding: '20px'}}
      direction="row"
      spacing={5}
    >
      <Grid item md={6}>
        <Typography variant="h4" sx={{mb: 2}}>CONTACT INFORMATION</Typography>
        <Box display="flex" alignItems="center" sx={{mb: 2, borderBottom: '3px solid #ddd', pb: 1}}>
        <span style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          background: '#FF6F61',
          borderRadius: '50%',
          marginRight: '20px'
        }}>
        <Phone sx={{margin: 'auto', color: '#fff'}}/>
        </span>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography><b>PHONE NUMBER: </b></Typography>
            <Typography sx={{ml: 1}}>+996558775388 (WhatsApp)</Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" sx={{mb: 2, borderBottom: '3px solid #ddd', pb: 1}}>
        <span style={{
          display: 'flex',
          width: '40px',
          height: '40px',
          background: '#FF6F61',
          borderRadius: '50%',
          marginRight: '20px'
        }}>
        <LocationOn sx={{margin: 'auto', color: '#fff'}}/>
        </span>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography><b>ADDRESS: </b></Typography>
            <Typography sx={{ml: 1}}>720024, Kyrgyzstan, Bishkek, Frunze St., Tula №14</Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" sx={{mb: 2, borderBottom: '3px solid #ddd', pb: 1}}>
        <span style={{
          display: 'flex',
          width: '40px',
          height: '40px',
          background: '#FF6F61',
          borderRadius: '50%',
          marginRight: '20px'
        }}>
        <EmailIcon sx={{margin: 'auto', color: '#fff'}}/>
        </span>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography><b>EMAIL: </b></Typography>
            <Typography sx={{ml: 1}}>epictkg@bk.ru | turahunovzak@gmail.com</Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" sx={{mb: 2, borderBottom: '3px solid #ddd', pb: 1}}>
        <span style={{
          display: 'flex',
          width: '40px',
          height: '40px',
          background: '#FF6F61',
          borderRadius: '50%',
          marginRight: '20px'
        }}>
        <AccessTime sx={{margin: 'auto', color: '#fff'}}/>
        </span>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography><b>WORKING HOURS: </b></Typography>
            <Typography sx={{ml: 1}}>Mon - Sat 9.00 - 19.00. Sunday CLOSED</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item md={6}>
        <Typography variant="h4" sx={{mb: 2}}>HAVE A QUESTION?</Typography>
        <form onSubmit={onFormSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <TextField
                id="name"
                name="name"
                label="Your name"
                value={state.name}
                onChange={inputChangeHandler}
                required
                disabled={notificationCreating}
                error={Boolean(getFieldError('name'))}
                helperText={getFieldError('name')}
                style={inputStyle}
              />
            </Grid>
            <Grid item xs>
              <TextField
                type="email"
                id="email"
                name="email"
                label="Email"
                value={state.email}
                onChange={inputChangeHandler}
                required
                disabled={notificationCreating}
                error={Boolean(getFieldError('email'))}
                helperText={getFieldError('email')}
                style={inputStyle}
              />
            </Grid>
            <Grid item xs>
              <TextField
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number (KG Only) +996 ХХХ ХХХ ХХХ"
                value={state.phoneNumber}
                onChange={inputChangeHandler}
                disabled={notificationCreating}
                error={
                  Boolean(getFieldError('phoneNumber')) || Boolean(phoneError)
                }
                helperText={getFieldError('phoneNumber') || phoneError}
                style={inputStyle}
                inputProps={{pattern: phoneNumberPattern}}
              />
            </Grid>
            <Grid item xs>
              <TextField
                multiline
                rows={2}
                id="message"
                name="message"
                label="Message"
                value={state.message}
                onChange={inputChangeHandler}
                disabled={notificationCreating}
                style={inputStyle}
              />
            </Grid>
            <Grid item xs>
              <Button
                type="submit"
                variant="contained"
                disabled={notificationCreating}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
          Data sent successfully. The operator will contact you shortly
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default FeedbackForm;