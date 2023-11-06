import { Link, List, ListItemButton, SwipeableDrawer, Typography } from "@mui/material";
import { pages } from "../Header/Header.config";
import styles from './Drawer.module.scss';

export type DrawerProps = {
  drawerOpen: boolean;
  onDrawerOpenChange(isOpen: boolean): void;
}

const Drawer = ({ drawerOpen, onDrawerOpenChange }: DrawerProps) => {
  return (
    <div className={styles.test}>
      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={() => onDrawerOpenChange(false)}
        onOpen={() => onDrawerOpenChange(true)}
        classes={{
          paper: styles.test
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
    </div>
  )
}

export default Drawer;