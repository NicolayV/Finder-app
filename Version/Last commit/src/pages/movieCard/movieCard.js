import { Button, Card, CardHeader } from "@material-ui/core";
import React from "react";
import CardMedia from "@material-ui/core/CardMedia";

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useStyles } from "./style";

export const MovieCard = () => {
  const classes = useStyles();
  let history = useHistory();

  const handlerMovieCard = () => {
    history.push("/step2");
  };

  const state = useSelector((state) => state);
  const movieCard = state.movieDB.movieCard;
  console.log(movieCard);

  return (
    <Card className={classes.root}>
      <Button
        className={classes.cardButton}
        onClick={() => handlerMovieCard()}
        variant="contained"
        color="primary"
        size="small"
      >
        Go back
      </Button>

      <CardHeader
        className={classes.cardHeader}
        title={movieCard.original_title}
        subheader={<span>{movieCard.original_title}</span>}
      />
      <CardMedia className={classes.media} />

      <h1>{movieCard.original_title}</h1>
    </Card>
  );
};
