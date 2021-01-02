import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';

import {
  TextField,
  Button,
  FormControl,
  Box,
  MenuItem,
} from '@material-ui/core';


type Inputs = {
    name: string,
    lastName: string,
    email: string,
    role: string,
};

const UserForm = ( { mode } ) => {

    const { register, handleSubmit, watch, errors, control } = useForm<Inputs>();
    const [role, useRole] = React.useState("manager");
    const router = useRouter();

    const onSubmitHandler = data => {
        if (!errors || !Object.values(errors).length) {
            console.log("Submit form wth data", data);
            // TODO: on user create redirect to id
            const id = 3; 
            if (mode === "create") {

                router.push(`/dashboard/users/${id}`)
            }
        }
    };

    return (
        <form  onSubmit={onSubmitHandler}>
            <Box>
                <TextField 
                    name="name" 
                    label="First Name" 
                    inputRef={register( { required: true } )}
                    error={errors.name}
                    helperText={errors && errors.name && errors.name.message}
                />
                <TextField 
                    name="lastName"
                    label="Last Name" 
                    inputRef={register({ required: true })}
                    error={errors && errors.lastName}
                    helperText={errors && errors.lastName && errors.lastName.message}
                />
            </Box>
                
            <Box>
                <TextField 
                    name="email" 
                    label="Email" /*variant="outlined"*/ 
                    type="email"
                    inputRef={
                        register( 
                            { 
                                required: true, 
                                pattern: {
                                    value: /S+@S+.S+/,
                                    message: "Entered value does not match email format"
                                } 
                            } 
                        )
                    }
                    error={errors && errors.email}
                    helperText={errors && errors.email && errors.email.message}
                />
            </Box>
            <FormControl /*variant="filled"*/ /*className={classes.formControl} */ >
                <TextField
                    select
                    required
                    // error={errors.role && errors.role}
                    // helperText={errors && errors.role && errors.role.message}
                    defaultValue={role}
                    id="role"
                    inputProps={{
                        inputRef: (ref) => {
                            if (!ref) return;
                            register({
                                name: "role",
                                value: ref.value,
                            });
                        },
                    }}
                    >
                    <MenuItem value='user'>User</MenuItem>
                        <MenuItem value='manager'>Manager</MenuItem>
                </TextField>
            </FormControl>
           {mode !== 'view' && <FormControl>
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </FormControl>}
        </form>
    )
}

export default UserForm;