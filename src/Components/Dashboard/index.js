import React from 'react';
import { useQueryClient } from 'react-query';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  CssBaseline,
  Container,
  Button
} from '@mui/material';
import { navigations } from '../../constants';
import Magazines from './Magazines';
import Subscriptions from './Subscriptions';


const Dashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem('user');
    queryClient.removeQueries({ queryKey: 'user' });
    navigate('/login');
  }

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" style={{ zIndex: '10000' }}>
        <Toolbar>
          <Typography variant="h6" noWrap style={{ width: '90%' }}>
            Admin Dashboard
          </Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {navigations.SIDEBAR_MENU.map((item, index) => (
            <ListItem key={item.text} component={Link} to={item.link}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Container component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', mt: 8, ml: 3 }}>
        <Toolbar />
        <Outlet />
      </Container>
    </div>
  );
};

export default Dashboard;
