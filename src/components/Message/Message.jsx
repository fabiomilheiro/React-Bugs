import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    fontSize: "1.3rem",
    padding: "2rem",
  },
});

const Message = (props) => {
  const classes = useStyles();

  return (
    <div data-testid={props.id} className={classes.root}>
      {props.icon} {props.children}
    </div>
  );
};

export default Message;
