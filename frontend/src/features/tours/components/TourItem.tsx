import React from 'react';
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  CardActionArea,
  IconButton,
} from '@mui/material';
import {styled} from '@mui/system';
import {AccessTime, LocationOn} from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Tour} from "../../../types";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectTourDeleting} from "../toursSlice";
import {selectUser} from "../../users/usersSlice";
import {deleteTour, fetchTours} from "../toursThunks";
import {apiURL} from "../../../constants";

interface Props {
  tour: Tour;
}

const CustomCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.3s ease',
  position: 'relative',
  '&:hover': {
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  overflow: 'hidden',
});

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

const PriceTag = styled(Box)({
  position: 'absolute',
  top: '20px',
  right: '0',
  backgroundColor: '#FF6F61',
  color: '#fff',
  padding: '8px 12px',
  fontSize: '18px',
});

const InfoBox = styled(Box)({
  position: 'absolute',
  top: '185px',
  right: '16px',
  left: '16px',
  backgroundColor: '#0190BE',
  color: '#fff',
  padding: '8px',
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const Description = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 6,
  WebkitBoxOrient: 'vertical',
  whiteSpace: 'normal',
});

const TourItem: React.FC<Props> = ({tour,}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const deleteLoading = useAppSelector(selectTourDeleting);
  const user = useAppSelector(selectUser);

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (window.confirm('Подтвердите удаление этого объявления')) {
      await dispatch(deleteTour(tour._id));
      dispatch(fetchTours());
    }
  }

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    navigate(`/tours/edit/${tour._id}`)
  }


  return (
    <Grid item xs={12} sm={6} md={4}>
      <CustomCard className="card" onClick={() => navigate(`/tours/${tour._id}`)}>
        <CardActionArea>
          {user && user.role === 'admin' && (
            <Grid container spacing={2} style={{position: 'absolute', top: '10px', left: '10px', zIndex: 10}}>
              <Grid item>
                <IconButton disabled={deleteLoading ? deleteLoading === tour._id : false}
                            onClick={handleDelete}>
                  <DeleteIcon sx={{color: '#fff'}}/>
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={handleEdit}>
                  <EditIcon sx={{color: '#fff'}}/>
                </IconButton>
              </Grid>
            </Grid>
          )}
          <ImageCardMedia title={tour.title} image={`${apiURL}/${tour.images[0]}`}/>
          <PriceTag>${tour.price} / <span style={{fontSize: '14px'}}>per person</span></PriceTag>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{marginTop: '16px'}}>
              {tour.title}
            </Typography>
            <InfoBox>
              <Box display="flex" alignItems="center" sx={{flexShrink: 0, marginRight: '10px'}}>
                <AccessTime fontSize="small"/>
                <Typography variant="body2" color="inherit" marginLeft={1}>
                  {tour.duration}D/{tour.duration - 1}N
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" sx={{flex: '1 1 0', overflow: 'hidden'}}>
                <LocationOn fontSize="small"/>
                <Typography variant="body2" color="inherit" marginLeft={1}
                            sx={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                  {tour.destinations.map(destination => destination.name).join(', ')}
                </Typography>
              </Box>
            </InfoBox>
            <Description variant="body2" color="text.secondary" marginTop={2}>
              {tour.description}
            </Description>
          </CardContent>
        </CardActionArea>
      </CustomCard>
    </Grid>
  );
};

export default TourItem;
