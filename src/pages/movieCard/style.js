import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  cardButton: {
    margin: theme.spacing(1),
  },

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
}));
