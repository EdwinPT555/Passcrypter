import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Delete, Search } from "@material-ui/icons";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { ICard } from "../../interfaces/ICard";
import CardForm from "./Components/CardForm";
import Navabar from "./Components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home: React.FC = () => {
  const [data, setData] = useState<ICard[]>([]);
  // const [open, setOpen] = React.useState(false);

  const deleteCard = useCallback(
    (cardid: any) => {
      fetch(`/deletecard/${cardid}`, {
        method: "delete",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          const newData = data.filter((item) => {
            return item._id !== result._id;
          });
          setData(newData);
          toast.success("Card Deleted Successfully");
        });
    },
    [data]
  );

  useEffect(() => {
    fetch("/home", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.cards);
      });
  }, [deleteCard]);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div>
      <Navabar cardTotal={data.length} />
      <ToastContainer />
      <CardForm />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
          margin: "50px 0",
        }}
      >
        {data.length ? (
          data.map((card: ICard) => {
            return (
              <div>
                <Button
                  style={{
                    width: "200px",
                    height: "100px",
                    margin: "10px 0",
                    background: "#f50057",
                    color: "white",
                    boxShadow: "black 1px 1px 5px",
                  }}
                  color="secondary"
                >
                  <h3>{card.title}</h3>
                </Button>
                <Delete
                  onClick={() => deleteCard(card._id)}
                  style={{
                    position: "absolute",
                    marginLeft: "-30px",
                    marginTop: "15px",
                    color: "#2c387e",
                    cursor: "pointer",
                    background: "white",
                    borderRadius: "5px",
                    padding: "1px",
                    zIndex: 10,
                  }}
                />
                {/* <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title" style={{ color: "red" }}>
                    {"Delete Card"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure want delete this card?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={deleteCard} color="primary" autoFocus>
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
             */}
              </div>
            );
          })
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Search
              style={{
                fontSize: "5rem",
                height: "100%",
                borderRadius: "50%",
                padding: "0",
                background: "white",
                color: "WindowFrame",
              }}
            />
            <h1 style={{ color: "windowframe" }}>No Cards Found!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

interface Props {}
