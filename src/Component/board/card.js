import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography
} from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: 10,
    borderLeft: `4px solid ${theme.palette.success.main}`
  },
  paper: {
    padding: theme.spacing(1),
    width: "60%",
    backgroundColor: theme.palette.success.dark
  }
}));

const NotifyCard = props => {
  const classes = useStyles();
  const { title, description, modified_on ,type} = props;
  return (
    <Draggable draggableId={props.id + "~" + title+'~'+type} index={props.index}>
      {provided => (
        <Card
          className={classes.root}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <CardHeader
            action={
              <IconButton aria-label="settings" color="primary">
                <OpenInNewIcon />
              </IconButton>
            }
            titleTypographyProps={{ variant: "body1" }}
            title={title}
            subheader={new Date(modified_on).toDateString()}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
            {/* <Box
              bgcolor="success.main"
              color="background.paper"
              boxShadow={3}
              borderRadius="borderRadius"
              p={2}
              fontWeight="fontWeightMedium"
            >
              {type}
            </Box> */}
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default NotifyCard;

NotifyCard.defaultProps = {
  title: "Forms in React",
  description:
    "With supporting text below as a natural lead-in to additional content.",
  type: "component",
  modified_on: new Date(),
  name: "Dinesh S"
};
