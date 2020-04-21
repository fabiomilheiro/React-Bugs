import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Mood as MoodIcon } from "@material-ui/icons";

import bugs from "../../store/bugs";
import Message from "../Message/Message";
import EditBugForm from "../EditBugForm/EditBugForm";
import NewBugForm from "../NewBugForm/NewBugForm";

class BugCollection extends Component {
  render() {
    return (
      <>
        {this.renderNoBugsMessage()}
        {this.renderBugList()}
        {/* <Fab color="primary" aria-label="add" data-testid="add-button-button">
          <AddIcon />
        </Fab> */}
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

    return this.props.bugs.list.map((b) => b.description);
    // return this.props.bugs.list.map((bug, key) => (
    //   // <BugForm key={key} bug={bug} onChange={(b) => this.props.updateBug(b)} />
    // ));
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

export default connect(mapStateToProps, mapDispatchToProps)(BugCollection);
