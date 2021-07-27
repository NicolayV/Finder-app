import { Button, Card, CardHeader } from "@material-ui/core";
import React from "react";
import CardMedia from "@material-ui/core/CardMedia";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useStyles } from "./style";
import { img_300, unavailable } from "../../config/config";

export const MovieDetails = () => {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();

  const state = useSelector((state) => state.appDB.currentMovieDetail);

  return (
    <Card className={classes.root}>
      <Button
        className={classes.cardButton}
        onClick={() => history.push("/step2")}
        variant="contained"
        color="primary"
        size="small"
      >
        Go backd
      </Button>

      <CardHeader
        className={classes.cardHeader}
        title={state.original_title}
        subheader={<span>{state.original_title}</span>}
      />
      <CardMedia
        className={classes.media}
        image={state.poster ? `${img_300}/${state.poster}` : unavailable}
        title={state.title}
      />
      <CardMedia className={classes.media} />

      <h1>{state.original_title}</h1>
    </Card>
  );
};
