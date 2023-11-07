import { Link, List, ListItemButton, SwipeableDrawer, Typography } from "@mui/material";
import React from "react";
import { pages } from "../Header/Header.config";
import styles from './Drawer.module.scss';

export type DrawerProps = {
  drawerOpen: boolean;
  onDrawerOpenChange(isOpen: boolean): void;
}

const Drawer = ({ drawerOpen, onDrawerOpenChange }: DrawerProps) => {
  return (
    <React.Fragment>
      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={() => onDrawerOpenChange(false)}
        onOpen={() => onDrawerOpenChange(true)}
        classes={{
          paper: styles.wrapper
        }}
      >
        <List>
        {pages.map((page) => (
          <Link href={page.link} key={page.id}>
            <ListItemButton>
              <Typography>{page.text}</Typography>
            </ListItemButton>
          </Link>
        ))}
        </List>
      </SwipeableDrawer>
    </React.Fragment>
  )
}

export default Drawer;