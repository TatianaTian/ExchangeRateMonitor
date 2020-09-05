import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SaveNotificationData } from "../../actions/authActions";
import classnames from "classnames";
import {FaDatabase, FaBell, FaPoll} from 'react-icons/fa';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }


  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      notification: "on",
    };

    this.props.SaveNotificationData(newUser);
  };

  render() {
    const { errors } = this.state;

    return (  
        <p></p>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
