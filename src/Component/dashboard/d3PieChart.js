import React from "react";
import {
  getGroupingKpa,
  componentCompleted,
  masterCompleted,
  techsessionCompleted,
  totalKpa
} from "../../Shared/function";
import Badge from "../../Shared/component/badge";
import { Box, Paper } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import PieChart from "./kpa-pie-chart";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    marginBottom: 2
  }
}));

const D3PieChart = props => {
  const classes = useStyles();

  const badgeStyle = {
    background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
    boxShadow:
      "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(156, 39, 176,.4)",
    width: "100%"
  };
  const bindPieChart = () => {
    if (props.data.length > 0) {
      const profileData = getGroupingKpa(props.data);
      const completedComp = componentCompleted(profileData);
      const completedMast = masterCompleted(profileData);
      const completedTech = techsessionCompleted(profileData);

      //console.log(pieChartValues, 'pieChartData');
      const totKpa = totalKpa(profileData);
      //console.log(pieChart.compTarget(profileData))
      const remainingComp = totKpa[0] - completedComp;
      const remainingMast = totKpa[1] - completedMast;
      const remainingTech = totKpa[2] - completedTech;
      return (
        <PieChart
          profileData={profileData}
          completedComp={completedComp}
          completedMast={completedMast}
          completedTech={completedTech}
          remainingComp={remainingComp}
          remainingMast={remainingMast}
          remainingTech={remainingTech}
          totKpa={totKpa}
          id="piechart"
        />
      );
    } else {
      return (
        <React.Fragment>
          <Paper className={classes.paper}>
            <Box pt={0.5}>
              <Skeleton />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
              <Skeleton width="40%" />
            </Box>
          </Paper>
          <Paper className={classes.paper}>
            <Box pt={0.5}>
              <Skeleton />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
              <Skeleton width="40%" />
            </Box>
          </Paper>
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      <Badge name="Pie Chart" styles={badgeStyle}></Badge>
      {bindPieChart()}
    </React.Fragment>
  );
};

export default D3PieChart;
