import { Button, CardHeader, Grid, TextField } from "@material-ui/core";
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import Style from "./Authentication.module.scss";

const LoginPage: React.FC<IProps> = () => {
  // const history = useHistory();

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    console.log(e.target);
  }, []);
  // const onSubmit = () => {
  //   history.push("/home");
  // };

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
              label="Email or Phone"
              type="string"
              required
              autoFocus
            />
          </Grid>

          <Grid item>
            <TextField
              id="password"
              label="Password"
              type="password"
              required
              autoFocus
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
