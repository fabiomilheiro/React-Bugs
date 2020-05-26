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
import ArchiveIcon from "@material-ui/icons/Archive";

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
  state = {
    description: "",
    resolved: false,
    savedDescription: "",
  };

  componentDidMount() {
    const { bug } = this.props;
    this.setState({
      id: bug.id,
      description: bug.description,
      resolved: bug.resolved || false,
      savedDescription: bug.description,
    });
  }

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
          checked={this.state.resolved}
          onChange={(e) => {
            this.setState({ resolved: e.target.checked }, () =>
              this.bubbleChange()
            );
          }}
        />
        <InputBase
          className={classes.input}
          placeholder="Enter bug description"
          inputProps={{
            "data-testid": `${idPrefix}-bug-input`,
            "aria-label": "Enter bug description",
          }}
          value={this.state.description}
          onChange={(e) => this.setState({ description: e.target.value })}
          onBlur={(e) => {
            if (this.isDirty()) {
              this.bubbleChange();
            }
          }}
          onKeyPress={(e) => {
            if (e.charCode === 13) {
              e.preventDefault();

              if (this.isDirty()) {
                this.bubbleChange();
              }
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
            >
              <ArchiveIcon />
            </IconButton>
          </>
        )}
      </Paper>
    );
  }

  isDirty = () => {
    return this.state.description !== this.state.savedDescription;
  };
  bubbleChange = () => {
    this.setState(
      (previousState) => ({
        savedDescription: previousState.description,
      }),
      () =>
        this.props.onChange({
          id: this.state.id,
          description: this.state.description,
          resolved: this.state.resolved,
        })
    );
  };
}

export default withTheme(withStyles(styles)(EditBugForm));
