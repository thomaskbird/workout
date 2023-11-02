import React from "react";
import { useState } from "react";
import {Box, IconButton, ListItemIcon, Menu, MenuItem} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import {accountManuPaperProps} from '@app/components/AccountMenu/AccountMenu.config';
import { MoreVert as MoreVertIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ListItemMenuProps } from "./ListItemMenu.types";

const ListItemMenu = ({ listItems }: ListItemMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
        <Tooltip title="More">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        open={open}
        id="account-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={accountManuPaperProps}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {listItems.map((item, i) => (
          <MenuItem key={i} onClick={item.onAction}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}

export default ListItemMenu;
