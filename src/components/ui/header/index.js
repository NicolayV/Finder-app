import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import debounce from "lodash.debounce";
import { useStyles } from "./style";
import { setSearchInit, setSearchedMovie } from "../../../ducks/movie";
import { authLogOut } from "../../../ducks/auth";
import { isAuthUser } from "../../../utils/storage";
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
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearIcon from "@material-ui/icons/Clear";
import NavLinks from "../navlinks";
import { SideDrawer } from "../drawer";

function HideOnScroll(props) {
  const { children, window } = props;
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
  const searchInput = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [drawerToggle, setDrawerToggle] = useState(false);

  const handlerSearch = debounce((searchText) => {
    dispatch(setSearchInit());
    dispatch(setSearchedMovie(searchText));
    history.push("/search");
  }, 1000);

  return (
    <>
      <div className={classes.root}>
        <HideOnScroll {...props}>
          <AppBar position="fixed">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="secondary"
                aria-label="menu"
                onClick={() =>
                  setDrawerToggle((prevDrawerToggle) => !prevDrawerToggle)
                }
              >
                <SubscriptionsIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Login: {user.userLogin || user.isAuth}
              </Typography>

              <NavLinks />

              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="clear"
                        onClick={() => (searchInput.current.value = "")}
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  inputRef={searchInput}
                  onChange={(e) => handlerSearch(e.target.value)}
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              {/*  */}
              {/*  */}
              {/*  */}
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
      <SideDrawer
        drawerToggle={drawerToggle}
        setDrawerToggle={() =>
          setDrawerToggle((prevDrawerToggle) => !prevDrawerToggle)
        }
      />
    </>
  );
};
