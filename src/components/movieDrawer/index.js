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
import { setFavoritesMovie } from "../../ducks/movie";

export const MovieDrawer = (props, { match, history }) => {
  const dispatch = useDispatch();
  const { favoritesMovie } = useSelector((state) => state.movie);

  return (
    <Drawer open={props.isOpen} onClose={props.handlerMenuClose}>
      <ListSubheader>Favorite films</ListSubheader>
      <Divider />
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
                onClick={() => dispatch(setFavoritesMovie(item.id))}
              >
                <FavoriteIcon color="secondary" />
              </IconButton>
            </ListItem>
          ))}
      </List>
      {/* <ListItem button key={"Go to favorite page"}>
        <ListItemText primary={"Go to favorite page"} />
      </ListItem> */}
    </Drawer>
  );
};
