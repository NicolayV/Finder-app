import React, { useState } from "react";
import { Grid, Paper, Tab, Tabs, AppBar } from "@material-ui/core";
import { LoginForm } from "../components/form/login";
import { RegistrationForm } from "../components/form/registration";

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
            <Tab label="Log in" />
            <Tab label="register" />
          </Tabs>
        </AppBar>
        {(selectedTab === 0 && <LoginForm />) ||
          (selectedTab === 1 && <RegistrationForm />)}
      </Paper>
    </Grid>
  );
};
