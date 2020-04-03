import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Column } from "./column";
import ExpansionPanel from "../../Shared/component/expansionPanel";

const styless = theme => ({
  root: {
    flexGrow: 1
  },
  background: {
    padding: theme.spacing(1),
    borderRight: "10px solid white",
    background: theme.palette.divider
  }
});

class RowList extends React.Component {
  state = {
    columns: this.props.data,
    columnOrder: Object.keys(this.props.data)
  };

  DragEnd = result => {
    if (!result.destination) {
      return;
    }
    // reordering in same list
    if (result.source.droppableId === result.destination.droppableId) {
      return;
    }
    this.props.changeStage(result);
  };

  render() {
    // console.log(this.state, "roe", this.props);
    // const classes = useStyles();
    const { classes, data, status } = this.props;
    const keyData = Object.keys(data);
    // const root = { flexGrow: 1 };
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid container item xs={12}>
            <ExpansionPanel id={this.props.id} status={status}>
              <DragDropContext onDragEnd={this.DragEnd}>
                {keyData.map((columnId, index) => (
                  <Grid
                    item
                    xs
                    key={columnId + data[columnId]["title"]}
                    className={classes.background}
                  >
                    <Column task={data[columnId]} index={index} />
                  </Grid>
                ))}
              </DragDropContext>
            </ExpansionPanel>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styless)(RowList);
RowList.defaultProps = {
  id: 51827270
};
