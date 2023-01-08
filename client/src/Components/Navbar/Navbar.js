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

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];


function RefreshPage(){
  window.location.reload();
}



function Navbar(props) {
  const [cookie, setCookie, removeCookie] = useCookies("token");
  const user = cookie.token;
  
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
            {!user 
            ? <Link style={{textDecoration: 'none'}} to="/login"><Button className="signin-nav">
              Sign in
            </Button></Link>
            : <Button className="signin-nav" onClick={handleSignout}>
            Sign out
          </Button>}
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
