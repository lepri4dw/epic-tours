import {Box, Container, Grid, Link, Typography} from "@mui/material";
import {LocationOn, Phone} from "@mui/icons-material";
import EmailIcon from '@mui/icons-material/Email';
import {NavLink, useLocation} from "react-router-dom";
import React from "react";

const Footer = () => {
  const location = useLocation();

  return (
    <>
      <Box sx={{background: '#383838', padding: '60px 0', mt: '50px'}}>
        <Container sx={{color: '#fff'}}>
          <Grid container justifyContent="space-between" spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography sx={{fontWeight: 'bold', paddingLeft: '8px', borderLeft: 'solid 3px #00A1EB', mb: 3}}>CONTACT
                INFORMATION</Typography>
              <Box display="flex" alignItems="center" sx={{mb: 2}}>
                <Phone sx={{mr: 1, color: '#FF6F61'}}/>
                <Typography>+996558775388</Typography>
              </Box>
              <Box display="flex" alignItems="center" sx={{mb: 2}}>
                <LocationOn sx={{mr: 1, color: '#FF6F61'}}/>
                <Typography>720024, Kyrgyzstan, Bishkek, Frunze St., Tula №14</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <EmailIcon sx={{mr: 1, color: '#FF6F61'}}/>
                <Typography>info@epictkg.com</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{fontWeight: 'bold', paddingLeft: '8px', borderLeft: 'solid 3px #00A1EB', mb: 3}}>OUR
                MENU</Typography>
              <Grid container spacing={2} flexDirection="column" sx={{ml: 1}}>
                <Grid item>
                  <Link
                    component={NavLink}
                    to="/"
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      fontWeight: location.pathname === '/' ? 'bold' : 'normal',
                    }}
                    sx={{
                      '&:hover': {textDecoration: 'underline'},
                    }}
                  >
                    <span style={{marginRight: '16px', color: '#FF6F61', fontSize: '14px'}}>&#62;</span>  HOME
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    component={NavLink}
                    to="/about"
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      fontWeight: location.pathname === '/about' ? 'bold' : 'normal',
                    }}
                    sx={{
                      '&:hover': {textDecoration: 'underline'},
                    }}
                  >
                    <span style={{marginRight: '16px', color: '#FF6F61', fontSize: '14px'}}>&#62;</span> ABOUT US
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    component={NavLink}
                    to="/tours"
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      fontWeight: location.pathname === '/tours' ? 'bold' : 'normal',
                    }}
                    sx={{
                      '&:hover': {textDecoration: 'underline'},
                    }}
                  >
                    <span style={{marginRight: '16px', color: '#FF6F61', fontSize: '14px'}}>&#62;</span> TOURS
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    component={NavLink}
                    to="/contact"
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      fontWeight: location.pathname === '/contact' ? 'bold' : 'normal',
                    }}
                    sx={{
                      '&:hover': {textDecoration: 'underline'},
                    }}
                  >
                    <span style={{marginRight: '16px', color: '#FF6F61', fontSize: '14px'}}>&#62;</span> CONTACT
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{background: '#404040', padding: '20px 0'}}>
        <Container sx={{color: '#fff'}}>
          <Typography>Copyright @ 2024 Epic Tours KG. All rights reserved.</Typography>
        </Container>
      </Box>
    </>
  )
};

export default Footer;