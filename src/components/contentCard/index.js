import React from "react";
import { useStyles } from "./style";
import { img_300, unavailable } from "../../config/config";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";

export const SingleContent = ({ poster, title, date }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={poster ? `${img_300}/${poster}` : unavailable}
        title={title}
      />

      <CardHeader
        className={classes.cardHeader}
        title={title}
        subheader={<span>{date}</span>}
      />
    </Card>
  );
};
