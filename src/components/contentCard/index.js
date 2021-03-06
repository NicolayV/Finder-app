import React, { memo } from "react";
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
import { setFavoritesMovie } from "../../ducks/movie";
import { useHistory } from "react-router-dom";

const SingleContent = ({ poster, title, date, id }) => {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const { favoritesMovie } = useSelector((state) => state.movie);
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
            onClick={() => dispatch(setFavoritesMovie(id))}
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
// !! SingleContent has an error - dublicate key, after route to ather page
export const PureSingleContent = memo(SingleContent);
