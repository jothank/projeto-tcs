
import { PATH_AUTH, PATH_DASHBOARD } from '../../../routes/paths';
import SvgColor from '../../../components/svg-color';
import ConfigIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import LogsIcon from '@mui/icons-material/TextSnippet'
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PersonIcon from '@mui/icons-material/AccountBox';
// import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
   // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Certificados',
    items: [
    
      // {
      //   title: 'SSL-Governamental',
      //   path: PATH_DASHBOARD.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'Ver Certificados', path: PATH_DASHBOARD.user.four },
      //     { title: 'Comprar', path: PATH_DASHBOARD.user.five },
      //   ],
      // },
    ],
  },
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Painel Adminstrativo',
    items: [
      { title: 'Dashboard', path: PATH_DASHBOARD.one, icon: <LeaderboardIcon/> },
      { title: 'Clientes', path: PATH_DASHBOARD.eith, icon: <ManageAccountsIcon/> },
      { title: 'Perfil', path: PATH_DASHBOARD.two, icon: <PersonIcon/> },
      { title: 'Logs', path: PATH_DASHBOARD.seven, icon: <LogsIcon/> },
      { title: 'Configurações', path: PATH_DASHBOARD.three, icon: <ConfigIcon/> },
      { title: 'Sair', path: PATH_AUTH.login, icon: <LogoutIcon/> },
    ],
  }
];

export default navConfig;
