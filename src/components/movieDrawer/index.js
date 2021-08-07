import React from "react";
import { useSelector } from "react-redux";
import Drawer from "@material-ui/core/Drawer";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListSubheader,
} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { useStyles } from "../../pages/movieCard/style";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BookmarksIcon from "@material-ui/icons/Bookmarks";

export const MovieDrawer = (props) => {
  const classes = useStyles();
  const { favoritesMovie } = useSelector((state) => state.appDB);

  return (
    <Drawer open={props.isOpen} onClose={props.handlerMenuClose}>
      <ListSubheader>Favorite films</ListSubheader>
      <List>
        {favoritesMovie.length > 0 &&
          favoritesMovie.map((item) => (
            <ListItem button key={item.title}>
              <ListItemIcon>
                <BookmarksIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={item.title} />
              <IconButton color="secondary" aria-label="delete">
                <FavoriteIcon />
              </IconButton>
            </ListItem>
          ))}
      </List>
      <Divider />
      <ListItem button key={"Go to favorite page"}>
        <ListItemText primary={"Go to favorite page"} />
      </ListItem>
    </Drawer>
  );
};
