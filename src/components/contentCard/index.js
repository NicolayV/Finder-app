import React from "react";
import { useStyles } from "./style";
import { img_300, unavailable } from "../../config/config";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import { Button } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/actions/allActionCreators";

import { useHistory } from "react-router-dom";

export const SingleContent = ({ poster, title, date, id }) => {
  const classes = useStyles();
  let history = useHistory();

  const dispatch = useDispatch();
  const { getMovieDetailById } = bindActionCreators(actionCreators, dispatch);

  const handlerMovieCard = () => {
    getMovieDetailById(id);
    history.push("/film/" + id);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={poster ? `${img_300}/${poster}` : unavailable}
        title={title}
      />

      <CardHeader
        className={classes.cardHeader}
        title={title}
        subheader={<span>{date}</span>}
      />
      <Button
        onClick={() => handlerMovieCard()}
        className={classes.cardButton}
        variant="contained"
        color="primary"
        size="small"
        endIcon={<ExpandMoreIcon />}
      >
        Learn more
      </Button>
    </Card>
  );
};
