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
  divider: {
    height: 28,
    margin: 4,
  },
};

class EditBugForm extends Component {
  state = {
    description: "",
    resolved: false,
  };

  componentDidMount() {
    const { bug } = this.props;

    if (bug) {
      this.setState({
        id: bug.id,
        description: bug.description,
        resolved: bug.resolved,
      });
    } else {
      this.setState({
        description: "",
        resolved: false,
      });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    // if (this.havePropsChanged(previousProps)) {
    //   const { bug } = this.props;
    //   this.setState({
    //     description: bug.description,
    //     resolved: bug.resolved,
    //   });
    // }
  }

  havePropsChanged(previousProps) {
    if (!previousProps.bug) {
      return null;
    }

    return (
      previousProps.bug.description !== this.props.bug.description ||
      previousProps.bug.resolved !== this.props.bug.resolved
    );
  }

  render() {
    const { classes, bug } = this.props;
    const idPrefix = bug ? "edit" : "add";

    return (
      <Paper
        component="form"
        className={classes.root}
        data-testid={`${idPrefix}-bug-form`}
      >
        <Checkbox
          data-testid={`${idPrefix}-bug-checkbox`}
          checked={this.state.resolved}
          onChange={(e) => this.setState({ resolved: e.target.checked })}
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
          onBlur={(e) => this.bubbleChange()}
          onKeyPress={(e) => {
            if (e.charCode === 13) {
              e.preventDefault();
              this.bubbleChange();
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

  bubbleChange = () => {
    this.props.onChange({
      id: this.state.id,
      description: this.state.description,
      resolved: this.state.resolved,
    });

    // if (!this.state.id) {
    //   this.setState({
    //     description: "",
    //     resolved: false,
    //   });
    // }
  };
}

export default withTheme(withStyles(styles)(EditBugForm));
