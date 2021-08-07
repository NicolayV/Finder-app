import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    // margin: 40,
    // flexWrap: "wrap",
    // justifyContent: "space-around",
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
  //
  //
  //
  //
  //
  wrapper: {
    margin: 40,
    display: "flex",
    maxWidth: "100%",
    "& h1": {
      marginTop: 50,
    },
    "& h4": {
      color: "grey",
    },
    "& ul": {
      listStyle: "none",
      "& li": {
        color: "rgb(63, 81, 181)",
      },
    },
    "& div:first-child": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      "& img": {
        paddingBottom: 10,
      },
    },
    "& div:nth-child(2)": {
      paddingLeft: 15,
    },
  },
  additional: {
    margin: "0 auto",
    maxWidth: 1100,
    marginTop: 30,
  },
}));
