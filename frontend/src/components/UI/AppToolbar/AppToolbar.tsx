import React, { useEffect } from 'react';
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
  MenuItem,
  Badge,
  Drawer,
  List,
  ListItem,
  Divider,
  Button,
} from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AccessTime, LocationOn, Phone, Menu as MenuIcon } from '@mui/icons-material';
import logo from '../../../assets/images/logo.png';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { selectUnchecked } from '../../../features/notifications/notificationsSlice';
import { fetchUncheckedCount } from '../../../features/notifications/notificationsThunks';
import { logout } from '../../../features/users/usersThunks';

const AppToolbar = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const user = useAppSelector(selectUser);
  const uncheckedCount = useAppSelector(selectUnchecked);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

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
  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const drawerContent = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Menu
      </Typography>
      <Divider />
      <List>
        <ListItem>
          <Button component={NavLink} to="/" color="inherit" sx={{fontWeight: location.pathname === '/' ? 'bold' : 'normal'}}>
            HOME
          </Button>
        </ListItem>
        <ListItem>
          <Button component={NavLink} to="/about" color="inherit" sx={{fontWeight: location.pathname === '/about' ? 'bold' : 'normal'}}>
            ABOUT US
          </Button>
        </ListItem>
        <ListItem>
          <Button component={NavLink} to="/tours" color="inherit" sx={{fontWeight: location.pathname === '/tours' ? 'bold' : 'normal'}}>
            TOURS
          </Button>
        </ListItem>
        <ListItem>
          <Button component={NavLink} to="/contact" color="inherit" sx={{fontWeight: location.pathname === '/contact' ? 'bold' : 'normal'}}>
            CONTACT
          </Button>
        </ListItem>
        {user && user.role === 'admin' && (
          <>
            <Divider />
            <ListItem sx={{pt: 3}}>
              <Button component={NavLink} to="/admin/notifications" color="inherit">
                <Badge badgeContent={uncheckedCount} color="secondary">
                  Notifications
                </Badge>
              </Button>
            </ListItem>
            <ListItem>
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ bgcolor: 'fff', py: 1, display: { xs: 'none', md: 'block' }, mb: 2 }}>
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

      <Box sx={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
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
              <Grid item sx={{ display: { xs: 'none', sm: 'flex' } }}>
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
                        '&:hover': { textDecoration: 'underline' },
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
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      ABOUT US
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
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      TOURS
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
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      CONTACT
                    </Link>
                  </Grid>
                  {user && user.role === 'admin' && (
                    <Grid item>
                      <IconButton
                        id="basic-button"
                        aria-controls={openMenu ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenu ? 'true' : undefined}
                        onClick={handleClick}
                      >
                        <MoreVertIcon />
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
                        <MenuItem onClick={() => navigate('/admin/notifications')}>
                          <Badge badgeContent={uncheckedCount} color="secondary">
                            Notifications
                          </Badge>
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item sx={{ display: { xs: 'flex', sm: 'none' } }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ ml: 1 }}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default AppToolbar;
