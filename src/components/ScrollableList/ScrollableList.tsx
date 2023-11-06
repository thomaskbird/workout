import { Divider, List, ListItem, ListItemText } from '@mui/material';
import styles from './ScrollableList.module.scss';

type ScrollableListItem = {
    primary: string;
    secondary: string;
  };

type ScrollableListType = {
  items: ScrollableListItem[];
}

const ScrollableList = ({ items }: ScrollableListType) => {
  return (
    <List className={styles.root} dense>
      {items.map((item, index) => (
        <>
          <ListItem key={index}>
            <ListItemText primary={item.primary} secondary={item.secondary} />
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  );
};

export default ScrollableList
