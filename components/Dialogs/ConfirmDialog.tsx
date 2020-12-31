// import React from 'react';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';


// export default function ConfirmDialog({open, setOpen, setConfirmDelete}) {
// //   const [open, setOpen] = React.useState(false);

// //   const onHandleClickOpen = () => {
// //     setOpen(true);
// //     handleClickOpen()
// //   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const onDelete = ()  => {
//       setOpen(false);
//       setConfirmDelete(true);
//   }

//   return (
//     <div>
//       {/* <Button variant="outlined" color="primary" onClick={onHandleClickOpen}>
//         Open form dialog
//       </Button> */}
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="draggable-dialog-title"
//       >
//         <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
//           Subscribe
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             To subscribe to this website, please enter your email address here. We will send updates
//             occasionally.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button autoFocus onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={onDelete} color="primary">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }


import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmDialog = (props) => {
  const { title, children, open, setOpen, onConfirm } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => setOpen(false)}
          color="secondary"
        >
          No
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          color="default"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;