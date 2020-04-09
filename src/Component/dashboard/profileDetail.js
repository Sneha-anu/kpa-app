import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  tabletext: {
    fontSize: "0.875rem !important",
  },
}));

const ProfileDetail = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
        <Typography color="textSecondary" className={classes.tabletext}>
            {props.content}
          </Typography>
           <Typography color="textSecondary" className={classes.tabletext}>
            {props.name}
          </Typography>
          <Typography color="textSecondary" className={classes.tabletext}>
            {props.data1}
          </Typography>
          <Typography color="textSecondary" className={classes.tabletext}>
            {props.data2}
          </Typography>
  </React.Fragment>
  );
};

export default ProfileDetail;
