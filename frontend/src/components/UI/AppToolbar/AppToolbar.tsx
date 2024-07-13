import React, {useEffect} from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Link,
  Menu,
  MenuItem, Badge
} from '@mui/material';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {AccessTime, LocationOn, Phone} from '@mui/icons-material';
import logo from '../../../assets/images/logo.png';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectUser} from "../../../features/users/usersSlice";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {selectUnchecked} from "../../../features/notifications/notificationsSlice";
import {fetchUncheckedCount} from "../../../features/notifications/notificationsThunks";
import {logout} from "../../../features/users/usersThunks";



const AppToolbar = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const uncheckedCount = useAppSelector(selectUnchecked);

  useEffect(() => {
    if (user && user.role === 'admin') {
      const interval = setInterval(() => {
        void dispatch(fetchUncheckedCount());
      }, 10000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [dispatch, user, user?.role]);

  const handleLogout = () => {
    dispatch(logout());
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{bgcolor: 'fff', py: 1, display: {xs: 'none', lg: 'block'}, mb: 2}}>
        <Container>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Box display="flex" alignItems="center">
                <AccessTime sx={{mr: 1}}/>
                <Typography>Mon - Sat 9.00 - 19.00. Sunday CLOSED</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box display="flex" alignItems="center">
                <Phone sx={{mr: 1}}/>
                <Typography>+996558775388</Typography>
                <LocationOn sx={{mx: 1}}/>
                <Typography>720024, Kyrgyzstan, Bishkek, Frunze St., Tula №14</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{maxWidth: '1100px', margin: '0 auto', padding: '0 20px'}}>
        <AppBar position="sticky"
                sx={{mb: 2, boxShadow: '0 1rem 3rem rgba(0,0,0,.175)', background: '#fff', color: '#212121'}}>
          <Toolbar>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <IconButton edge="start" color="inherit" aria-label="icon">
                  <NavLink to="/">
                    <img src={logo} alt="logo" width={80} height={89}/>
                  </NavLink>
                </IconButton>
              </Grid>
              <Grid item>
                <Grid container alignItems="center" spacing={2}>
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
                      HOME
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
                      ABOUT
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
                      TOURS
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      component={NavLink}
                      to="/pages"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        fontWeight: location.pathname === '/pages' ? 'bold' : 'normal',
                      }}
                      sx={{
                        '&:hover': {textDecoration: 'underline'},
                      }}
                    >
                      PAGES
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      component={NavLink}
                      to="#contacts"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        fontWeight: location.pathname === '#contacts' ? 'bold' : 'normal',
                      }}
                      sx={{
                        '&:hover': {textDecoration: 'underline'},
                      }}
                    >
                      CONTACT
                    </Link>
                  </Grid>
                  {user && user.role === 'admin' && <Grid item>
                    <IconButton
                      id="basic-button"
                      aria-controls={openMenu ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMenu ? 'true' : undefined}
                      onClick={handleClick}
                    >
                      <MoreVertIcon/>
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={openMenu}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={() => navigate('/admin/notifications')}><Badge badgeContent={uncheckedCount} color="secondary">Notifications</Badge></MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </Grid>}
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
