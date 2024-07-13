import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectOneTour, selectOneTourFetching, selectTourDeleting} from "../toursSlice";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {deleteTour, fetchOneTour} from "../toursThunks";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card, CardContent, Button
} from "@mui/material";
import {apiURL} from "../../../constants";
import Carousel from 'react-material-ui-carousel';
import ImageModal from "../../../components/UI/ImageModal/ImageModal";
import {styled} from "@mui/system";
import {selectUser} from "../../users/usersSlice";
import {LoadingButton} from "@mui/lab";

const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const DayCell = styled(TableCell)(() => ({
  textAlign: 'center',
  backgroundColor: '#FF6F61',
  color: '#fff',
  padding: '10px',
  fontWeight: 'bold',
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '10px',
  lineHeight: 1.2
}));


const FullTourItem = () => {
  const dispatch = useAppDispatch();
  const id = (useParams()).id as string;
  const [open, setOpen] = useState(false);
  const tour = useAppSelector(selectOneTour);
  const loading = useAppSelector(selectOneTourFetching);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const deleteLoading = useAppSelector(selectTourDeleting);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Подтвердите удаление этого объявления')) {
      await dispatch(deleteTour(id));
      navigate('/');
    }
  }

  const handleOpen = (image: string) => {
    setSelectedImage(apiURL + '/' + image);
    setOpen(true);
  }

  const handleClose = () => setOpen(false);
  useEffect(() => {
    dispatch(fetchOneTour(id));
  }, [dispatch, id]);

  return (
    <Container>
      {loading ? <CircularProgress/> : tour && (
        <Grid mt={3} container spacing={3} direction="column">
          {user && user.role === 'admin' && <Grid item container sx={{margin: '0 auto 16px'}} justifyContent="center">
            <Grid item sx={{ml: 1}}>
              <LoadingButton
                color="error"
                variant="contained"
                loading={Boolean(deleteLoading)}
                disabled={Boolean(deleteLoading)}
                onClick={handleDelete}
                size="large"
              >
                <span>Удалить</span>
              </LoadingButton>
            </Grid>
            <Grid item sx={{ml: 1}}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(`/tours/edit/${id}`)}
                size="large"
              >
                Редактировать
              </Button>
            </Grid>
          </Grid>}
          <Grid item xs={12}>
            <Typography variant="h3" align="center">{tour.title}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Carousel animation="slide" autoPlay={false}>
              {tour.images.map(image => (
                <Box  sx={{display: 'flex', width: {xs: '100%', sm: '90%', lg: '70%'}, height: {xs: '250px', sm: '350px', md: '500px' }, objectFit: 'cover', cursor: 'pointer', margin: '0 auto'}} key={image}>
                  <img src={apiURL + '/' + image} alt={tour.title}
                       style={{width: '100%', height: '100%'}} onClick={() => handleOpen(image)}/>
                </Box>
              ))}
            </Carousel>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{maxWidth: {xs: '100%', sm: '90%', lg: '70%'}, margin: '0 auto', marginTop: '30px'}}>
              <CardContent>
                <Typography variant="h4" sx={{borderBottom: '2px #000 solid', paddingBottom: '10px'}}>Tour
                  Details</Typography>
                <Typography variant="h6" sx={{margin: '15px 0'}}><b>Price: ${tour.price}</b></Typography>
                <Typography variant="h6"><b>Duration: {tour.duration} days
                  and {tour.duration - 1} nights</b></Typography>
                <Typography
                  sx={{marginTop: '15px', whiteSpace: 'normal', wordWrap: 'break-word'}}>{tour.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{maxWidth: {xs: '100%', sm: '90%', lg: '70%'}, margin: '0 auto', marginTop: '30px'}}>
              <CardContent>
                <Typography variant="h4" sx={{borderBottom: '2px #000 solid', paddingBottom: '10px'}}>Route</Typography>
                {tour.places &&
                  <Typography variant="h6" sx={{margin: '15px 0'}}><b>Places to visit: </b>{tour.places}</Typography>}
                <Box sx={{display: 'flex'}}>
                  {tour.route && <img src={apiURL + '/' + tour.route} alt="Маршрут тура"
                                      style={{margin: '20px auto 0',}} onClick={() => handleOpen(tour.route || '')}
                                      className="clickableImage"/>}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{maxWidth: {xs: '100%', sm: '90%', lg: '70%'}, margin: '0 auto', marginTop: '30px'}}>
              <CardContent>
                <Typography variant="h4" sx={{borderBottom: '2px #000 solid', paddingBottom: '10px'}}>
                  Tour Summary
                </Typography>
                {tour.schedule.map((item) => (
                  <TableContainer component={Paper} sx={{mt: 2}} key={item.dayNumber}>
                    <StyledTableRow>
                      <Table>
                        <TableHead sx={{padding: '30px 0'}}>
                          <DayCell>Day {item.dayNumber}</DayCell>
                          <TableCell sx={{fontWeight: 'bold', fontSize: '1.2em'}}>{item.title}</TableCell>
                        </TableHead>
                        <TableBody>
                          <TableCell component="th" scope="row"></TableCell>
                          <TableCell sx={{whiteSpace: 'normal', wordWrap: 'break-word'}}>{item.description}</TableCell>
                        </TableBody>
                      </Table>
                    </StyledTableRow>
                  </TableContainer>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      <ImageModal open={open} handleClose={handleClose} title={tour ? tour.title : ''} image={selectedImage}/>
    </Container>
  );
};

export default FullTourItem;
