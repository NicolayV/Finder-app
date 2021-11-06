import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setFavoritesMovie } from "../../../ducks/movie";
import { IconButton } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import { Divider, List, ListItem, ListSubheader } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import MenuBookIcon from "@material-ui/icons/MenuBook";

import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import { useStyles } from "./style";

export const SideDrawer = ({ open, onClose }) => {
  let history = useHistory();
  const dispatch = useDispatch();

  const { favoritesMovie } = useSelector((state) => state.movie);

  return (
    <Drawer open={open} onClose={onClose}>
      <ListSubheader>Favorite films</ListSubheader>
      <Divider />
      <List>
        {favoritesMovie.length > 0 &&
          favoritesMovie.map((item) => (
            <ListItem button key={item.title}>
              <ListItemIcon>
                <BookmarksIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                onClick={() => history.push("/film/" + item.id)}
              />
              <IconButton
                aria-label="add to favorites"
                onClick={() => dispatch(setFavoritesMovie(item.id))}
              >
                <FavoriteIcon color="secondary" />
              </IconButton>
            </ListItem>
          ))}
        <Divider />

        <ListItem
          onClick={() => history.push("/favorite")}
          button
          key={"ifavorite"}
        >
          <ListItemIcon>
            <MenuBookIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary={"Go to favorite page..."} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export const DrawerButton = ({ open }) => {
  const classes = useStyles();

  return (
    <IconButton
      edge="start"
      className={classes.menuButton}
      color="secondary"
      aria-label="menu"
      onClick={open}
    >
      <SubscriptionsIcon />
    </IconButton>
  );
};
