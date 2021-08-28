import { Button, TextField } from "@material-ui/core";
import React from "react";
import { useContext } from "react";
import AppContext from "../../../AppContext";

const Profile = () => {
  const { user } = useContext(AppContext);
  return (
    <div
      style={{
        width: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "50px 20px",
      }}
    >
      <img
        src="https://cdn.onlinewebfonts.com/svg/img_24787.png"
        alt=""
        height="100px"
      />
      <TextField label="User Name" value={user.username} fullWidth />
      <TextField label="Email" value={user.email} fullWidth />
      <TextField label="User ID" value={user._id} fullWidth />
      <Button
        // disabled={loading}
        variant="contained"
        color="primary"
        type="submit"
      >
        Update
      </Button>
    </div>
  );
};

export default Profile;
