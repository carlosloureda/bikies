import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Image from 'material-ui-image';

import Rating from '@material-ui/lab/Rating';

import {
  TextField,
  Button,
  FormControl,
  Box,
  Input,
  Grid,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import Api from '../../utils/api';

type Inputs = {
  model: string;
  color: string;
  location: string;
  rating: number;
  image: string;
};

const useStyles = makeStyles((theme) => ({
  formRow: {
    paddingBottom: 15,
  },
}));
const BikeForm = ({ mode, bike }: { mode: string; bike?: Inputs }) => {
  const { register, handleSubmit, watch, errors, control } = useForm<Inputs>({
    defaultValues: {
      model: (bike && bike.model) || '',
      color: (bike && bike.color) || '',
      location: (bike && bike.location) || '',
      rating: (bike && bike.rating) || 0,
      image: (bike && bike.image) || '',
    },
  });
  const [rating, setRating] = React.useState(3.6);
  const router = useRouter();

  const [imagePath, setImagePath] = React.useState(null);

  const onSubmitHandler = async (data) => {
    setError('');

    console.log('--> data: ', data.image[0]);
    console.log('--> errors: ', errors);

    if (!errors || !Object.values(errors).length) {
      let result = null;

      console.log('>>> data image: ', data.image[0]);

      // const dataForSignature = {
      //   timestamp: new Date().getTime(),
      // };

      // function str2ab(str) {
      //   var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
      //   var bufView = new Uint16Array(buf);
      //   for (var i = 0, strLen = str.length; i < strLen; i++) {
      //     bufView[i] = str.charCodeAt(i);
      //   }
      //   return buf;
      // }

      // let signature1 = `timestamp=${dataForSignature.timestamp}aOpnNEQfiLiOOwGF2Yxtcwwmg4s`;
      // let signature = crypto.subtle.digest('SHA-256', str2ab(signature1));

      // await fetch(
      //   `https://api.cloudinary.com/v1_1/carloslorueda/image/upload`,
      //   {
      //     method: 'POST',
      //     // mode: 'cors',
      //     // credentials: 'same-origin',
      //     headers: {
      //       // 'Content-Type': 'application/x-www-form-urlencoded',
      //       'Content-Type': 'application/json',
      //       // Authorization: '',
      //     },
      //     // redirect: 'follow',
      //     // referrerPolicy: 'no-referrer',
      //     body: JSON.stringify({
      //       file: data.image[0],
      //       // api_key: '215248273781966',
      //       // timestamp: dataForSignature.timestamp,
      //       // signature,
      //       // upload_preset: 'bikies',
      //     }),
      //   }
      // );
      data.image = 'imagePath';
      result = await Api.post('api/bikes', JSON.stringify(data));

      if (!result.success) {
        setError(result.error);
      } else {
        const updatedBike = result.data;
        if (mode === 'create') {
          router.push(`/admin/bikes/${updatedBike._id}`);
        }
      }
    }
  };

  const onFileLoad = (e, file) => console.log(e.target.result, file.name);

  const classes = useStyles();
  const [error, setError] = React.useState('');

  return (
    <Grid container justify="center" item xs={12}>
      <Grid item xs={12} container justify="center">
        <form onSubmit={handleSubmit((data) => onSubmitHandler(data))}>
          {error && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          )}
          <Box className={classes.formRow}>
            <TextField
              name="model"
              label="Model"
              inputRef={register({ required: true })}
              error={Boolean(errors.model)}
              helperText={errors && errors.model && errors.model.message}
              disabled={mode === 'view'}
            />
          </Box>
          <Box className={classes.formRow}>
            <TextField
              name="color"
              label="Color"
              inputRef={register({ required: true })}
              error={Boolean(errors.color)}
              helperText={errors && errors.color && errors.color.message}
              disabled={mode === 'view'}
            />
          </Box>
          <Box className={classes.formRow}>
            <TextField
              name="location"
              label="Location"
              inputRef={register({ required: true })}
              error={Boolean(errors.location)}
              helperText={errors && errors.location && errors.location.message}
              disabled={mode === 'view'}
            />
          </Box>
          {mode === 'edit' && (
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          )}
          {mode === 'view' && (
            <Rating name="read-only" value={rating} readOnly />
          )}

          {mode !== 'view' && (
            <Box className={classes.formRow}>
              <Input
                type="file"
                name="image"
                inputRef={register}
                onChange={(e) => {
                  const { files } = e.target;

                  if (files && files[0]) {
                    setImagePath(URL.createObjectURL(files[0]));
                  } else {
                    setImagePath(null);
                  }

                  // const storageRef = app.storage().ref();
                  // const fileRef = storageRef.child(files[0].name);
                  // fileRef.put(files[0]).then(() => {
                  //   console.log('Uploaded a file');
                  // });
                }}
              />
            </Box>
          )}

          {mode !== 'view' && (
            <Box className={classes.formRow}>
              <FormControl>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </FormControl>
            </Box>
          )}
        </form>
      </Grid>
      <Grid item xs={9} container justify="center">
        {imagePath && (
          // <Image src="/static/images/bike1.jpg" style={{maxWidth: "1000px"}}/>
          <Image src={imagePath} />
        )}
      </Grid>
    </Grid>
  );
};

export default BikeForm;
