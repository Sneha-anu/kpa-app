import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProfileDetail from "./profileDetail";
import {
  Box,
  Paper,
  Avatar,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableContainer
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { red, blue } from '@material-ui/core/colors';
import Assignment from '@material-ui/icons/Assignment';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        background: 'transparent',
        marginTop:'15px',
        borderRadius: '0',
        boxShadow: 'none',
      },
      topbox: {
        marginLeft: '15px',
        marginTop: '0',
        padding: '20px',
        background: blue.A400,
        borderRadius: '3px',
      },
      whitecolor: {
        color: '#fff',
        width: '30px',
        height: '30px',
        margin: '4px 4px -10px',
        textAlign: 'center',
        lineHeight: '33px',
      },
      wholeContainer: {
        background: '#fff',
        borderRadius: '3px',
      },
      containertitle:{
        color: '#3C4858',
        fontWeight: "300",
        marginLeft: '20px',
      },
      avatar: {
        backgroundColor: red[500],
      },
      tabletext: {
        fontSize: '0.875rem !important',
      },
      downloadIcon: {
        color: red[500],
      }
}));

const Profile = (props) => {
  const classes = useStyles();

  const getProfileDetailsProps = (name, data1, data2) => {
    return { name, data1, data2 };
  };

  const renderList = () => {
    const data = props.data;
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
    } else {
      return data.map((profile) => {
        const projectDetails = profile.project_details;
        return (
          <React.Fragment>
            <TableRow key={profile.id}>
              <TableCell component="th" scope="row">
                <Box display="flex" flexDirection="row">
                  <Box component="div">
                    <Avatar
                      alt={profile.name}
                      src={"/images/" + profile.name + ".jpg"}
                    />
                  </Box>
                  <Box component="div" ml={2}>
                    <ProfileDetail
                      {...getProfileDetailsProps(
                        profile.name,
                        profile.id,
                        profile.designation
                      )}
                    />
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <ProfileDetail
                  {...getProfileDetailsProps(
                    projectDetails.name,
                    projectDetails.project_manager,
                    projectDetails.contact
                  )}
                />
              </TableCell>
              <TableCell>
                <CloudDownloadIcon
                  fontSize="large"
                  className={classes.downloadIcon}
                />
              </TableCell>
            </TableRow>
          </React.Fragment>
        );
      });
    }
  };

  return (
    <React.Fragment>
      <Box className={classes.wholeContainer}>
        <Box>
          <Box component="div" display="inline" className={classes.topbox}>
            <Assignment className={classes.whitecolor} />
          </Box>
          <Typography className={classes.containertitle} display="inline">
            {" "}
            Employee Details{" "}
          </Typography>
        </Box>
        <Paper className={classes.paper}>
          <TableContainer>
            <Table className={classes.table} aria-label="Employee Details">
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>Project</TableCell>
                  <TableCell>Resume</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderList()}</TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </React.Fragment>
  );
};

export default Profile;
