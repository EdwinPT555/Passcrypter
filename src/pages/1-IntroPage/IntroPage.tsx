import React from "react";
import Style from "./IntroPage.module.scss";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const IntroPage: React.FC = () => {
  return (
    <div className={Style.container}>
      <div className={Style.titleContainer}>
        <span className={Style.title}>PASSCRIPTER</span>
      </div>
      <div className={Style.buttonContainer}>
        <Link to="/login" className={Style.button}>
          <Button size="large" variant="contained" color="secondary">
            Login
          </Button>
        </Link>
        <Link to="/signup" className={Style.button}>
          <Button size="large" variant="contained" color="secondary">
            SignUp
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default IntroPage;
