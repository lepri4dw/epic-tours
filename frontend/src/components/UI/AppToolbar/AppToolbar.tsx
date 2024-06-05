import React from 'react';
import {AppBar, Toolbar, Grid, Typography, IconButton, Container, styled} from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import logo from "../../../assets/images/logo.png";

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});


const AppToolbar = () => {
  return (
    <>
      <AppBar position="static" color="default" sx={{py: 1}}>
        <Toolbar>
          <Container>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <PhoneIcon/>
                    <Typography variant="body1" component="span" sx={{ml: 1}}>+01 (977) 2599 12</Typography>
                  </Grid>
                  <Grid item>
                    <EmailIcon/>
                    <Typography variant="body1" component="span" sx={{ml: 1}}>company@domain.com</Typography>
                  </Grid>
                  <Grid item>
                    <LocationOnIcon/>
                    <Typography variant="body1" component="span" sx={{ml: 1}}>3146 Koontz Lane, California</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <IconButton edge="end" color="inherit" aria-label="facebook">
                  <FacebookIcon/>
                </IconButton>
                <IconButton edge="end" color="inherit" aria-label="twitter">
                  <TwitterIcon/>
                </IconButton>
                <IconButton edge="end" color="inherit" aria-label="youtube">
                  <YouTubeIcon/>
                </IconButton>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>

      <AppBar position="sticky" sx={{mb: 2}}>
        <Toolbar>
          <Container>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <IconButton edge="start" color="inherit" aria-label="icon">
                  <NavLink to="/">
                    <img src={logo} alt={"logo"} width={80} height={89}/>
                  </NavLink>
                </IconButton>
              </Grid>
              <Grid item>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <Link to="/">HOME</Link>
                  </Grid>
                  <Grid item>
                    <Link to="/about" style={{textDecoration: 'none', color: 'inherit'}}>ABOUT</Link>
                  </Grid>
                  <Grid item>
                    <Link to="/tours" style={{textDecoration: 'none', color: 'inherit'}}>TOURS</Link>
                  </Grid>
                  <Grid item>
                    <Link to="/pages" style={{textDecoration: 'none', color: 'inherit'}}>PAGES</Link>
                  </Grid>
                  <Grid item>
                    <Link to="/blog" style={{textDecoration: 'none', color: 'inherit'}}>BLOG</Link>
                  </Grid>
                  <Grid item>
                    <Link to="/contact" style={{textDecoration: 'none', color: 'inherit'}}>CONTACT</Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppToolbar;
