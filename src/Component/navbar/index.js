import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const NavBar = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Dashboard" component={Link} to="/" id="dashboard" />
          <Tab
            label="KPA Board"
            component={Link}
            to={{ pathname: "/kpa-profile", search: "?type=component" }}
            id="kpa-profile"
          />
        </Tabs>
      </AppBar>
    </div>
  );
};

export default NavBar;
