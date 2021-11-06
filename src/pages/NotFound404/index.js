import React from "react";
import { useLocation } from "react-router";
import { useStyles } from "./style";

export const NotFound = () => {
  const classes = useStyles();
  const location = useLocation();

  console.log("404", location);
  return (
    <div className={classes.root}>
      <h1>Resource not found at "{location.pathname}"</h1>
    </div>
  );
};
