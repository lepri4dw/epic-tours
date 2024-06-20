import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectOneTour, selectOneTourFetching} from "../toursSlice";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {fetchOneTour} from "../toursThunks";
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
  Card, CardContent
} from "@mui/material";
import {apiURL} from "../../../constants";
import Carousel from 'react-material-ui-carousel';
import ImageModal from "../../../components/UI/ImageModal/ImageModal";
import {styled} from "@mui/system";

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
          <Grid item xs={12}>
            <Typography variant="h3" align="center">{tour.title}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Carousel animation="slide" autoPlay={false}>
              {tour.images.map(image => (
                <Box sx={{display: 'flex'}} key={image}>
                  <img src={apiURL + '/' + image} alt={tour.title}
                       style={{width: '70%', height: '500px', objectFit: 'cover', cursor: 'pointer', margin: '0 auto'}}
                       onClick={() => handleOpen(image)}/>
                </Box>
              ))}
            </Carousel>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{maxWidth: '70%', margin: '0 auto', marginTop: '30px'}}>
              <CardContent>
                <Typography variant="h4" sx={{borderBottom: '2px #000 solid', paddingBottom: '10px'}}>Tour
                  Details</Typography>
                <Typography variant="h6" sx={{margin: '15px 0'}}><b>Price: ${tour.price}</b></Typography>
                <Typography variant="h6"><b>Duration: {tour.duration} days
                  and {tour.duration - 1} nights</b></Typography>
                <Typography sx={{marginTop: '15px'}}>{tour.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{maxWidth: '70%', margin: '0 auto', marginTop: '30px'}}>
              <CardContent>
                <Typography variant="h4" sx={{borderBottom: '2px #000 solid', paddingBottom: '10px'}}>Route</Typography>
                {tour.places &&
                  <Typography variant="h6" sx={{margin: '15px 0'}}><b>Places to visit: </b>{tour.places}</Typography>}
                <Box sx={{display: 'flex'}}>
                  {tour.route && <img src={apiURL + '/' + tour.route} alt="Маршрут тура"
                                      style={{margin: '20px auto 0', }} onClick={() => handleOpen(tour.route || '')} className="clickableImage"/>}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{maxWidth: '70%', margin: '0 auto', marginTop: '30px'}}>
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
                          <TableCell>{item.description}</TableCell>
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
