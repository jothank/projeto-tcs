import React from 'react';
import { Link, Divider, Box } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const menuItems = [
  { text: 'Perfil', href: '/perfil' },
  { text: 'Página 2', href: '/pagina2' },
  // Adicione mais itens conforme necessário
];


export default function MenuLateral() {

  return (
    <div>
      <div style={{ backgroundColor: '#00796B', padding: '16px', textAlign: 'center' }}>
        {/* <img src={logoUrl} alt="Logo" style={{ width: '80px', height: '80px', marginBottom: '8px' }} /> */}
        <Typography variant="h6" style={{ color: '#FFFFFF' }}>
          Gastro Custos
        </Typography>
      </div>
      <Box
       
        >
      <Drawer variant="permanent" anchor="left"
     
      >
        <Box
        sx={{
          background: '#00796B',
          height: '200px',
          color: '#FFFF'
        }}
        >
        <Typography> Menu adminisrativo</Typography>
        </Box>

        <Divider />
        <List
        sx={{
          background: '#00796B',
          height: '100%',
          color: '#FFFF'
        }}
        >
          {menuItems.map((item, index) => (
            <ListItem key={index} button component={Link} href={item.href}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      </Box>
    </div>
  );
}
