import React, { useState } from "react";
import { Grid, Paper, Tab, Tabs, AppBar } from "@material-ui/core";
// import { LoginForm } from "../../components/authForm/login";
// import { RegistrationForm } from "../../components/authForm/registration";
import UserForm from "../../components/authForm/UserForm";

export const MainForm = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (event, newValue) => setSelectedTab(newValue);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Paper elevation={20} style={{ width: 320 }}>
        <AppBar position="static">
          <Tabs variant="fullWidth" value={selectedTab} onChange={handleChange}>
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>
        </AppBar>
        <UserForm formType={selectedTab === 0 ? "signIn" : "signUp"} />
      </Paper>
    </Grid>
  );
};
