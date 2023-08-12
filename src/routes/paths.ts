// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
    return `${root}${sublink}`;
  }
  
  const ROOTS_DASHBOARD = '/home';
  
  // ----------------------------------------------------------------------
  
  export const PATH_AUTH = {
    login: '/login',
  };
  
  export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    one: path(ROOTS_DASHBOARD, '/metricas'),
    two: path(ROOTS_DASHBOARD, '/perfil'),
    three: path(ROOTS_DASHBOARD, '/configuracoes'),
    seven: path(ROOTS_DASHBOARD, '/logs'),
    eith: path(ROOTS_DASHBOARD, '/gerenciamento-de-clientes'),
    user: {
     
    },
  };
  