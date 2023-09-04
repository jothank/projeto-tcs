import React, { ReactNode } from 'react';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Container,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@mui/material/styles';
interface LayoutProps {
  children: ReactNode;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {/* Conteúdo do AppBar */}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>{/* Ícone para a primeira página */}</ListItemIcon>
            <ListItemText primary="Página 1" />
          </ListItem>
          <ListItem button component={Link} to="/pagina2">
            <ListItemIcon>{/* Ícone para a segunda página */}</ListItemIcon>
            <ListItemText primary="Página 2" />
          </ListItem>
          {/* Adicione mais itens de menu conforme necessário */}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container>
          {children} {/* Renderiza o conteúdo da página atual aqui */}
        </Container>
      </main>
    </div>
  );
};

export default Layout;
