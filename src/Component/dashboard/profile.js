import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProfileDetail from './profileDetail';
import { Box, Grid, Paper, Avatar, Typography, ButtonBase } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import Badge from '../../Shared/component/badge';
import Skeleton from '@material-ui/lab/Skeleton';
import { dataGroupByName } from '../../Shared/function';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        marginBottom: 2
    },
    image: {
        width: 48,
        height: 48,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    getProfile: {
        cursor: "pointer"
    }
}));

const Profile = (props) => {
    const classes = useStyles();

    const getProfileDetailsProps = (name, data1, data2) => {
        return { name, data1, data2 };
    }


    const renderList = () => {
        const data = props.data;
        if(props.loading){
            return (<React.Fragment>
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
            </React.Fragment>)
        }
        else {
        return data.map(profile => {
            const projectDetails = profile.project_details;
            return (
                <Paper key={profile.id} className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <Avatar alt="Remy Sharp" src="./1.jpeg" />
                            </ButtonBase>
                        </Grid>
                        <ProfileDetail {...getProfileDetailsProps(profile.name, profile.id, profile.designation)} />
                        <Grid item xs={12} sm container>
                            <ProfileDetail {...getProfileDetailsProps(projectDetails.name, projectDetails.project_manager, projectDetails.contact)} />
                            <Grid item className={classes.getProfile} >
                                <Typography variant="subtitle1" ><GetAppIcon /></Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            )
        })
    }
    }

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Grid container spacing={2}>
                    < Badge name="Employee"></Badge>
                    <Grid item xs={12} sm container spacing={2}>
                        < Badge name="Project" mainClassName="ml-45"></Badge>
                        < Badge name="Resume" mainClassName="ml-20"></Badge>
                    </Grid>
                </Grid>
            </div>
            {renderList()}
        </React.Fragment>
    )
}

export default Profile;
