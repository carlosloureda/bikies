import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import Image from 'material-ui-image';

import Rating from '@material-ui/lab/Rating';


import {
  TextField,
  Button,
  FormControl,
  Box,
  MenuItem,
  Input,
} from '@material-ui/core';


type Inputs = {
    model: string,
    color: string,
    location: string,
    rating: number,
};

const BikeForm = ( { mode } : { mode : string } ) => {

    const { register, handleSubmit, watch, errors, control } = useForm<Inputs>();
    const [rating, setRating] = React.useState(3.6);
    const router = useRouter();

    const [imagePath, setImagePath] = React.useState(null)

    const onSubmitHandler = data => {
        
        console.log("--> data: ", data);
        console.log("--> errors: ", errors);
        
        if (!errors || !Object.values(errors).length) {
            console.log("Submit form wth data", data);
            // TODO: on bike create redirect to id
            const id = 3; 
            if (mode === "create") {
                router.push(`/dashboard/bikes/${id}`)
            }
        }
    };


    const onFileLoad = (e, file) => console.log(e.target.result, file.name);

    return (
        <form  onSubmit={handleSubmit(data => onSubmitHandler(data))}>
            <Box>
                <TextField 
                    name="model" 
                    label="Model" 
                    inputRef={register( { required: true } )}
                    error={errors.model}
                    helperText={errors && errors.model && errors.model.message}
                    disabled={ mode === 'view'}
                />
                <TextField 
                    name="color"
                    label="Color" 
                    inputRef={register({ required: true })}
                    error={errors && errors.color}
                    helperText={errors && errors.color && errors.color.message}
                    disabled={ mode === 'view'}
                />
                <TextField 
                    name="location"
                    label="Location" 
                    inputRef={register({ required: true })}
                    error={errors && errors.location}
                    helperText={errors && errors.location && errors.location.message}
                    disabled={ mode === 'view'}
                />
            </Box>
            { mode === 'edit' && (
                <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                />
                )}
            { mode === 'view' && 
                <Rating name="read-only" value={rating} readOnly />
            }
            { mode !== 'view' && (
                <FormControl>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </FormControl>
            )}
            { mode !== 'view' && (
                <Input
                    // accept="image/*"
                    // className={classes.input}
                    // style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    onChange={(e) => {
                        const { files } = e.target;

                        if (files && files[0]) {
                            setImagePath( URL.createObjectURL(files[0]));    
                        }
                        else {
                            setImagePath(null);    
                        }
                    }}
                />
            )}
            {imagePath && (
                // <Image src="/static/images/bike1.jpg" style={{maxWidth: "1000px"}}/>
                <Image src={imagePath} style={{maxWidth: "1000px"}}/>
            )}
        </form>
    )
}

export default BikeForm;