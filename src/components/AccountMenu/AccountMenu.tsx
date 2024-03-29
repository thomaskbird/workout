import { accountManuPaperProps } from '@app/components/AccountMenu/AccountMenu.config';
import useAuth from '@app/hooks/useAuth';
import { selectUser } from '@app/store/selectors/session';
import { useSession } from '@app/store/useSession';
import { Favorite, History, Logout, Settings } from '@mui/icons-material';
import { Box, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import SearchInput from '../SearchInput/SearchInput';
import styles from './AccountMenu.module.scss';

type UserDisplayType = {
  name: string;
  photo?: string;
}

const AccountMenu = () => {
  const { signout } = useAuth();

  const user = useSession(selectUser);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userDisplay, setUserDisplay] = useState<UserDisplayType | undefined>(undefined);

  useEffect(() => {
    if(user) {
      setUserDisplay({
        name: user.displayName!,
        photo: user.photoURL ?? undefined
      })
    }
  }, [user]);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    handleClose();
    signout();
  }

  return (
    <div className={styles.root}>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <SearchInput />
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {userDisplay && (
              <Avatar
                alt={userDisplay.name}
                src={userDisplay?.photo ? userDisplay?.photo : '/static/images/avatar/2.jpg'}
              />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        open={open}
        id="account-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        disablePortal={true}
        PaperProps={accountManuPaperProps}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          width: 300
        }}
      >
        <Link href="/profile">
          <MenuItem onClick={handleClose}>
            <Avatar src={userDisplay?.photo ? userDisplay?.photo : '/static/images/avatar/2.jpg'} /> Profile
          </MenuItem>
        </Link>
        <Divider />
        <Link href="/favorites">
          <MenuItem>
            <ListItemIcon>
              <Favorite fontSize="small" />
            </ListItemIcon>
            My Favorites
          </MenuItem>
        </Link>
        <Link href="/history">
          <MenuItem>
            <ListItemIcon>
              <History fontSize="small" />
            </ListItemIcon>
            History
          </MenuItem>
        </Link>
        <Link href="/settings">
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
        </Link>
        <MenuItem onClick={handleSignout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

export default AccountMenu;
