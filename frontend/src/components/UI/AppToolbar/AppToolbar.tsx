import React from 'react';
import {AppBar, Toolbar, Grid, Typography, IconButton, Container, styled, Box} from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import logo from "../../../assets/images/logo.png";
import {AccessTime, LocationOn, Phone} from "@mui/icons-material";

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
      <Box sx={{ bgcolor: 'fff', py: 1, display: { xs: 'none', lg: 'block' }, mb: 2 }}>
        <Container>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Box display="flex" alignItems="center">
                <AccessTime sx={{ mr: 1 }} />
                <Typography>Mon - Sat 9.00 - 19.00. Sunday CLOSED</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box display="flex" alignItems="center">
                <Phone sx={{ mr: 1 }} />
                <Typography>+996558775388</Typography>
                <LocationOn sx={{ mx: 1 }} />
                <Typography>720024, Kyrgyzstan, Bishkek, Frunze St., Tula №14</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{maxWidth: '1100px', margin: '0 auto', padding: '0 20px'}}>
        <AppBar position="sticky" sx={{ mb: 2, boxShadow: '0 1rem 3rem rgba(0,0,0,.175)', background: '#fff', color: '#212121' }}>
          <Toolbar>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <IconButton edge="start" color="inherit" aria-label="icon">
                    <NavLink to="/">
                      <img src={logo} alt="logo" width={80} height={89} />
                    </NavLink>
                  </IconButton>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>HOME</Link>
                    </Grid>
                    <Grid item>
                      <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>ABOUT</Link>
                    </Grid>
                    <Grid item>
                      <Link to="/tours" style={{ textDecoration: 'none', color: 'inherit' }}>TOURS</Link>
                    </Grid>
                    <Grid item>
                      <Link to="/pages" style={{ textDecoration: 'none', color: 'inherit' }}>PAGES</Link>
                    </Grid>
                    <Grid item>
                      <Link to="/blog" style={{ textDecoration: 'none', color: 'inherit' }}>BLOG</Link>
                    </Grid>
                    <Grid item>
                      <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>CONTACT</Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default AppToolbar;
