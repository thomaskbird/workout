import { Button, Divider, List, ListItem, ListItemText } from '@mui/material';
import Link from 'next/link';
import styles from './ScrollableList.module.scss';

type ScrollableListItem = {
    primary: string;
    secondary: string;
  };

type ScrollableListType = {
  items: ScrollableListItem[];
}

// todo: add ability to set custom secondary action

const ScrollableList = ({ items }: ScrollableListType) => {
  return (
    <List className={styles.root} dense>
      {items.map((item, index) => (
        <div key={index}>
          <ListItem secondaryAction={<Link href="/"><Button size="small" style={{ marginLeft: 'auto'}}>Start</Button></Link>}>
            <ListItemText primary={item.primary} secondary={item.secondary} />
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
};

export default ScrollableList
