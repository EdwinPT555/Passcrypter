import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

const CardForm: React.FC<IProps> = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [pin, setPin] = useState<number>();

  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
    history.push("/home/createcard");
  };

  const handleClose = () => {
    setPin(undefined);
    setOpen(false);
  };

  const postCardDetails = (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (title === "") {
      toast.error("You must add a Title 😤");
      return;
    } else if (!/^(?!(.)\1{3})(?!19|20)\d{4}$/.test(`${pin}`)) {
      toast.error("PIN must be 4 digit number 😤");
      setPin(undefined);
      setLoading(false);
      return;
    } else {
      fetch("/home/createcard", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          pin,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            toast.error(`${data.error} 🙁`);
          } else {
            toast.success("Card Created Successfully");
            setTimeout(() => {
              setOpen(false);
              history.push("/home");
            }, 2000);
          }
        })
        .catch((err) => console.log(err));
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <IconButton
        onClick={handleClickOpen}
        color="primary"
        style={{
          position: "fixed",
          bottom: "0",
          right: "0",
          margin: "20px",
          zIndex: 100,
        }}
      >
        <AddCircleIcon
          style={{
            fontSize: "5rem",
            height: "100%",
            boxShadow: "black 1px 1px 5px",
            borderRadius: "50%",
            padding: "0",
            background: "white",
          }}
        />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={postCardDetails}>
          <DialogTitle id="form-dialog-title" color="secondary">
            Create Card
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Card Title"
              type="string"
              fullWidth
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <br />
            <DialogContentText color="secondary">
              PIN must be 4 Digit number
            </DialogContentText>
            <TextField
              id="pin"
              label="Card PIN"
              type="password"
              onChange={(e) => setPin(Number(e.target.value))}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" disabled={loading}>
              Cancel
            </Button>
            <Button color="primary" type="submit" disabled={loading}>
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CardForm;

interface IProps {}
