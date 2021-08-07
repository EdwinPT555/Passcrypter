import { Button, CardHeader, Grid, TextField } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Style from "./Authentication.module.scss";

const LoginPage: React.FC<IProps> = () => {
  return (
    <div className={Style.container}>
      <form className={Style.form}>
        <CardHeader title="Login here" style={{ color: "#3f51b5" }} />
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="column"
          spacing={1}
        >
          <Grid item>
            <TextField
              id="input-with-icon-grid"
              label="Email or Phone"
              type="string"
              required
              autoFocus
            />
          </Grid>

          <Grid item>
            <TextField
              id="input-with-icon-grid"
              label="Password"
              type="password"
              required
              autoFocus
            />
          </Grid>

          <Grid item container justify="center" direction="row" spacing={2}>
            <Grid item>
              <Link to="/" className={Style.link}>
                <Button variant="contained" color="primary" type="reset">
                  Cancel
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Submit
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
