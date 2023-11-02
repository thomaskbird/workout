import React, {useEffect} from "react";
import { useState } from "react";
import {Box, Divider, IconButton, ListItemIcon, Menu, MenuItem} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import {Logout, Settings, Favorite} from '@mui/icons-material';
import {useSession} from '@app/store/useSession';
import {selectUser} from '@app/store/selectors/session';
import {accountManuPaperProps} from '@app/components/AccountMenu/AccountMenu.config';
import Link from 'next/link';
import useAuth from '@app/hooks/useAuth';
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
            <Avatar /> Profile
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Favorite fontSize="small" />
          </ListItemIcon>
          My Favorites
        </MenuItem>
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
