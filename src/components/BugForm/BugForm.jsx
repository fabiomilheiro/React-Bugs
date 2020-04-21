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

class BugForm extends Component {
  state = {
    checked: false,
    description: "",
  };

  componentDidMount() {
    this.setState({
      checked: this.props.checked,
      description: this.props.description,
    });
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.havePropsChanged(previousProps)) {
      this.setState({
        checked: this.props.checked,
        description: this.props.description,
      });
    }
  }

  havePropsChanged(previousProps) {
    return (
      previousProps.checked !== this.props.checked ||
      previousProps.description !== this.props.description
    );
  }

  render() {
    const { classes, idPrefix } = this.props;

    return (
      <Paper component="form" className={classes.root}>
        <Checkbox
          data-testid={`${idPrefix}-bug-checkbox`}
          onChange={(e) => this.setState({ checked: e.target.checked })}
        />
        <InputBase
          data-testid={`${idPrefix}-bug-input`}
          className={classes.input}
          placeholder="Enter bug description"
          inputProps={{ "aria-label": "Enter bug description" }}
          onChange={(e) => this.setState({ description: e.target.value })}
          onBlur={(e) => this.props.onChange(e.target.value)}
          onKeyPress={(e) => {
            e.preventDefault();
            if (e.charCode === 13) {
              this.props.onChange(e.target.value);
            }
          }}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="directions"
        >
          <ArchiveIcon />
        </IconButton>
      </Paper>
    );
  }
}

export default withTheme(withStyles(styles)(BugForm));
