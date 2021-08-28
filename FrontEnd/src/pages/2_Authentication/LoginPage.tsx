import React from "react";
import { Button, CardHeader, Grid, TextField } from "@material-ui/core";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Style from "./Authentication.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage: React.FC<IProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const PostData = (e: any) => {
    setLoading(true);
    e.preventDefault();
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setLoading(false);
      toast.error("Invalid Email !!");
      return;
    } else {
      fetch("/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast.error(`${data.error} 🙁`);
          } else {
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            toast.success("Successfully Logged in 😍");
            setTimeout(() => {
              history.push("/home");
            }, 2000);
          }
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className={Style.container}>
      <ToastContainer />
      <form className={Style.form} onSubmit={PostData}>
        <CardHeader title="Login here" style={{ color: "#3f51b5" }} />
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
          spacing={1}
        >
          <Grid item>
            <TextField
              id="email"
              label="Email"
              type="email"
              required
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Grid>

          <Grid item>
            <TextField
              id="password"
              label="Password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Grid>

          <Grid
            item
            container
            justifyContent="center"
            direction="row"
            spacing={2}
          >
            <Grid item>
              <Link to="/" className={Style.link}>
                <Button
                  disabled={loading}
                  variant="contained"
                  color="primary"
                  type="reset"
                >
                  Cancel
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Button
                disabled={loading}
                variant="contained"
                color="primary"
                type="submit"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <p>
          Dont you have account?{" "}
          <Link to="/signup" className={Style.link}>
            SignUp
          </Link>{" "}
          here
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

interface IProps {}
