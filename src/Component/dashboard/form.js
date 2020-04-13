import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Typography,
  Button,
  Grid,
  Card,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";

const designations = [
  {
    value: "LE",
    label: "Lead Engineer",
  },
  {
    value: "TL",
    label: "Tech Lead",
  },
  {
    value: "SE",
    label: "Software Engineer",
  },
  {
    value: "TM",
    label: "Manager",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& .MuiTextField-root": {
      margin: theme.spacing(5),
      width: "30ch",
    },
  },
  title: {
    flexGrow: 1,
    margin: theme.spacing(5),
    marginBottom: theme.spacing(1),
  },
  footer: {
    margin: theme.spacing(5),
  },
  divider: { marginTop: theme.spacing(2) },
  button: {
    width: "30ch",
  },
}));

const FormData = (props) => {
  const classes = useStyles();
  const [designation, setDesignation] = useState("");

  const handleChangeDesignation = (event) => {
    setDesignation(event.target.value);
  };

  return (
    <React.Fragment>
      <Card>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid
            container
            spacing={2}
            direction="column"
            className={classes.title}
          >
            <Typography variant="h6">Personal Details</Typography>
            <Divider className={classes.divider} />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                required
                id="full-name"
                label="Full Name"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                id="employee-id"
                label="Employee Id"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="project-manager"
                label="Project Manager"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                id="designation"
                select
                label="Designation"
                value={designation}
                onChange={handleChangeDesignation}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              >
                {designations.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="contact"
                label="Contact"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="email"
                label="Email Id"
                type="Email"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            direction="column"
            className={classes.title}
          >
            <Typography variant="h6">Project Details</Typography>
            <Divider className={classes.divider} />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                id="pr-name"
                label="Name"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="pr-manager-name"
                label="Manager Name"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="pr-contact"
                label="Contact"
                type="number"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField
                id="pr-email"
                label="Email Id"
                type="Email"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item className={classes.footer}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </Grid>
            <Grid item className={classes.footer}>
              <Button variant="outlined" className={classes.button}>
                Add KPA
              </Button>
            </Grid>
            <Grid item className={classes.footer}>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default FormData;
