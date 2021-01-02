import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import { Controller } from "react-hook-form"; 

// import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import {
  Typography,
  Select,
  TextField,
  Checkbox,
  Paper,
  Grid,
  Button,
  FormLabel,
  FormGroup,
  FormControl,
  FormControlLabel,
  Box,
  MenuItem,
} from '@material-ui/core';

import AdminDashboard from "../../../components/Layouts/AdminDashboard";

type Inputs = {
    example: string,
    exampleRequired: string,
  };

const AddUser = () => {
    const [openMenu, setOpenMenu] = React.useState(false);

    const router = useRouter();

    const { register, handleSubmit, watch, errors, control } = useForm<Inputs>();
    const onSubmit = data => {
        if (!errors || !Object.values(errors).length) {
            console.log("Submit form wth data", data);
            // TODO: on user create redirect to id
            const id = 3; 
            router.push(`/dashboard/users/${id}`);
        }
    };
  
    console.log(watch("example")) // watch input value by passing the name of it

    const [role, setRole] = React.useState('manager');
    const handleChange = (a) =>  console.log("a: ", a.target)
    console.log("errors: ", errors);
    
    return (
        <AdminDashboard>
            <h1>Create User</h1>
                {/* {errors.exampleRequired && <span>This field is required</span>} */}

            <form  onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <TextField 
                        name="name" 
                        label="First Name" 
                        inputRef={register( { required: true } )}
                        error={errors && errors.name}
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
                <FormControl>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </FormControl>
            </form>
        </AdminDashboard>
    )
}

export default AddUser;