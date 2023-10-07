import {ReactNode} from 'react';
import styles from './FormGroup.module.scss';

type FormGroupProps = {
  children: ReactNode | ReactNode[];
}

const FormGroup = ({ children }: FormGroupProps) => (
  <div className={styles.root}>{children}</div>
);

export default FormGroup;
