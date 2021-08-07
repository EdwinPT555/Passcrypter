import { Button, CardHeader, Grid, TextField } from "@material-ui/core";
import { AccountCircle, EmailOutlined, PhoneIphone } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import Style from "./Authentication.module.scss";
import MuiPhoneNumber from "material-ui-phone-number";

const SignUpPage: React.FC<IProps> = () => {
  return (
    <div className={Style.container}>
      <form className={Style.form}>
        <CardHeader title="SignUp here" style={{ color: "#3f51b5" }} />
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="column"
          spacing={1}
        >
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField
                id="input-with-icon-grid"
                label="User Name"
                type="string"
                required
                autoFocus
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <EmailOutlined />
            </Grid>
            <Grid item>
              <TextField
                id="input-with-icon-grid"
                label="Email"
                type="email"
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <PhoneIphone />
            </Grid>
            <Grid item>
              <MuiPhoneNumber
                name="phone"
                label="Phone Number"
                data-cy="user-phone"
                defaultCountry={"in"}
                required
              />
            </Grid>
          </Grid>
          <br />

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
          Already have an account?{" "}
          <Link to="/login" className={Style.link}>
            Login
          </Link>{" "}
          here
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;

interface IProps {}
