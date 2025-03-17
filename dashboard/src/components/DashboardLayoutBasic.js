import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import PaidIcon from '@mui/icons-material/Paid';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useDemoRouter } from '@toolpad/core/internal';

//importing pages
import  Dashboard  from './Pages/Dashboard';
import Transactions from './Pages/Transaction';
import Budget from './Pages/Budget';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    to: '/dashboard',
  },
  {
    segment: 'transaction',
    title: 'Transactions',
    icon: <PaidIcon />,
    to: '/transactions',
  },
  {
    segment: 'budget',
    title: 'Budget',
    icon: <AccountBalanceWalletIcon />,
    to: '/budget',
  },
  {
    segment: 'profile',
    title: 'Profile',
    icon: <AccountBoxIcon />,
  },
  {
    segment: 'logout',
    title: 'Logout',
    icon: <LogoutIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'expenses',
        title: 'Expense',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'income',
        title: 'Income',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'notes',
    title: 'Notes',
    icon: <LayersIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>{pathname}</Typography>
    </Box>
  );
}
DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

// Function to render different pages based on route
function RenderPage({ pathname }) {
  switch (pathname) {
    case '/dashboard':
      return <Dashboard />;
    case '/transaction':
      return <Transactions />;
    case '/budget':
      return <Budget />;
    default:
      return <Typography>Page Not Found</Typography>;
  }
}

// function useDemoRouter(initialPath) {
//   const [pathname, setPathname] = React.useState(initialPath);

//   const router = React.useMemo(() => {
//     return {
//       pathname,
//       searchParams: new URLSearchParams(),
//       navigate: (path) => setPathname(String(path)),
//     };
//   }, [pathname]);

//   return router;
// }

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function DashboardLayoutBasic(props) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="/media/Untitled design (5).png" alt="Finance manager" />,
        title: 'Finance Manager',
        homeUrl: '/toolpad/core/introduction',
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
          <RenderPage pathname={router.pathname} />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
