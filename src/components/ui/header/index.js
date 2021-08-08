import React from "react";
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
  const { loginName, handlerAuthLogOut, handlerSearch, handlerMenuOpen } =
    props;
  const classes = useStyles();

  return (
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
              onClick={handlerMenuOpen}
            >
              <SubscriptionsIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Login: {loginName}
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

            <Button onClick={handlerAuthLogOut} color="inherit">
              sign out
            </Button>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </div>
  );
};
