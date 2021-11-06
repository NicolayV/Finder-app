import { Button, Card } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "./style";
import { getMovieDetailById, setMovieDetailById } from "../../ducks/movie";
import { poster, noImage } from "../../config/config";
import { useHistory, useRouteMatch } from "react-router-dom";

export const MovieDetails = () => {
  let history = useHistory();
  let match = useRouteMatch();
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(
    () => dispatch(getMovieDetailById(match.params.id)),
    [dispatch, match.params.id]
  );
  const { currentMovieDetail } = useSelector((state) => state.movie);

  return (
    <Card className={classes.wrapper}>
      <div>
        <Button
          className={classes.cardButton}
          onClick={() => {
            dispatch(setMovieDetailById([]));
            history.push("/main");
          }}
          variant="contained"
          color="primary"
          size="small"
        >
          Go back
        </Button>
        <img
          src={
            !currentMovieDetail.poster_path
              ? noImage
              : poster + currentMovieDetail.poster_path
          }
          alt="film"
        />
      </div>
      <div>
        <h1>
          {currentMovieDetail.status_code === 34
            ? "Sorry, the movied you requested could not be found"
            : currentMovieDetail.title}
        </h1>

        <h4>{currentMovieDetail.original_title}</h4>
        <ul>
          <li>Year: {currentMovieDetail.release_date}</li>
          <li>Budjet: {currentMovieDetail.budget}$</li>
          <li>Runtime: {currentMovieDetail.runtime} minutes</li>
          <li>Rating: {currentMovieDetail.vote_average}</li>
        </ul>
        <p>Overview: {currentMovieDetail.overview}</p>
      </div>
    </Card>
  );
};
