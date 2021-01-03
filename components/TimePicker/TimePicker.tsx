import { Box } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const hours = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
];
const minutes = ['00', '15', '30', '45'];

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 120,
    [theme.breakpoints.down('sm')]: {
      width: '40%',
    },
  },
  menuPaper: {
    maxHeight: 300,
  },
}));

const BikeTimePicker = ({ hour, minute, onHourChange, onMinuteChange }) => {
  const classes = useStyles();
  return (
    <Box justifyContent="center">
      <FormControl variant="filled" className={classes.formControl}>
        <Select
          value={hour}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            onHourChange(event.target.value as string)
          }
          MenuProps={{ classes: { paper: classes.menuPaper } }}
        >
          {hours &&
            hours.map((h) => (
              <MenuItem value={h} key={h}>
                {h}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl variant="filled" className={classes.formControl}>
        <Select
          value={minute}
          onChange={(event: React.ChangeEvent<{ value: string }>) => {
            onMinuteChange(event.target.value);
          }}
          MenuProps={{ classes: { paper: classes.menuPaper } }}
        >
          {minutes &&
            minutes.map((m) => (
              <MenuItem value={m} key={m}>
                {m}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BikeTimePicker;
