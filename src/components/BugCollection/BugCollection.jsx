import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Mood as MoodIcon } from "@material-ui/icons";

import bugs from "../../store/bugs";
import Message from "../Message/Message";
import EditBugForm from "../EditBugForm/EditBugForm";
import NewBugForm from "../NewBugForm/NewBugForm";
import { withTheme, withStyles, Divider } from "@material-ui/core";

const styles = {
  list: {
    marginTop: (props) => props.theme.spacing(2),
    marginBottom: (props) => props.theme.spacing(2),
  },
};
class BugCollection extends Component {
  render() {
    return (
      <>
        {this.renderNoBugsMessage()}
        {this.renderBugList()}
        <Divider />
        <NewBugForm onChange={(newBug) => this.props.addBug(newBug)} />
      </>
    );
  }

  renderNoBugsMessage() {
    if (this.props.bugs.list.length > 0) {
      return null;
    }

    return (
      <Message icon={<MoodIcon />} id="no-bugs">
        There are no bugs!
      </Message>
    );
  }

  renderBugList() {
    if (this.props.bugs.list.length === 0) {
      return null;
    }

    return (
      <div
        className={this.props.classes.list}
        data-testid="bug-list"
        data-count={this.props.bugs.list}
      >
        {this.props.bugs.list.map((bug, key) => (
          <EditBugForm
            key={key}
            bug={bug}
            onChange={(b) => this.props.updateBug(b)}
          />
        ))}
      </div>
    );
  }
}

BugCollection.propTypes = {
  bugs: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number | PropTypes.string,
        description: PropTypes.string,
      })
    ),
    isLoading: PropTypes.bool,
  }),
};

const mapStateToProps = (state) => ({
  bugs: state.entities.bugs,
});

const mapDispatchToProps = (dispatch) => ({
  loadBugs: dispatch(bugs.actions.load()),
  addBug: (newBug) => dispatch(bugs.actions.add(newBug.description)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(withStyles(styles)(BugCollection)));
