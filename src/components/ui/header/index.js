import React, { useState } from "react";
import { useStyles } from "./style";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  Slide,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
// import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

import { useDispatch, useSelector } from "react-redux";
import Drawer from "@material-ui/core/Drawer";
import { Divider, List, ListItem, ListSubheader } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import { setFavoritesMovie, setSearchText } from "../../../ducks/movie";
import { authLogOut } from "../../../ducks/auth";
import { isAuthUser } from "../../../apiMovies";
import { useHistory } from "react-router-dom";
import debounce from "lodash.debounce";

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export const Header = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { favoritesMovie } = useSelector((state) => state.movie);
  const [toggle, setToggle] = useState(false);

  const handlerSearch = debounce((searchText) => {
    dispatch(setSearchText(searchText));
    history.push("/search");
  }, 500);

  return (
    <>
      <div className={classes.root}>
        {/* <CssBaseline /> */}
        <HideOnScroll {...props}>
          <AppBar position="fixed">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="secondary"
                aria-label="menu"
                onClick={() => setToggle(!toggle)}
              >
                <SubscriptionsIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Login: {user.userLogin || user.isAuth}
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  onChange={(e) => handlerSearch(e.target.value)}
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>

              <Button
                onClick={() => {
                  isAuthUser(false);
                  dispatch(authLogOut());
                  return setTimeout(() => history.push("/"), 500);
                }}
                color="inherit"
              >
                sign out
              </Button>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      </div>
      {/*  */}
      {/*  */}
      {/*  */}
      <Drawer open={toggle} onClose={() => setToggle(!toggle)}>
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
    </>
  );
};
