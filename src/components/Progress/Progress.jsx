import React from "react";
import { LinearProgress } from "@material-ui/core";
import { connect } from "react-redux";

const Progress = (props) => {
  console.log(`Updating loading: ${JSON.stringify(props)}`);
  return props.isLoading && <LinearProgress />;
};

const mapStateToProps = (state) => {
  console.log(`Map state to props: ${JSON.stringify(state)}`);

  return {
    isLoading: state.entities.bugs.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Progress);
