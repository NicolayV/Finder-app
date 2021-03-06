import React from "react";

import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { Slide } from "@material-ui/core";

export const HideOnScroll = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};
