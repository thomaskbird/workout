import {ReactNode} from 'react';
import styles from '@app/components/FormGroup/FormGroup.module.scss';
import { FormGroup as MuiFormGroup } from '@mui/material';

type FormGroupProps = {
  className?: string;
  children: ReactNode | ReactNode[];
}

const FormGroup = ({ children }: FormGroupProps) => (
  <MuiFormGroup className={styles.formGroup}>
    {children}
  </MuiFormGroup>
);

export default FormGroup;
