import {Box, Container, Grid, ImageList, ImageListItem, Typography, useMediaQuery} from "@mui/material";
import background from "../../assets/images/about_background.jpg";
import image1 from "../../assets/images/about_1.jpg";
import image2 from "../../assets/images/about_2.jpg";
import image3 from "../../assets/images/about_3.jpg";
import React, {useEffect, useState} from "react";
import {apiURL} from "../../constants";
import Carousel from 'react-material-ui-carousel';
import ImageModal from "../UI/ImageModal/ImageModal";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectToursImages} from "../../features/tours/toursSlice";
import {fetchToursImages} from "../../features/tours/toursThunks";
import {ITourImage} from "../../types";
import theme from "../../theme";

const chunkArray = (array: ITourImage[], chunkSize: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const About = () => {
  const dispatch = useAppDispatch();
  const toursImages = useAppSelector(selectToursImages);
  const imageChunks = chunkArray(toursImages, 6);
  const firstImages = [image1, image2, image3];
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const handleOpen = (image: string, title?: string) => {
    setSelectedImage(image);
    setSelectedTitle(title || '');
    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(fetchToursImages());
  }, [dispatch]);

  return (
    <>
      <Box>
        <Box sx={{
          padding: '90px 0', backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <Container>
            <Typography variant="h3" sx={{color: '#fff'}}>About Us</Typography>
          </Container>
        </Box>
        <Container>
          <Grid container sx={{margin: '50px 0'}} spacing={2}>
            <Grid item xs={12} md={5} sx={{textAlign: 'center', marginTop: '20px'}}>
              <Typography variant="h5" sx={{fontWeight: 'bold', mb: '20px'}}>About us</Typography>
              <Typography sx={{fontSize: '18px'}}>Created in 2016, Epic Tours is a full-service Travel Company based in the heart of Central Asia/
                Kyrgyzstan, Bishkek. Our young and dynamic team is collected from professional guides who has been in
                tourism business since 2004 and it is our key to success and show the best value.</Typography>
            </Grid>
            <Grid item xs={12} md={7}>
              <ImageList cols={isXs ? 2 : 3} gap={20} sx={{height: '100%'}}>
                {firstImages.map(image => (
                  <ImageListItem key={image} sx={{cursor: 'pointer'}}>
                    <img
                      src={image}
                      alt="about image"
                      loading="lazy"
                      onClick={() => handleOpen(image)}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
          </Grid>
          <Grid container sx={{margin: '80px 0'}} spacing={2}>
            <Grid item xs={12} md={6}>
              <Carousel autoPlay={false} sx={{height: '100%'}}>
                {imageChunks.map((chunk, index) => (
                  <ImageList key={index} cols={isXs ? 2 : 3} gap={20} rowHeight={200}>
                    {chunk.map((item, index) => (
                      <ImageListItem key={index} sx={{cursor: 'pointer'}}>
                        <img
                          src={apiURL + '/' + item.image}
                          alt={item.title}
                          loading="lazy"
                          onClick={() => handleOpen(apiURL + '/' + item.image, item.title)}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                ))}
              </Carousel>
            </Grid>
            <Grid item xs={12} md={6} sx={{textAlign: 'center', marginTop: '20px'}}>
              <Typography variant="h5" sx={{fontWeight: 'bold', mb: '20px'}}>Goals and Objectives</Typography>
              <Typography sx={{fontSize: '18px'}}>Epic Tours organizes trips to Kyrgyzstan, Uzbekistan, Turkmenistan, Tajikistan and Kazakhstan. Epic Tours aims at setting up of interesting and unforgettable itineraries with a great attention to details and makes it convenient for you to enjoy welcoming Central Asia. Moreover, Epic Tours will immerse you in a culture that is far different than your own. On our trips all of your needs will be taken care of so you can fully be in the moment and capture exhibition quality images. Our unique destinations, well researched itineraries and excellent/professional team are what set us apart. We lodge in hotels that have ambiance and a true sense of place. If you are passionate about Photography/History of Silk Road and Adventure Travel you will love being part of an Epic Tours expedition. Our itineraries are cutting edge and all have been vetted before you get there. Just bring your camera and a sense of curiosity. Traveling with Epic Tours, you will get top service at a reasonable price.</Typography>
            </Grid>
          </Grid>

        </Container>
      </Box>
      <ImageModal open={open} handleClose={handleClose} title={selectedTitle} image={selectedImage} hasTitle/>
    </>
  )
};

export default About;