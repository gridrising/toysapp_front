import React, { ChangeEvent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

type Props = {
  src: string;
  change: (arg: any) => any;
};

export default function TransitionsModal(props: Props) {
  const { src, change } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState<FileList | null>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files);
  };
  console.log(file);
  return (
    <div>
      <img
        onClick={handleOpen}
        src={src}
        alt=""
        style={{ width: 55, borderRadius: '50%' }}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Upload image</h2>
            <p id="transition-modal-description">
              <input
                type="file"
                name="image"
                accept=".jpg, .jpeg, .png"
                onChange={handleChange}
              ></input>
              <Button onClick={() => change(file)}>Upload</Button>
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
