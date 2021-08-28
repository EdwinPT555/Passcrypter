import { useState } from "react";
import { Button, CardHeader, Grid, TextField } from "@material-ui/core";
import {
  AccountCircle,
  EmailOutlined,
  PhoneIphone,
  VpnKey,
} from "@material-ui/icons";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import Style from "./Authentication.module.scss";
import MuiPhoneNumber from "material-ui-phone-number";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage: React.FC<IProps> = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
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
      fetch("/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          phone,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast.error(`${data.error}`);
          } else {
            toast.success(`${data.message}`);
            setTimeout(() => {
              history.push("/login");
            }, 5000);
          }
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className={Style.container}>
      <ToastContainer />
      <form className={Style.form}>
        <CardHeader title="SignUp here" style={{ color: "#3f51b5" }} />
        <Grid
          container
          alignItems="center"
          justifyContent="center"
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <PhoneIphone />
            </Grid>
            <Grid item>
              <TextField
                id="input-with-icon-grid"
                label="Phone Number"
                type="number"
                required
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              />
              {/* <MuiPhoneNumber
                name="phone"
                label="Phone Number"
                data-cy="user-phone"
                defaultCountry={"in"}
                required
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              /> */}
            </Grid>
          </Grid>

          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <VpnKey />
            </Grid>
            <Grid item>
              <TextField
                id="input-with-icon-grid"
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <br />

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
              <Button
                disabled={loading}
                variant="contained"
                color="primary"
                type="submit"
                onClick={PostData}
              >
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
