import React, {useEffect} from "react";
import { useState } from "react";
import {Box, Divider, IconButton, ListItemIcon, Menu, MenuItem} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import {Logout, PersonAdd, Settings} from '@mui/icons-material';
import {useSession} from '@app/store/useSession';
import {selectUser} from '@app/store/selectors/session';

type UserDisplayType = {
  name: string;
  photo?: string;
}

const AccountMenu = () => {
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

  return (
    <React.Fragment>
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
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default AccountMenu;
