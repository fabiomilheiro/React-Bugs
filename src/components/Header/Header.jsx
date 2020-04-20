import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import BugReportIcon from "@material-ui/icons/BugReport";

const useStyles = makeStyles({
  root: {
    paddingBottom: "1rem",
    borderBottom: "1px solid maroon",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
  },
  logo: {
    fontSize: "3.9rem;",
    color: "maroon",
    marginRight: "1.2rem",
  },
});

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        <BugReportIcon className={classes.logo} />
        Buggy
      </Typography>
    </div>
  );
};

export default Header;
