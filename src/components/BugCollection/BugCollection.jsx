import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Avatar,
  styled,
  Fab,
} from "@material-ui/core";
import { Add as AddIcon, Mood as MoodIcon } from "@material-ui/icons";

import bugs from "../../store/bugs";
import Message from "../Message/Message";

const BugList = styled(List)({});

class BugCollection extends Component {
  render() {
    return (
      <>
        {this.renderNoBugsMessage()}
        {this.renderBugList()}
        <Fab color="primary" aria-label="add">
          <AddIcon data-testid="add-bug" />
        </Fab>
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
      <BugList dense>
        {this.props.bugs.list.map((bug) => {
          return this.renderListItem(bug);
        })}
      </BugList>
    );
  }

  renderListItem(bug) {
    const labelId = `checkbox-list-secondary-label-${bug.id}`;

    return (
      <ListItem key={bug.id} button>
        <ListItemAvatar>
          <Avatar
            alt={`Avatar n°${bug.id}`}
            src={`/images/avar/${bug.id}.jpg`}
          />
        </ListItemAvatar>
        <ListItemText
          id={labelId}
          primary={`Line item ${bug.id}`}
          data-testid="bug-list-item"
        />
        <ListItemSecondaryAction>
          <Checkbox
            edge="end"
            onChange={() => {}}
            checked={bug.resolved}
            inputProps={{ "aria-labelledby": bug.id }}
          />
        </ListItemSecondaryAction>
      </ListItem>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(BugCollection);
