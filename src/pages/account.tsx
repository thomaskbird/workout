import { NextPage } from 'next'
import React, {SyntheticEvent} from 'react'
import {Box, Button, Container, Paper, Tab, Tabs, TextField} from '@mui/material';
import styles from './account.module.scss';
import FormGroup from '@app/components/FormGroup/FormGroup';
import useAuth from '@app/hooks/useAuth';

const AccountView: NextPage = () => {
  const {
    isLoading,
    errors,
    fields,
    action,
    setAction,
    onChange,
    onSubmit,
  } = useAuth();

  return (
    <Container>
      <Box className={styles.root}>
        <Paper>
          <Tabs value={action} onChange={(evt: SyntheticEvent, val: any) => setAction(val)}>
            <Tab label="Login" value="login" />
            <Tab label="Signup" value="signup" />
          </Tabs>
          <Box className={styles.accountWrapper}>
            <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
            </ul>

            <FormGroup>
              <TextField
                fullWidth
                type="email"
                name="email"
                value={fields.email}
                label="Enter email..."
                variant="outlined"
                onChange={onChange}
              />
            </FormGroup>

            <FormGroup>
              <TextField
                fullWidth
                type="password"
                name="password"
                label="Enter password..."
                variant="outlined"
                value={fields.password}
                onChange={onChange}
              />
            </FormGroup>

            {action === 'signup' && (
              <FormGroup>
                <TextField
                  fullWidth
                  type="password"
                  name="cPassword"
                  label="Confirm password..."
                  variant="outlined"
                  value={fields.cPassword}
                  onChange={onChange}
                />
              </FormGroup>
            )}

            <Button
              type="submit"
              variant="contained"
              onClick={onSubmit}
              disabled={isLoading}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default AccountView
