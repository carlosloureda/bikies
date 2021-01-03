import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import { TextField, Button, Grid, Box, MenuItem } from '@material-ui/core';
import ReactHookFormSelect from '../atoms/ReactHookFormSelect';
import Api from '../../utils/api';

type Inputs = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

const useStyles = makeStyles((theme) => ({
  formRow: {
    paddingBottom: 15,
  },
}));

const UserForm = ({ mode, user }: { mode: string; user?: Inputs }) => {
  const { register, handleSubmit, watch, errors, control } = useForm<Inputs>({
    defaultValues: {
      firstName: (user && user.firstName) || '',
      lastName: (user && user.lastName) || '',
      email: (user && user.email) || '',
      role: (user && user.role) || 'user',
    },
  });
  const router = useRouter();
  const classes = useStyles();

  const [error, setError] = React.useState('');

  const onSubmitHandler = async (data) => {
    setError('');
    if (!errors || !Object.values(errors).length) {
      let result = null;

      if (mode === 'create') {
        result = await Api.post('api/users', JSON.stringify(data));
      } else if (mode === 'edit') {
        result = await Api.update(
          `api/users/${user._id}`,
          JSON.stringify(data)
        );
      }
      if (!result.success) {
        setError(result.error);
      } else {
        const updatedUser = result.data;
        if (mode === 'create') {
          router.push(`/admin/users/${updatedUser._id}`);
        }
      }
    }
  };
  return (
    <Grid container justify="center">
      <form onSubmit={handleSubmit((data) => onSubmitHandler(data))}>
        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        <Box className={classes.formRow}>
          <TextField
            name="firstName"
            label="First Name"
            inputRef={register({ required: true })}
            error={Boolean(errors.firstName)}
            helperText={errors && errors.firstName && errors.firstName.message}
            disabled={mode === 'view'}
          />
        </Box>
        <Box className={classes.formRow}>
          <TextField
            name="lastName"
            label="Last Name"
            inputRef={register({ required: true })}
            error={Boolean(errors.lastName)}
            helperText={errors && errors.lastName && errors.lastName.message}
            disabled={mode === 'view'}
          />
        </Box>

        <Box className={classes.formRow}>
          <TextField
            name="email"
            label="Email" /*variant="outlined"*/
            type="email"
            inputRef={register({
              required: true,
              // pattern: {
              //   value: /S+@S+.S+/,
              //   message: 'Entered value does not match email format',
              // },
            })}
            error={Boolean(errors.email)}
            helperText={errors && errors.email && errors.email.message}
            disabled={mode === 'view'}
          />
        </Box>
        <Box className={classes.formRow}>
          <ReactHookFormSelect
            id="role"
            name="role"
            label="Role"
            control={control}
            defaultValue={(user && user.role) || 'manager'}
            disabled={mode === 'view'}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
          </ReactHookFormSelect>
        </Box>
        {mode !== 'view' && (
          <Box>
            {/* <Box style={{ margin: '0 auto' }}> */}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ margin: '0 auto' }}
            >
              Submit
            </Button>
          </Box>
        )}
      </form>
    </Grid>
  );
};

export default UserForm;
