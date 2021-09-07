import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { Link as RouterLink } from "react-router-dom";

import { useStyles } from "./style";

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const NavLinks = () => {
  const classes = useStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkRouter to="/main" color="inherit" className={classes.link}>
        <HomeIcon className={classes.icon} />
        Main page
      </LinkRouter>
      <LinkRouter to="/favorite" color="inherit" className={classes.link}>
        <ThumbUpIcon className={classes.icon} />
        Favorite page
      </LinkRouter>
    </Breadcrumbs>
  );
};
export default NavLinks;
