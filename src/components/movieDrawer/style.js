import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: 5,
    width: 300,
  },
  list: {
    width: 25,
  },
  fullList: {
    width: "auto",
  },

  header: {
    color: red,
  },
}));
