import React from "react";
import Style from "./IntroPage.module.scss";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const IntroPage: React.FC = () => {
  return (
    <div className={Style.container}>
      <div className={Style.titleContainer}>
        <img
          src="https://i0.wp.com/tekiota.com/wp-content/uploads/2017/01/The-computer-forgot-my-password.gif"
          alt=""
          className={Style.titleImage}
        />
      </div>
      <div className={Style.titleContainer}>
        <span className={Style.title}>PASSCRIPTER</span>
      </div>
      <div className={Style.buttonContainer}>
        <Link to="/login" className={Style.button}>
          <Button size="large" variant="contained" color="primary">
            Login
          </Button>
        </Link>
        <Link to="/signup" className={Style.button}>
          <Button size="large" variant="contained" color="primary">
            SignUp
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default IntroPage;
