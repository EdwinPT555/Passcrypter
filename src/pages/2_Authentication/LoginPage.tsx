import { Button, CardHeader, Grid, TextField } from "@material-ui/core";
import React, { useCallback } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Style from "./Authentication.module.scss";

const LoginPage: React.FC<IProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleEmail = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(event.currentTarget.value);
  };
  const handlePassword = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (email === "edwinpt555@gmail.com" && password === "123") {
        history.push("/home");
      } else {
        alert("Incorrect Email or Password");
      }
    },
    [email, history, password]
  );

  return (
    <div className={Style.container}>
      <form className={Style.form} onSubmit={onSubmit}>
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
              onChange={handleEmail}
              value={email}
            />
          </Grid>

          <Grid item>
            <TextField
              id="password"
              label="Password"
              type="password"
              required
              autoFocus
              onChange={handlePassword}
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
                <Button variant="contained" color="primary" type="reset">
                  Cancel
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
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
