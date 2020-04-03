import React, { useState, useEffect, useRef } from 'react';
import { Grid, Card, makeStyles, Container } from '@material-ui/core';
import RecentActivities from './recentActivities';
import { fetchUserProfile, fetchKPAstages } from '../../service/apiService';

import BackDrop from "../../Shared/component/backDrop";
import SnackBar from "../../Shared/component/snackBar";
import { DummyModel as DummuModel } from '../dummyModel';
import Profile from './profile';
import D3LineChart from './lineChart';
import D3BarChart from './d3BarChart';
import D3PieChart from './d3PieChart';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    chart: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        height: 400
    },
    profileList: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary
    }
}));

 const Dashboard = props => {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [kpaStage, setkpaStage] = useState([]);
    const snackBarRef = useRef();

    async function fetchData() {
        setIsLoading(true);        
        try {
            const response = await fetchUserProfile();
            setData(response.data);
        } catch (error) {
            if (error.response) {
                snackBarRef.current.handleClick(error.message, "error");
            }
        }
        setIsLoading(false);
        try {
            const response = await fetchKPAstages();
            setkpaStage(response.data);
        } catch (error) {
            if (error.response) {
                snackBarRef.current.handleClick(error.message, "error");
            }
        }
        
    }

    useEffect(() => {
        fetchData();
    }, [props.location]);

    return (
        <React.Fragment>
            {isLoading && <BackDrop open={isLoading} />}

            <Container className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Card className={classes.chart}><D3LineChart data={data} /></Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card className={classes.chart}><D3BarChart data={data} kpaStage={kpaStage} /></Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card className={classes.chart}><D3PieChart data={data} /></Card>
                    </Grid>
                    <Grid item xs={8}>
                        <Card className={classes.profileList}><Profile data={data} loading={isLoading} /></Card>
                    </Grid>
                    <Grid item xs={4}>

                        <Card className={classes.profileList} style={{ marginBottom: '10px' }}>
                            <RecentActivities data={data} loading={isLoading} /></Card>
                    </Grid>
                </Grid>
            </Container>
            <SnackBar ref={snackBarRef} />
        </React.Fragment>
    );
}

export default Dashboard;