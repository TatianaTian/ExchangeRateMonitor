import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import {FaDatabase, FaBell, FaPoll} from 'react-icons/fa';
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory'

class Register_ch extends Component {
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

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    ReactGA.event({
      category: "Register",
      action: "User register - Chinese register page"
    });
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    const history = createHistory()
    //console.log("history.location.path is ", history.location.pathname)
    ReactGA.set({ page: history.location.pathname})
    ReactGA.pageview(history.location.pathname)

    return (
      <div className="main_background_image">
      <div className="container" style={{height: window.screen.height}} >
          <div className="col center-align">
          <br/>
            <Link
                  to="/register_ch"
                  style={{
                    width: "100px",
                    borderRadius: "3px",
                    letterSpacing: "1px"
                  }}
                  className="flow-text-small grey-text text-darken-1"
                >
                  <span className="Chinese_font">中文</span>
            </Link>
                    &nbsp;
                    &nbsp;
                    &nbsp;
            <Link
                  to="/register"
                  style={{
                    width: "100px",
                    borderRadius: "3px",
                    letterSpacing: "1px"
                  }}
                  className="flow-text-small grey-text text-darken-1"
                >
                  English
            </Link>
          </div>
        <br/>
        <br/>
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/ch" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> <span className="Chinese_font">返回主页</span>
             
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b><span className="Chinese_font">注册</span></b>
              </h4>
              <p className="grey-text text-darken-1">
              <span className="Chinese_font">已有账号？</span> <span className="click_link"><Link to="/login_ch"><span className="Chinese_font">登陆</span></Link></span>。<span className="Chinese_font">在任何情况下，我们都不会泄漏你的信息。</span>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name"><span className="Chinese_font">姓名</span></label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email"><span className="Chinese_font">邮箱</span></label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password"><span className="Chinese_font">密码</span></label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2"><span className="Chinese_font">重复密码</span></label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  <span className="Chinese_font">注册</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

Register_ch.propTypes = {
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
)(withRouter(Register_ch));
