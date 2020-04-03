import React from "react";
import Badge from "../../Shared/component/badge";
import { dataGroupForCompletedKPA } from "../../Shared/function";
import { Box, Paper } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import BarChart from "./kpa-bar-chart";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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

const D3BarChart = props => {
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

  const barchartDimensions = {
    barchartWidth: 400,
    barHeight: 25,
    chartWidth: 400,
    chartHeight: 300
  };
  const bindBarChart = (selected = "component") => {
      const barData = (props.data && props.kpaStage.length > 0) && dataGroupForCompletedKPA(props.data, props.kpaStage);
      if (barData.length > 0) {
      const barchartData = setBarChartData(barData, selected);
        return (
        <React.Fragment>
          <Select
            className="width50"
            value={selected}
            onChange={handleChange}
          >
            {renderOptions()}
          </Select>
          <BarChart
            data={barchartData}
            dimensions={barchartDimensions}
          />
        </React.Fragment>
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

  const renderOptions = () => {
    return kpaTypes.map((kpa, i) => {
      return (
        <MenuItem label="Select a kpa" value={kpa.type} key={kpa.type} name={kpa.type}>
          {kpa.label}
        </MenuItem>
      );
    });
  };

  const handleChange = event => {
    bindBarChart(event.target.value);
  };

  const setBarChartData = (barData, selected) => {
    const barchartData = [];
    barData.map(data => {
      barchartData.push({
        name: data.name,
        target: data.target[selected],
        completed: data.completed[selected] ? data.completed[selected]: 0,
        pending: data.target[selected] - (data.completed[selected] ? data.completed[selected]: 0)
      });
    });

    return barchartData;
  };

  return (<React.Fragment>
        <Badge name="Bar Chart" styles={badgeStyle}></Badge>
      <div className={classes.root}><div>{bindBarChart()}</div></div></React.Fragment>);
};

export default D3BarChart;
