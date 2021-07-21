import React from "react";
import { useStyles } from "./style";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export const Header = (props) => {
  const { loginName, handleAuthLogOut, handlerSearch } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Login: {loginName}
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={handlerSearch}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <Button onClick={handleAuthLogOut} color="inherit">
            sign out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
