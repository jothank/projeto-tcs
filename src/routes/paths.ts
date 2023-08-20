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
  //   root: path(ROOTS_DASHBOARD, '/certificados'),
  //   four: path(ROOTS_DASHBOARD, '/certificados/calendario-certificados'),
  //   five: path(ROOTS_DASHBOARD, '/certificados/geracao-certificado'),
  //   six: path(ROOTS_DASHBOARD, '/certificados/gerenciar-certificados'),
  //   seven: path(ROOTS_DASHBOARD, '/certificados/gerenciar-certificados/:id'),
   },
};
