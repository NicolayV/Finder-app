import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  // root: {
  //   margin: 5,
  //   width: 300,
  // },
  root: {
    margin: 40,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    maxWidth: "100%",
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
}));
