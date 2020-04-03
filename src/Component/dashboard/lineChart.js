import React from "react";
import { getGroupingKpa } from "../../Shared/function";
import LineChart from "./kpa-line-chart";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "../../Shared/component/badge";
import { Box, Paper } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

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

const D3LineChart = props => {
  const classes = useStyles();

  const badgeStyle = {
    background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
    boxShadow:
      "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(156, 39, 176,.4)",
    width: "100%"
  };

  const kpaTypes = [
    { type: "component", color: "#000080", label: "Components" },
    { type: "Master_class", color: "#008000", label: "Master Classes" },
    { type: "Tech_session", color: "#808080", label: "Tech Sessions" },
    { type: "case_study", color: "#8B0000", label: "Case Studies" },
    { type: "blog", color: "#FFA500", label: "Blogs" }
  ];

  const getLineChartData = arr => {
    const filtered = [];
    const obj = arr.reduce((res, curr) => {
      const date = new Date(curr.created_on).getMonth();
      if (res[date]) {
        res[date].push(curr);
      } else {
        Object.assign(res, { [date]: [curr] });
      }
      return res;
    }, {});

    for (const key in obj) {
      filtered.push(groupByKpaCount(obj[key]));
    }

    filtered.map(item => {
      kpaTypes.map(kpa => {
        if (!item[kpa.type]) {
          item[kpa.type] = 0;
        }
      });
    });

    return filtered.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
    });
  };

  const groupByKpaCount = arr => {
    const kpa = arr.reduce((acc, it) => {
      const date = new Date(it.created_on);
      acc["date"] =
        date.getFullYear() + "-" + (parseInt(date.getMonth()) + 1) + "-01";
      acc[it.type] = acc[it.type] + 1 || 1;
      return acc;
    }, {});

    return kpa;
  };

  const bindChart = () => {
    const lineChartData = getLineChartData(getGroupingKpa(props.data));
    const linechartWidth = 350;
    const linechartHeight = 300;
    if (lineChartData.length > 0) {
      return (
        <LineChart
          data={lineChartData}
          width={linechartWidth}
          height={linechartHeight}
          kpaTypes={kpaTypes}
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
      <Badge name="Line Chart" styles={badgeStyle}></Badge>
      <div className={classes.root}>{bindChart()}</div>
    </React.Fragment>
  );
};

export default D3LineChart;
