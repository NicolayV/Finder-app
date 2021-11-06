import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useStyles } from "./style";
import { authLogOut } from "../../../ducks/auth";
import { setLoggedUserLS } from "../../../utils/storage";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import NavLinks from "../navlinks";
import { DrawerButton, SideDrawer } from "../drawer";
import { HideOnScroll } from "../hideOnScroll";
import { SearchInput } from "../searchInput";

export const Header = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.auth.userLogin);

  const [drawerToggle, setDrawerToggle] = useState(false);
  const drawerToggleHandler = () =>
    setDrawerToggle((prevDrawerToggle) => !prevDrawerToggle);

  return (
    <>
      <div className={classes.root}>
        <HideOnScroll {...props}>
          <AppBar position="fixed">
            <Toolbar>
              <DrawerButton open={drawerToggleHandler} />

              <Typography variant="h6" className={classes.title}>
                Login: {userLogin}
              </Typography>

              <NavLinks />
              <SearchInput />

              <Button
                onClick={() => {
                  setLoggedUserLS(false);
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
        {props.children}
      </div>

      <SideDrawer open={drawerToggle} onClose={drawerToggleHandler} />
    </>
  );
};
