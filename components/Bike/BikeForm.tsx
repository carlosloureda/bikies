import React from 'react';
import { Controller, useForm } from 'react-hook-form';
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
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import Api from '../../utils/api';

type Inputs = {
  _id: string;
  model: string;
  color: string;
  location: string;
  rating: number;
  image: string;
  available: boolean;
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
      available: (bike && bike.available) || true,
    },
  });
  const [rating, setRating] = React.useState(3.6);
  const [sending, setSending] = React.useState(false);
  const router = useRouter();

  const [imagePath, setImagePath] = React.useState(null);

  const onSubmitHandler = async (data) => {
    setError('');
    setSending(true);

    if (!errors || !Object.values(errors).length) {
      let result = null;

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
      if (mode === 'create') {
        result = await Api.post(`api/bikes`, JSON.stringify(data));
      } else if (mode === 'edit') {
        result = await Api.update(
          `api/bikes/${bike._id}`,
          JSON.stringify(data)
        );
      }

      if (!result.success) {
        setError(result.error);
      } else {
        const updatedBike = result.data;
        if (mode === 'create') {
          router.push(`/admin/bikes/${updatedBike._id}`);
        }
      }
    }
    setSending(false);
  };

  // const onFileLoad = (e, file) => console.log(e.target.result, file.name);

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
          )}
          </Box>

          <Box className={classes.formRow}>
            <FormControlLabel
              value={bike.available}
              control={<Checkbox />}
              label="Available"
              name="available"
              inputRef={register}
              disabled={mode === 'view'}
            />
          </Box>
          {mode === 'view' && (
            <Rating name="read-only" value={rating} readOnly />
          )}

          {/* TODO: fix this */}
          {mode !== 'view' && (
            <Box className={classes.formRow}>
              <Input
                type="file"
                name="image"
                // inputRef={register}
                // value=""
                // onChange={(e) => {
                //   const { files } = e.target;

                //   if (files && files[0]) {
                //     setImagePath(URL.createObjectURL(files[0]));
                //   } else {
                //     setImagePath(null);
                //   }

                //   // const storageRef = app.storage().ref();
                //   // const fileRef = storageRef.child(files[0].name);
                //   // fileRef.put(files[0]).then(() => {
                //   //   console.log('Uploaded a file');
                //   // });
                // }}
              />
            </Box>
          )}

          {mode !== 'view' && (
            <Box className={classes.formRow}>
              <FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={sending}
                >
                  Submit
                </Button>
              </FormControl>
            </Box>
          )}
        </form>
      </Grid>
      <Grid item xs={9} container justify="center">
        {imagePath && <Image src={imagePath} />}
      </Grid>
    </Grid>
  );
};

export default BikeForm;
