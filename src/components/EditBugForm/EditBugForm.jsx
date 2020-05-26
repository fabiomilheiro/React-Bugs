import React, { Component } from "react";
import {
  Checkbox,
  Paper,
  IconButton,
  InputBase,
  Divider,
  withStyles,
  withTheme,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import bugs from "../../store/bugs";

const styles = {
  root: {
    marginTop: (props) => props.theme.spacing(0.5),
    marginBottom: (props) => props.theme.spacing(0.5),
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: (props) => {
      return props.theme.spacing(1);
    },
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  resolved: {
    color: "#3f3",
  },
  divider: {
    height: 28,
    margin: 4,
  },
};

class EditBugForm extends Component {
  componentDidMount() {}

  render() {
    const { classes, bug } = this.props;
    const idPrefix = "edit";

    return (
      <Paper
        component="form"
        className={classes.root}
        data-testid={`${idPrefix}-bug-form`}
      >
        <Checkbox
          data-testid={`${idPrefix}-bug-checkbox`}
          checked={bug.resolved}
          onChange={(e) => this.saveBug({ resolved: e.target.checked })}
        />
        <InputBase
          className={classes.input}
          placeholder="Enter bug description"
          inputProps={{
            "data-testid": `${idPrefix}-bug-input`,
            "aria-label": "Enter bug description",
          }}
          value={bug.description}
          onChange={(e) => this.changeBugDescription(e.target.value)}
          onKeyPress={(e) => {
            if (e.charCode === 13) {
              e.preventDefault();
              this.saveBug({ description: e.target.value });
            }
          }}
        />
        {bug && (
          <>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton
              color="primary"
              className={classes.iconButton}
              aria-label="directions"
              onClick={() => this.props.removeBug(bug.id)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Paper>
    );
  }

  changeBugDescription = (newDescription) => {
    const bug = {
      ...this.props.bug,
      description: newDescription,
    };

    this.props.changeBugDescription(bug);
  };

  saveBug = (bugChanges) => {
    const bug = {
      ...this.props.bug,
      ...bugChanges,
    };

    this.props.saveBug(bug);
  };
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  changeBugDescription: (bug) => dispatch(bugs.actions.changeDescription(bug)),
  saveBug: (bug) => dispatch(bugs.actions.save(bug)),
  removeBug: (id) => dispatch(bugs.actions.remove(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(withStyles(styles)(EditBugForm)));
