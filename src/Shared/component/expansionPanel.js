import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";

import KpaStatus from "./kpaStatus";
// import StyledRating from "@material-ui/core/Box";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

export default function ControlledExpansionPanels(props) {
  const classes = useStyles();
  //   const [expanded, setExpanded] = React.useState(true);

  //   const handleChange = panel => (event, isExpanded) => {
  //     setExpanded(isExpanded ? panel : false);
  //   };
  //   console.log(props);
  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded={true}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            className={classes.heading}
            component={Link}
            to={location => `${location.pathname}?id=${51827270}`}
          >
            {props.id}
          </Typography>
          <KpaStatus {...props.status} />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>{props.children}</ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
