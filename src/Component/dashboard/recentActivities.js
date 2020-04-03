import React from "react";
import Badge from "../../Shared/component/badge";
import { getRecentKPAModification, getKPAType } from "../../Shared/function";
import {
  Box,
  Paper,
  Grid,
  ButtonBase,
  Avatar,
  Typography
} from "@material-ui/core";
import TodayIcon from "@material-ui/icons/Today";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import Detail from "./profileDetail";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    marginBottom: theme.spacing(1)
  },
  noRecentNotification: {
    background: "linear-gradient(60deg, #e11313f5, #f807072e)",
    marginTop: 5,
    padding: theme.spacing(2),
    margin: "auto",
    marginBottom: theme.spacing(1)
  },
  image: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  footerText: {
    marginTop: 3
  },
  footer: {
    background: "linear-gradient(60deg, #07f8f880, #c822f147)",
    borderRadius: 9,
    marginTop: 1
  }
}));

const RecentActivities = props => {
  const classes = useStyles();

  const recentNotification = {
    background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
    boxShadow:
      "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(156, 39, 176,.4)",
    width: "100%"
  };

  const getNotificationDetailsProps = (name, data1, data2) => {
    return { name, data1, data2 };
  };

  const getCssForPaperBorder = index => {
    switch (index) {
      case 0:
        return { borderLeft: "4px solid #eb8db4b3" };
      case 1:
        return { borderLeft: "4px solid #16db6eb3" };
      case 2:
        return { borderLeft: "4px solid #e5c903b3" };
      case 3:
        return { borderLeft: "4px solid #0329e5b3" };
      default:
        return { borderLeft: "4px solid #810adbb3" };
    }
  };

  const appendData = recentModifiedKPA => {
    return recentModifiedKPA.map((recentKPA, index) => {
      return (
        <Paper
          key={index}
          elevation={3}
          className={classes.paper}
          style={getCssForPaperBorder(index)}
        >
          <Grid container spacing={2}>
            <Detail
              {...getNotificationDetailsProps(
                recentKPA.title,
                getKPAType(recentKPA.type),
                recentKPA.description
              )}
            />
          </Grid>
          <Grid container spacing={2} className={classes.footer}>
            <Grid item>
              <ButtonBase>
                <Avatar
                  className={classes.image}
                  alt="Remy Sharp"
                  src="./1.jpeg"
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Typography
                variant="body2"
                color="textSecondary"
                className={classes.footerText}
              >
                {recentKPA.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                color="textSecondary"
                className={classes.footerText}
              >
                {new Date(recentKPA.modified_on).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="textSecondary">
                <TodayIcon />
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      );
    });
  };

  const noRecentActivities = content => {
    return (
      <Paper className={classes.noRecentNotification} elevation={3}>
        <Grid container spacing={2}>
          <Detail content={content} />
        </Grid>
      </Paper>
    );
  };

  const getDetails = () => {
    const recentModifiedKPA = getRecentKPAModification(props.data);
    const recentActivitiesLength = recentModifiedKPA.length;
    if (props.loading) {
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
    } else if (recentActivitiesLength > 0) {
      if (recentActivitiesLength === 4) {
        return (
          <React.Fragment>{appendData(recentModifiedKPA)} </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            {appendData(recentModifiedKPA)}
            {noRecentActivities(
              "No more than " +
                recentActivitiesLength +
                " actvities in past 30 days"
            )}
          </React.Fragment>
        );
      }
    } else {
      return (
        <React.Fragment>
          {noRecentActivities("No Recent Activities!")}
        </React.Fragment>
      );
    }
  };

  return (
    <div className={classes.root}>
      <Badge name="Recent Notification" styles={recentNotification} />
      {getDetails()}
    </div>
  );
};

export default RecentActivities;
