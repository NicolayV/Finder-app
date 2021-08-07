import { Button, Card } from "@material-ui/core";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "./style";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/actions/allActionCreators";
const poster = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/";
const noImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRVTzTTaf9FVUAkBIP4FeE2P3odm6bLLx1m_Cy7SSrrMuRFNUyj&usqp=CAU";

export const MovieDetails = ({ match, history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { getMovieDetailById, setMovieDetailById } = bindActionCreators(
    actionCreators,
    dispatch
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getMovieDetailById(match.params.id), [match.params.id]);
  const { currentMovieDetail } = useSelector((state) => state.appDB);

  return (
    <Card className={classes.wrapper}>
      <div>
        <Button
          className={classes.cardButton}
          onClick={() => {
            setMovieDetailById([]);
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
