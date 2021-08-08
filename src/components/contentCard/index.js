import React from "react";
import { useStyles } from "./style";
import { img_300, unavailable } from "../../config/config";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import { Avatar, Button, CardActions, IconButton } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/actions/allActionCreators";

import { useHistory } from "react-router-dom";

export const SingleContent = ({ poster, title, date, id }) => {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const { setFavoritesMovie } = bindActionCreators(actionCreators, dispatch);
  const { favoritesMovie } = useSelector((state) => state.appDB);
  const isLiked = favoritesMovie.find((item) => item.id === id);

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.сardHeader}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {title[0]}
          </Avatar>
        }
        action={
          <IconButton
            style={isLiked ? { color: "red" } : null}
            aria-label="add to favorites"
            onClick={() => setFavoritesMovie(id)}
          >
            <FavoriteIcon />
          </IconButton>
        }
        title={title}
        subheader={<span>{date}</span>}
      />

      <CardActionArea onClick={() => history.push("/film/" + id)}>
        <CardMedia
          className={classes.media}
          image={poster ? `${img_300}/${poster}` : unavailable}
          title={title}
        />
      </CardActionArea>
      <CardActions>
        <Button
          onClick={() => history.push("/film/" + id)}
          className={classes.cardButton}
          variant="outlined"
          color="primary"
          size="small"
          endIcon={<ExpandMoreIcon />}
        >
          Learn more
        </Button>
      </CardActions>
    </Card>
  );
};
