import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
    title: {
        color: "#2196F3",
    }
}));

const ProfileDetail = (props) => {
    const classes = useStyles();

    return (
        <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
                <Typography gutterBottom variant="subtitle1" style={{color: props.contentColor ? props.contentColor : "white"}}>
                    {props.content}
                </Typography>
                <Typography gutterBottom variant="subtitle1" className={classes.title}>
                    {props.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    {props.data1}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {props.data2}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default ProfileDetail;