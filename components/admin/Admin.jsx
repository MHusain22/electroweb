import React from 'react';
import { Container, Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { People, ShoppingCart, Dashboard } from '@mui/icons-material';
// import Users from '../components/Users';
// import Products from '../components/Products';
// import AdminDashboard from '../components/AdminDashboard';
import Products from './Products';

const Admin = () => {
    const drawerWidth = 240;
    const [selectedComponent, setSelectedComponent] = React.useState('dashboard');

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <List>
          <ListItem button onClick={() => handleComponentChange('dashboard')}>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => handleComponentChange('users')}>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button onClick={() => handleComponentChange('products')}>
            <ListItemIcon>
              <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Container>
          {selectedComponent === 'dashboard' && "AdminDashboard"}
          {selectedComponent === 'users' && "Users"}
          {selectedComponent === 'products' && <Products />}
        </Container>
      </Box>
    </Box>
  )
}

export default Admin