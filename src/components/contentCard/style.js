import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: 5,
    width: 300,
  },
  media: {
    minHeight: 250,
    paddingTop: "56.25%", // 16:9
  },
  cardHeader: {
    height: 90,
    padding: 5,
  },

  cardButton: {
    margin: theme.spacing(1),
  },
  avatar: {
    backgroundColor: blue[500],
  },
  сardHeader: {
    height: 50,
  },
  сardFab: {
    backgroundColor: blue[500],
  },
}));
