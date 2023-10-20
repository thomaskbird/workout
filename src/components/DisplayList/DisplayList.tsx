import styles from './DisplayList.module.scss';
import {ReactNode} from 'react';

type DisplayListProps<T> = {
  items: T[];
  renderChild(item: T): ReactNode | ReactNode[];
};

const DisplayList = <T,>({ items, renderChild }: DisplayListProps<T>) => (
  <div className={styles.root}>
    {items.map((item) => renderChild(item))}
  </div>
);

export default DisplayList;
