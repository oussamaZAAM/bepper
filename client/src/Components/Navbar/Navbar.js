import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import "./Navbar.css"
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Avatar, Menu, MenuItem } from '@mui/material';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];


function RefreshPage(){
  window.location.reload();
}



function Navbar(props) {
  const [cookie, setCookie, removeCookie] = useCookies("token");
  
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleSignout = () => {
    removeCookie("token");
    localStorage.removeItem("breakfast");
    localStorage.removeItem("lunch");
    localStorage.removeItem("dinner");
    RefreshPage();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <div className='d-flex justify-content-center align-items-center'>
      <img alt='normal-logo' src={require('../../Logos/logo/logo-green.png')} className='img-responsive' />
      <Typography 
        variant="h6" 
        sx={{
            padding: '20px 0 0 0',
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'rgba(93,175,47,255)',
            textDecoration: 'none',
        }}>
        BEPPER
      </Typography>
      </div>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', backgroundColor: "rgba(93,175,47,255)"}}>
      <AppBar className="bg-fix" component="nav" >
        <Toolbar className='nav-grid'>
          <div className="flex">
          <IconButton
            className="nav-burgermenu"
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <img alt='border-logo' src={require('../../Logos/border logo/border-green.png')} className='img-responsive' />
          <Typography
            className='bepper-text'
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
                mr: 2,
                padding: "15px",
                display: { xs: 'block' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
          >
            BEPPER
          </Typography></div>
          <div className="d-flex align-items-center justify-content-between">
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'flex-end', marginRight: '30px' }}>
              {navItems.map((item) => (
                <Button className='bepper-button' key={item} sx={{ color: '#fff' }}>
                  {item}
                </Button>
              ))}
            </Box>
            {!props.user 
              && <Link style={{textDecoration: 'none'}} to="/login"><Button className="signin-nav">
                Sign in
              </Button></Link>}

            {props.user &&
            <>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <Avatar
                    alt="Username"
                    className="profile-icon"
                    src={require('../../Logos/border logo/border-red.png')}
                    sx={{ width: 50, height: 50 }}
                />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem className='navbar-menu' onClick={handleClose}>
                  <Button className="navbar-menuitem">
                    Profile
                  </Button>
                </MenuItem>
                <Link className='text-decoration-none' to={'/settings'}>
                  <MenuItem className='navbar-menu' onClick={handleClose}>
                    <Button className="navbar-menuitem">
                      Settings
                    </Button>
                  </MenuItem>
                </Link>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem className='bg-white' onClick={handleClose}>
                  <Button className="signout-nav" onClick={handleSignout}>
                    Sign out
                  </Button>
                </MenuItem>
              </Menu>
            </>}
          </div>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;
