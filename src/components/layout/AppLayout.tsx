import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from '../common/Sidebar';
import { auth } from '../../firebase';
import { Button } from '@mui/material';

const drawerWidth = 240;

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  // ログイン・ログアウト機能
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/userAuth');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSignInPage = () => {
    navigate('/userAuth');
  };

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      !user && navigate('/userAuth');
    });
  });

  return (
    <Box
      sx={{
        display: 'flex',
        bgcolor: (theme) => theme.palette.grey[100],
        minHeight: '100vh',
      }}
    >
      <CssBaseline />

      {/* ヘッダー */}
      <AppBar
        position='fixed'
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Toolbar sx={{}}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h5' noWrap component='div'>
            TypeScript × React 家計簿
          </Typography>
        </Toolbar>
        {/* ログイン機能 */}
        <Button
          onClick={auth.currentUser === null ? handleSignInPage : handleSignOut}
          color='inherit'
          sx={{ px: { md: 3 } }}
        >
          {auth.currentUser === null ? 'ログイン' : 'ログアウト'}
        </Button>
      </AppBar>

      {/* サイドバーは、別コンポーネントに移動 */}
      <SideBar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
        handleDrawerClose={handleDrawerClose}
      />

      {/* メインコンテンツ */}
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
