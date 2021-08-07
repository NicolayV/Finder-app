import React from "react";
import { useDispatch, useSelector } from "react-redux";
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

import FavoriteIcon from "@material-ui/icons/Favorite";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/actions/allActionCreators";

export const MovieDrawer = (props, { match, history }) => {
  const dispatch = useDispatch();
  const { setFavoritesMovie } = bindActionCreators(actionCreators, dispatch);
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
              <IconButton
                aria-label="add to favorites"
                onClick={() => setFavoritesMovie(item.id)}
              >
                <FavoriteIcon color="secondary" />
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